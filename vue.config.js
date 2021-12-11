module.exports = {
  pluginOptions: {
    electronBuilder: {
      disableMainProcessTypescript: false, // Manually disable typescript plugin for main process. Enable if you want to use regular js for the main process (src/background.js by default).
      mainProcessTypeChecking: false, // Manually enable type checking during webpack bundling for background file.
      nodeIntegration: true,
      removeElectronJunk: false
    }
  }
}