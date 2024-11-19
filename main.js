import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import os from 'os';

let mainWindow;

// Create the Electron window
app.on('ready', () => {
     mainWindow = new BrowserWindow({
          width: 800,
          height: 600,
          webPreferences: {
               nodeIntegration: true,
               contextIsolation: false,
          },
     });

     mainWindow.loadFile('index.html'); // Load your frontend
});

// Handle fetching drives
ipcMain.handle('get-drives', () => {
     if (os.platform() === 'win32') {
          // Windows-specific logic for detecting drives
          const drives = ['C:\\', 'D:\\', 'E:\\', 'F:\\']; // Example drives; you may use a library to detect these dynamically.
          return drives;
     }
     return [];
});

const excludedFolders = ['System Volume Information', '$RECYCLE.BIN'];
// Handle fetching files in a directory
ipcMain.handle('get-files', (event, drivePath) => {
     try {
          const files = fs.readdirSync(drivePath)
               .filter((file) => !excludedFolders.includes(file)) // Exclude known system folders
               .map((file) => {
                    const filePath = path.join(drivePath, file);
                    try {
                         const isDirectory = fs.lstatSync(filePath).isDirectory();
                         return { name: file, isDirectory };
                    } catch (error) {
                         return null;
                    }
               });

          return files.filter((file) => file !== null);
     } catch (error) {
          return { error: error.message };
     }
});
