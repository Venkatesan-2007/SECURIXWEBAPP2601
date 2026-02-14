const fs = require('fs');
const path = require('path');

const filesToDelete = [
  'g:/securix official/SECUXIX-WEB/src/pages/Events.jsx',
  'g:/securix official/SECUXIX-WEB/src/pages/admin/Admin.css',
  'g:/securix official/SECUXIX-WEB/src/pages/admin/AdminDashboard.jsx',
  'g:/securix official/SECUXIX-WEB/src/pages/admin/AdminLogin.jsx'
];

const foldersToDelete = [
  'g:/securix official/SECUXIX-WEB/src/pages/admin',
  'g:/securix official/SECUXIX-WEB/src/context'
];

// Delete files first
filesToDelete.forEach(file => {
  try {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`✓ Deleted file: ${file}`);
    } else {
      console.log(`- File not found: ${file}`);
    }
  } catch (err) {
    console.error(`✗ Error deleting file ${file}:`, err.message);
  }
});

// Delete folders
foldersToDelete.forEach(folder => {
  try {
    if (fs.existsSync(folder)) {
      fs.rmSync(folder, { recursive: true, force: true });
      console.log(`✓ Deleted folder: ${folder}`);
    } else {
      console.log(`- Folder not found: ${folder}`);
    }
  } catch (err) {
    console.error(`✗ Error deleting folder ${folder}:`, err.message);
  }
});

console.log('\n✓ Cleanup complete!');
