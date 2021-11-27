const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  ipcRenderer: {
    openDialog() {
      ipcRenderer.send('app:folder-dialog-open');
    },
    scanFolder(folder) {
      ipcRenderer.send('app:scan-folder', folder);
    },
    openFolder(file) {
      ipcRenderer.send('app:open-folder', file);
    },
    on(channel, func) {
      const validChannels = ['ipc-example', 'selected-folder', 'scan-finshed'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      const validChannels = ['ipc-example'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
