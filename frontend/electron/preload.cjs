const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Add IPC channels here
  getSystemInfo: () => ipcRenderer.invoke('get-system-info')
});
