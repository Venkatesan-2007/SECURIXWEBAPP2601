import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminDashboard() {
  const { logout, isAdminLogged } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  console.log('AdminDashboard rendering - isAdminLogged:', isAdminLogged);
  
  useEffect(() => {
    if (!isAdminLogged) {
      console.log('Not authenticated, redirecting to admin login');
      navigate('/admin-login');
    }
  }, [isAdminLogged, navigate]);
  
  if (!isAdminLogged) {
    return null;
  }
  
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

  // Load data from API on mount
  useEffect(() => {
    fetchAllData();
  }, []);

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

      if (aboutRes.ok) {
        const aboutData = await aboutRes.json();
        setAboutContent(aboutData || { mainContent: '', mission: '', vision: '' });
      }
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

  // About Content
  const saveAbout = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/about`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutContent)
      });
      if (res.ok) {
        alert('About content updated successfully!');
      } else {
        alert('Failed to update about content');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error updating about content');
    }
  };

  // Services Management
  const addService = async () => {
    if (!newService.name.trim()) {
      alert('Service name is required');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService)
      });
      if (res.ok) {
        const service = await res.json();
        setServices([...services, service]);
        setNewService({ name: '', description: '', icon: '🔒', highlights: [] });
        alert('Service added!');
      } else {
        alert('Failed to add service');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding service');
    }
  };

  const handleServiceFile = async (serviceId, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const service = services.find(s => s._id === serviceId);
        const res = await fetch(`${API_BASE_URL}/services/${serviceId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...service, image: e.target.result })
        });
        if (res.ok) {
          const updated = await res.json();
          setServices(services.map(s => s._id === serviceId ? updated : s));
          alert('Image added to service!');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error adding image');
      }
    };
    reader.readAsDataURL(file);
  };

  const deleteService = async (serviceId) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/services/${serviceId}`, { method: 'DELETE' });
      if (res.ok) {
        setServices(services.filter(s => s._id !== serviceId));
      } else {
        alert('Failed to delete service');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting service');
    }
  };

  // Events Management
  const addEvent = async () => {
    if (!newEvent.name.trim()) {
      alert('Event name is required');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvent)
      });
      if (res.ok) {
        const event = await res.json();
        setEvents([...events, event]);
        setNewEvent({ name: '', description: '', date: '', time: '', location: '' });
        alert('Event added!');
      } else {
        alert('Failed to add event');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding event');
    }
  };

  const handleEventFile = async (eventId, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const event = events.find(ev => ev._id === eventId);
        const res = await fetch(`${API_BASE_URL}/events/${eventId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...event, image: e.target.result })
        });
        if (res.ok) {
          const updated = await res.json();
          setEvents(events.map(ev => ev._id === eventId ? updated : ev));
          alert('Image added to event!');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error adding image');
      }
    };
    reader.readAsDataURL(file);
  };

  const deleteEvent = async (eventId) => {
    if (!window.confirm('Delete this event?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/events/${eventId}`, { method: 'DELETE' });
      if (res.ok) {
        setEvents(events.filter(ev => ev._id !== eventId));
      } else {
        alert('Failed to delete event');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting event');
    }
  };

  // Team Management
  const addTeamMember = async () => {
    if (!newTeamMember.name.trim()) {
      alert('Team member name is required');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/team`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTeamMember)
      });
      if (res.ok) {
        const member = await res.json();
        setTeam([...team, member]);
        setNewTeamMember({ name: '', position: '', bio: '' });
        alert('Team member added!');
      } else {
        alert('Failed to add team member');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding team member');
    }
  };

  const handleTeamFile = async (memberId, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const member = team.find(m => m._id === memberId);
        const res = await fetch(`${API_BASE_URL}/team/${memberId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...member, image: e.target.result })
        });
        if (res.ok) {
          const updated = await res.json();
          setTeam(team.map(m => m._id === memberId ? updated : m));
          alert('Photo added to team member!');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error adding photo');
      }
    };
    reader.readAsDataURL(file);
  };

  const deleteTeamMember = async (memberId) => {
    if (!window.confirm('Delete this team member?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/team/${memberId}`, { method: 'DELETE' });
      if (res.ok) {
        setTeam(team.filter(m => m._id !== memberId));
      } else {
        alert('Failed to delete team member');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting team member');
    }
  };

  // Projects Management
  const addProject = async () => {
    if (!newProject.name.trim()) {
      alert('Project name is required');
      return;
    }
    try {
      const res = await fetch(`${API_BASE_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
      if (res.ok) {
        const project = await res.json();
        setProjects([...projects, project]);
        setNewProject({ name: '', description: '', client: '', category: '' });
        alert('Project added!');
      } else {
        alert('Failed to add project');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding project');
    }
  };

  const handleProjectFile = async (projectId, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const project = projects.find(p => p._id === projectId);
        const res = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...project, image: e.target.result })
        });
        if (res.ok) {
          const updated = await res.json();
          setProjects(projects.map(p => p._id === projectId ? updated : p));
          alert('Image added to project!');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error adding image');
      }
    };
    reader.readAsDataURL(file);
  };

  const deleteProject = async (projectId) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      const res = await fetch(`${API_BASE_URL}/projects/${projectId}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter(p => p._id !== projectId));
      } else {
        alert('Failed to delete project');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting project');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    alert('Logged out successfully!');
  };

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>;

  return (
    <section className="admin-dashboard-section" style={{ backgroundColor: '#ffffff', padding: '40px', minHeight: '100vh' }}>
      {/* Header */}
      <div className="admin-dashboard-header">
        <div className="admin-header-content">
          <h1>🛡️ Admin Dashboard</h1>
          <p>Manage all content for SECURIX SERVICE</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'services' ? 'active' : ''}`}
          onClick={() => setActiveTab('services')}
        >
          🔍 Services
        </button>
        <button
          className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          📅 Events
        </button>
        <button
          className={`tab-button ${activeTab === 'team' ? 'active' : ''}`}
          onClick={() => setActiveTab('team')}
        >
          👥 Team
        </button>
        <button
          className={`tab-button ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          🎯 Projects
        </button>
        <button
          className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          ℹ️ About
        </button>
      </div>

      {/* Tab Content */}
      <div className="admin-content">
        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="admin-tab-content">
            <h2>Services Management</h2>
            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>Add New Service</h4>
              <input
                type="text"
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                placeholder="Service name"
                className="admin-input"
                style={{ marginBottom: '10px' }}
              />
              <textarea
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                placeholder="Service description"
                className="admin-textarea"
                style={{ marginBottom: '10px' }}
              />
              <input
                type="text"
                value={newService.icon}
                onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                placeholder="Icon emoji"
                className="admin-input"
                style={{ marginBottom: '10px' }}
              />
              <button onClick={addService} className="admin-btn-primary">
                + Add Service
              </button>
            </div>
            <div className="admin-items-grid">
              {services.map((service) => (
                <div key={service._id} className="admin-item-card">
                  {service.image && (
                    <img src={service.image} alt={service.name} className="admin-item-image" />
                  )}
                  <h4>{service.icon} {service.name}</h4>
                  <p style={{ fontSize: '12px', color: '#666' }}>{service.description}</p>
                  <div className="admin-item-actions">
                    <label className="admin-file-input">
                      📸 Add Image
                      <input
                        type="file"
                        onChange={(e) => handleServiceFile(service._id, e.target.files[0])}
                        accept="image/*"
                      />
                    </label>
                    <button
                      onClick={() => deleteService(service._id)}
                      className="admin-btn-danger"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Events Tab */}
        {activeTab === 'events' && (
          <div className="admin-tab-content">
            <h2>Events Management</h2>
            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>Add New Event</h4>
              <input
                type="text"
                value={newEvent.name}
                onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                placeholder="Event name"
                className="admin-input"
                style={{ marginBottom: '10px' }}
              />
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                placeholder="Event description"
                className="admin-textarea"
                style={{ marginBottom: '10px' }}
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="admin-input"
                style={{ marginBottom: '10px' }}
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                className="admin-input"
                style={{ marginBottom: '10px' }}
              />
              <input
                type="text"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                placeholder="Location"
                className="admin-input"
                style={{ marginBottom: '10px' }}
              />
              <button onClick={addEvent} className="admin-btn-primary">
                + Add Event
              </button>
            </div>
            <div className="admin-items-grid">
              {events.map((event) => (
                <div key={event._id} className="admin-item-card">
                  {event.image && (
                    <img src={event.image} alt={event.name} className="admin-item-image" />
                  )}
                  <h4>{event.name}</h4>
                  <p style={{ fontSize: '12px', color: '#666' }}>
                    {event.date && `📅 ${new Date(event.date).toLocaleDateString()}`}<br/>
                    {event.location && `📍 ${event.location}`}
                  </p>
                  <div className="admin-item-actions">
                    <label className="admin-file-input">
                      📸 Add Image
                      <input
                        type="file"
                        onChange={(e) => handleEventFile(event._id, e.target.files[0])}
                        accept="image/*"
                      />
                    </label>
                    <button
                      onClick={() => deleteEvent(event._id)}
                      className="admin-btn-danger"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
          <div className="admin-tab-content">
            <h2>Team Management</h2>
            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>Add New Team Member</h4>
              <input
                type="text"
                value={newTeamMember.name}
                onChange={(e) => setNewTeamMember({ ...newTeamMember, name: e.target.value })}
                placeholder="Team member name"
                className="admin-input"
                style={{ marginBottom: '10px' }}
              />
              <input
                type="text"
                value={newTeamMember.position}
                onChange={(e) => setNewTeamMember({ ...newTeamMember, position: e.target.value })}
                placeholder="Position"
                className="admin-input"
                style={{ marginBottom: '10px' }}
              />
              <textarea
                value={newTeamMember.bio}
                onChange={(e) => setNewTeamMember({ ...newTeamMember, bio: e.target.value })}
                placeholder="Bio"
                className="admin-textarea"
                style={{ marginBottom: '10px' }}
              />
              <button onClick={addTeamMember} className="admin-btn-primary">
                + Add Member
              </button>
            </div>
            <div className="admin-items-grid">
              {team.map((member) => (
                <div key={member._id} className="admin-item-card">
                  {member.image && (
                    <img src={member.image} alt={member.name} className="admin-item-image" />
                  )}
                  <h4>{member.name}</h4>
                  <p style={{ fontSize: '12px', color: '#666' }}>{member.position}</p>
                  <div className="admin-item-actions">
                    <label className="admin-file-input">
                      📸 Add Photo
                      <input
                        type="file"
                        onChange={(e) => handleTeamFile(member._id, e.target.files[0])}
                        accept="image/*"
                      />
                    </label>
                    <button
                      onClick={() => deleteTeamMember(member._id)}
                      className="admin-btn-danger"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="admin-tab-content">
            <h2>Projects Management</h2>
            <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <h4>Add New Project</h4>
              <input
                type="text"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                placeholder="Project name"
                className="admin-input"
                style={{ marginBottom: '10px' }}
              />
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Project description"
                className="admin-textarea"
                style={{ marginBottom: '10px' }}
              />
              <input
                type="text"
                value={newProject.client}
                onChange={(e) => setNewProject({ ...newProject, client: e.target.value })}
                placeholder="Client name"
                className="admin-input"
                style={{ marginBottom: '10px' }}
              />
              <input
                type="text"
                value={newProject.category}
                onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                placeholder="Category"
                className="admin-input"
                style={{ marginBottom: '10px' }}
              />
              <button onClick={addProject} className="admin-btn-primary">
                + Add Project
              </button>
            </div>
            <div className="admin-items-grid">
              {projects.map((project) => (
                <div key={project._id} className="admin-item-card">
                  {project.image && (
                    <img src={project.image} alt={project.name} className="admin-item-image" />
                  )}
                  <h4>{project.name}</h4>
                  <p style={{ fontSize: '12px', color: '#666' }}>
                    {project.client && `Client: ${project.client}`}<br/>
                    {project.category && `Category: ${project.category}`}
                  </p>
                  <div className="admin-item-actions">
                    <label className="admin-file-input">
                      📸 Add Image
                      <input
                        type="file"
                        onChange={(e) => handleProjectFile(project._id, e.target.files[0])}
                        accept="image/*"
                      />
                    </label>
                    <button
                      onClick={() => deleteProject(project._id)}
                      className="admin-btn-danger"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="admin-tab-content">
            <h2>About Content</h2>
            <div style={{ marginBottom: '20px' }}>
              <h4>Main Content</h4>
              <textarea
                value={aboutContent.mainContent}
                onChange={(e) => setAboutContent({ ...aboutContent, mainContent: e.target.value })}
                placeholder="Enter main about content"
                className="admin-textarea"
              ></textarea>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h4>Mission</h4>
              <textarea
                value={aboutContent.mission}
                onChange={(e) => setAboutContent({ ...aboutContent, mission: e.target.value })}
                placeholder="Enter mission statement"
                className="admin-textarea"
              ></textarea>
            </div>
            <div style={{ marginBottom: '20px' }}>
              <h4>Vision</h4>
              <textarea
                value={aboutContent.vision}
                onChange={(e) => setAboutContent({ ...aboutContent, vision: e.target.value })}
                placeholder="Enter vision statement"
                className="admin-textarea"
              ></textarea>
            </div>
            <button onClick={saveAbout} className="admin-btn-primary">
              💾 Save About Content
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
