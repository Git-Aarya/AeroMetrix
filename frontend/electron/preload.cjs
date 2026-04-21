// Electron preload script that safely exposes a limited electronAPI (IPC channels) to the renderer process via contextBridge.
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Add IPC channels here
  getSystemInfo: () => ipcRenderer.invoke('get-system-info')
});
