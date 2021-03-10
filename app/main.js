const serverModule = require('./server');

// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')
const path = require('path')


let wnd1 = null, wnd2 = null;
function createWindow1() {
  // Create the browser window.
  wnd1 = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  wnd1.loadFile('index.html')

  wnd1.on('closed', () => {
    wnd1 = null;
  });
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

function closeWindow1() {
  if (wnd1) {
    wnd1.close();
    wnd1 = null;
  }
}

function createWindow2() {
  // Create the browser window.
  wnd2 = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  wnd2.loadFile('index.html')

  wnd2.on('closed', () => {
    wnd2 = null;
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

function closeWindow2() {
  if (wnd2) {
    wnd2.close();
    wnd2 = null;
  }
}

////////////////////////////////////////////////////////////////
//

function cb(msg) {
  switch (msg.type) {
    case 'openWindow1': {
      createWindow1();
    } break;
    case 'closeWindow1': {
      closeWindow1();
    } break;
    case 'openWindow2': {
      createWindow2();
    } break;
    case 'closeWindow2': {
      closeWindow2();
    } break;
    case 'quit': {
      closeWindow1();
      closeWindow2();
      app.quit();
    } break;
  }
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  serverModule.startServer(cb);

  // createWindow()

  // app.on('activate', function () {
  //   // On macOS it's common to re-create a window in the app when the
  //   // dock icon is clicked and there are no other windows open.
  //   if (BrowserWindow.getAllWindows().length === 0) createWindow()
  // })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  // if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
