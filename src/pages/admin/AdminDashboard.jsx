import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Admin.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminDashboard() {
  const { logout, isAdminLogged } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!isAdminLogged) {
      navigate('/admin-login');
    }
  }, [isAdminLogged, navigate]);
  
  const [activeTab, setActiveTab] = useState('services');
  const [aboutContent, setAboutContent] = useState({ mainContent: '', mission: '', vision: '' });
  const [services, setServices] = useState([]);
  const [events, setEvents] = useState([]);
  const [team, setTeam] = useState([]);
  const [projects, setProjects] = useState([]);
  
  const [newService, setNewService] = useState({ name: '', description: '', icon: '🔒', highlights: [] });
  const [newEvent, setNewEvent] = useState({ name: '', description: '', date: '', time: '', location: '' });
  const [newTeamMember, setNewTeamMember] = useState({ name: '', position: '', bio: '' });
  const [newProject, setNewProject] = useState({ name: '', description: '', client: '', category: '' });

  useEffect(() => {
    if(isAdminLogged) {
      fetchAllData();
    }
  }, [isAdminLogged]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [aboutRes, servicesRes, eventsRes, teamRes, projectsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/about`),
        fetch(`${API_BASE_URL}/services`),
        fetch(`${API_BASE_URL}/events`),
        fetch(`${API_BASE_URL}/team`),
        fetch(`${API_BASE_URL}/projects`)
      ]);

      if (aboutRes.ok) setAboutContent((await aboutRes.json()) || { mainContent: '', mission: '', vision: '' });
      if (servicesRes.ok) setServices(await servicesRes.json());
      if (eventsRes.ok) setEvents(await eventsRes.json());
      if (teamRes.ok) setTeam(await teamRes.json());
      if (projectsRes.ok) setProjects(await projectsRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error loading data from server');
    }
    setLoading(false);
  };

  const handleApiCall = async (url, method, body, successMessage) => {
    try {
      const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
      };
      if (body) {
        options.body = JSON.stringify(body);
      }
      const res = await fetch(url, options);
      if (res.ok) {
        alert(successMessage);
        fetchAllData(); // Re-fetch all data to ensure UI is in sync
        return await res.json();
      } else {
        alert(`Failed to ${method.toLowerCase()} data.`);
      }
    } catch (error) {
      console.error('API Error:', error);
      alert('An error occurred.');
    }
  };

  const saveAbout = () => handleApiCall(`${API_BASE_URL}/about`, 'PUT', aboutContent, 'About content updated!');
  const addService = () => handleApiCall(`${API_BASE_URL}/services`, 'POST', newService, 'Service added!').then(() => setNewService({ name: '', description: '', icon: '🔒', highlights: [] }));
  const deleteService = (id) => window.confirm('Delete this service?') && handleApiCall(`${API_BASE_URL}/services/${id}`, 'DELETE', null, 'Service deleted!');
  const addEvent = () => handleApiCall(`${API_BASE_URL}/events`, 'POST', newEvent, 'Event added!').then(() => setNewEvent({ name: '', description: '', date: '', time: '', location: '' }));
  const deleteEvent = (id) => window.confirm('Delete this event?') && handleApiCall(`${API_BASE_URL}/events/${id}`, 'DELETE', null, 'Event deleted!');
  const addTeamMember = () => handleApiCall(`${API_BASE_URL}/team`, 'POST', newTeamMember, 'Team member added!').then(() => setNewTeamMember({ name: '', position: '', bio: '' }));
  const deleteTeamMember = (id) => window.confirm('Delete this team member?') && handleApiCall(`${API_BASE_URL}/team/${id}`, 'DELETE', null, 'Team member deleted!');
  const addProject = () => handleApiCall(`${API_BASE_URL}/projects`, 'POST', newProject, 'Project added!').then(() => setNewProject({ name: '', description: '', client: '', category: '' }));
  const deleteProject = (id) => window.confirm('Delete this project?') && handleApiCall(`${API_BASE_URL}/projects/${id}`, 'DELETE', null, 'Project deleted!');

  const handleFileUpload = (id, file, type) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      const body = { image: e.target.result };
      handleApiCall(`${API_BASE_URL}/${type}/${id}`, 'PUT', body, `Image added to ${type}!`);
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    alert('Logged out successfully!');
  };

  if (!isAdminLogged) return null;
  if (loading) return <div className="loading-screen">Loading Securix Dashboard...</div>;
  
  const renderForm = (fields, state, setState, submitHandler, buttonText) => (
    <div className="admin-form-section">
      <h4>{buttonText.replace('+ ', 'Add New ')}</h4>
      {fields.map(field => (
        field.type === 'textarea' ? (
          <textarea
            key={field.name}
            value={state[field.name]}
            onChange={(e) => setState({ ...state, [field.name]: e.target.value })}
            placeholder={field.placeholder}
            className="admin-textarea"
          />
        ) : (
          <input
            key={field.name}
            type={field.type}
            value={state[field.name]}
            onChange={(e) => setState({ ...state, [field.name]: e.target.value })}
            placeholder={field.placeholder}
            className="admin-input"
          />
        )
      ))}
      <button onClick={submitHandler} className="admin-btn-primary">{buttonText}</button>
    </div>
  );

  const renderGrid = (items, type, deleteHandler, fileUploadHandler) => (
    <div className="admin-items-grid">
      {items.map(item => (
        <div key={item._id} className="admin-item-card">
          {item.image && <img src={item.image} alt={item.name} className="admin-item-image" />}
          <div className="admin-item-content">
            <h4>{item.icon} {item.name}</h4>
            <p>{item.description || item.position || `Client: ${item.client}`}</p>
          </div>
          <div className="admin-item-actions">
            <label className="admin-file-input">
              📸 Add Image
              <input type="file" onChange={(e) => fileUploadHandler(item._id, e.target.files[0], type)} accept="image/*" />
            </label>
            <button onClick={() => deleteHandler(item._id)} className="admin-btn-danger">🗑️ Delete</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-header">
        <div className="admin-header-content">
          <h1>🛡️ Admin Dashboard</h1>
          <p>Manage all content for Securix</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <div className="admin-tabs">
        <button className={`tab-button ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}>🔍 Services</button>
        <button className={`tab-button ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>📅 Events</button>
        <button className={`tab-button ${activeTab === 'team' ? 'active' : ''}`} onClick={() => setActiveTab('team')}>👥 Team</button>
        <button className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>🎯 Projects</button>
        <button className={`tab-button ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>ℹ️ About</button>
      </div>

      <div className="admin-content">
        {activeTab === 'services' && (
          <div className="admin-tab-content">
            <h2>Services Management</h2>
            {renderForm(
              [{name: 'name', placeholder: 'Service name', type: 'text'}, {name: 'description', placeholder: 'Service description', type: 'textarea'}, {name: 'icon', placeholder: 'Icon emoji', type: 'text'}],
              newService, setNewService, addService, '+ Add Service'
            )}
            {renderGrid(services, 'services', deleteService, handleFileUpload)}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="admin-tab-content">
            <h2>Events Management</h2>
            {renderForm(
              [{name: 'name', placeholder: 'Event name', type: 'text'}, {name: 'description', placeholder: 'Event description', type: 'textarea'}, {name: 'date', placeholder: 'Date', type: 'date'}, {name: 'time', placeholder: 'Time', type: 'time'}, {name: 'location', placeholder: 'Location', type: 'text'}],
              newEvent, setNewEvent, addEvent, '+ Add Event'
            )}
            {renderGrid(events, 'events', deleteEvent, handleFileUpload)}
          </div>
        )}

        {activeTab === 'team' && (
          <div className="admin-tab-content">
            <h2>Team Management</h2>
            {renderForm(
              [{name: 'name', placeholder: 'Member name', type: 'text'}, {name: 'position', placeholder: 'Position', type: 'text'}, {name: 'bio', placeholder: 'Bio', type: 'textarea'}],
              newTeamMember, setNewTeamMember, addTeamMember, '+ Add Member'
            )}
            {renderGrid(team, 'team', deleteTeamMember, handleFileUpload)}
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="admin-tab-content">
            <h2>Projects Management</h2>
            {renderForm(
              [{name: 'name', placeholder: 'Project name', type: 'text'}, {name: 'description', placeholder: 'Project description', type: 'textarea'}, {name: 'client', placeholder: 'Client name', type: 'text'}, {name: 'category', placeholder: 'Category', type: 'text'}],
              newProject, setNewProject, addProject, '+ Add Project'
            )}
            {renderGrid(projects, 'projects', deleteProject, handleFileUpload)}
          </div>
        )}

        {activeTab === 'about' && (
          <div className="admin-tab-content">
            <h2>About Content Management</h2>
            <div className="admin-about-section">
              <h4>Main Content</h4>
              <textarea value={aboutContent.mainContent} onChange={(e) => setAboutContent({ ...aboutContent, mainContent: e.target.value })} placeholder="Enter main about content" className="admin-textarea"></textarea>
              
              <h4>Mission Statement</h4>
              <textarea value={aboutContent.mission} onChange={(e) => setAboutContent({ ...aboutContent, mission: e.target.value })} placeholder="Enter mission statement" className="admin-textarea"></textarea>
              
              <h4>Vision Statement</h4>
              <textarea value={aboutContent.vision} onChange={(e) => setAboutContent({ ...aboutContent, vision: e.target.value })} placeholder="Enter vision statement" className="admin-textarea"></textarea>
              
              <button onClick={saveAbout} className="admin-btn-primary">💾 Save About Content</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}