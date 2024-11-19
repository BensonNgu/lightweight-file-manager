const fileTypeIcons = {
     folder: 'fas fa-folder', // Folder icon
     pdf: 'fas fa-file-pdf', // PDF icon
     docx: 'fas fa-file-word', // Word document icon
     pptx: 'fas fa-file-powerpoint', // PowerPoint icon
     jpg: 'fas fa-file-image', // Image icon
     png: 'fas fa-file-image', // Image icon
     default: 'fas fa-file', // Default file icon
};

const { ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');
const JSZip = require('jszip'); // Required for docx-preview
const { renderAsync } = require('docx-preview'); // Import renderAsync function


let currentPath = null;
let activeDrive = null;

// Toggle Sidebar
document.getElementById('toggle-sidebar').addEventListener('click', () => {
     const sidebar = document.getElementById('sidebar');
     sidebar.classList.toggle('collapsed');
});

// Fetch drives and populate the UI
async function loadDrives() {
     const drives = await ipcRenderer.invoke('get-drives');
     const driveList = document.getElementById('drive-list');
     driveList.innerHTML = '';
     drives.forEach((drive) => {
          const driveItem = document.createElement('div');
          driveItem.className = 'drive-item';
          driveItem.innerHTML = `<i class="fas fa-hdd drive-icon"></i> <span>${drive}</span>`;
          driveItem.onclick = () => {
               setActiveDrive(drive);
               loadFiles(drive);
          };
          driveList.appendChild(driveItem);
     });
}

// Set the active drive
function setActiveDrive(drive) {
     activeDrive = drive;
     const driveItems = document.querySelectorAll('.drive-item');
     driveItems.forEach((item) => {
          const isActive = item.innerText.trim() === drive;
          const icon = item.querySelector('.drive-icon');
          icon.style.color = isActive ? '#007bff' : '#ccc'; // Active: blue, Inactive: gray
     });
}

function getFileIcon(file) {
     if (file.isDirectory) {
          return fileTypeIcons.folder; // Use folder icon for directories
     }
     const extension = path.extname(file.name).slice(1).toLowerCase(); // Get file extension
     return fileTypeIcons[extension] || fileTypeIcons.default; // Use mapped icon or default
}

// Fetch files from the selected drive and populate the UI
async function loadFiles(drivePath) {
     const fileList = document.getElementById('file-list');
     const goBackButton = document.getElementById('go-back');
     currentPath = drivePath; // Update the current path
     document.getElementById('currentPath').innerText = `Current Path: ${currentPath}`;
     fileList.innerHTML = 'Loading files...';

     // Enable or disable the "Go Back" button
     goBackButton.disabled = currentPath === path.dirname(currentPath);

     const result = await ipcRenderer.invoke('get-files', drivePath);

     if (result.error) {
          fileList.innerHTML = `<p style="color:red;">Error: ${result.error}</p>`;
          return;
     }

     fileList.innerHTML = '';
     result.forEach((file) => {
          const iconClass = getFileIcon(file); // Get the appropriate icon
          const fileItem = document.createElement('div');
          fileItem.className = 'item';
          fileItem.innerHTML = `<i class="${iconClass}" style="margin-right: 8px;"></i> ${file.name}`;
          fileItem.onclick = () => {
               if (file.isDirectory) {
                    loadFiles(`${drivePath}\\${file.name}`);
               } else {
                    previewFile(`${drivePath}\\${file.name}`); // Preview the selected file
               }
          };
          fileList.appendChild(fileItem);
     });
}


function previewFile(filePath) {
     const previewContainer = document.getElementById('preview-pane');
     const previewContent = document.getElementById('preview-content');
     const extension = path.extname(filePath).slice(1).toLowerCase();

     previewContainer.style.display = 'block';
     previewContent.innerHTML = 'Loading preview...';

     if (['jpg', 'png', 'gif', 'jpeg'].includes(extension)) {
          previewContent.innerHTML = `<img src="file://${filePath}" alt="Preview" style="max-width: 100%; max-height: 100%;">`;
     } else if (extension === 'pdf') {
          previewPDF(filePath);
     } else if (extension === 'docx') {
          previewWord(filePath);
     } else if (extension === 'pptx') {
          previewPowerPoint(filePath);
     } else if (extension === 'txt') {
          fs.readFile(filePath, 'utf8', (err, data) => {
               if (err) {
                    previewContent.innerHTML = `<p style="color:red;">Error: Cannot preview text file</p>`;
                    return;
               }
               previewContent.innerHTML = `<pre>${data}</pre>`;
          });
     } else {
          previewContent.innerHTML = `<p style="color:red;">No preview available for this file type.</p>`;
     }
}

function previewPDF(filePath) {
     const previewContent = document.getElementById('preview-content');
     previewContent.innerHTML = `
          <object data="file://${filePath}" type="application/pdf" style="width:100%; height:100%;">
               <p>It appears you don't have a PDF plugin for this browser. You can <a href="file://${filePath}">download the PDF file here</a>.</p>
          </object>`;
}



function previewWord(filePath) {
     const previewContent = document.getElementById('preview-content');
     previewContent.innerHTML = 'Loading Word document...';

     // Read the DOCX file as a Buffer
     fs.readFile(filePath, (err, data) => {
          if (err) {
               previewContent.innerHTML = `<p style="color:red;">Error: Cannot preview Word document (${err.message})</p>`;
               return;
          }

          // Convert Buffer to Uint8Array for docx-preview
          const uint8Array = new Uint8Array(data);

          // Render the Word document
          renderAsync(uint8Array, previewContent)
               .then(() => {
                    console.log('Word document rendered successfully');
               })
               .catch((error) => {
                    previewContent.innerHTML = `<p style="color:red;">Error: Failed to render Word document (${error.message})</p>`;
               });
     });
}

function previewPowerPoint(filePath) {
     const previewContent = document.getElementById('preview-content');
     previewContent.innerHTML = 'PowerPoint preview is under construction.';

     // Add your logic to parse PowerPoint here
     // Alternatively, use `view.officeapps.live.com` for online preview
     const iframe = document.createElement('iframe');
     iframe.src = `https://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(filePath)}`;
     iframe.style.width = '100%';
     iframe.style.height = '400px';
     previewContent.appendChild(iframe);
}

// Handle "Go Back" button click
document.getElementById('go-back').onclick = () => {
     if (currentPath) {
          const parentPath = path.dirname(currentPath); // Get the parent folder
          loadFiles(parentPath); // Navigate to the parent folder
     }
};