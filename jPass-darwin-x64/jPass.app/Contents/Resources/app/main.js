const {app, BrowserWindow, ipcMain} = require('electron')
const dialog = require('electron').dialog
const path = require('path')
const url = require('url')
let connected = null;
let win

ipcMain.on('chooseFile', (event, arg) => {
  dialog.showOpenDialog({
    properties: ['openFile'],
    filters: [
      { name: 'RSA Private key', extensions: ['*'] }
    ],
  }, function (files) {
    if (files) event.sender.send('chooseFile-reply', files)
  })
});

ipcMain.on('connect', (event, arg) => {
    if (connected != null)
        return event.sender.send('connect', connected);
    var demoCreds = {
      thumb:'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png', 
      name: 'John Smith', 
      username: "jsmith@ics.fr",
      role: 'user',
      groups: [
        {
          title: "My Vault",
          id: "jkfldsf342",
          type: "private",
          users: []
        },
        {
          title: "Developers",
          id: "dsqqsd43243dssd",
          type: "shared",
          users: []
        }
      ],
      last_modified: 1507713128
    };
    var adminCreds = {
      thumb:'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png', 
      name: 'Super admin', 
      username: "admin@ics.fr",
      role: 'administrator',
      groups: [
        {
          title: "My Vault",
          id: "dsqqsd43243",
          type: "private",
          users: []
        },
        {
          title: "Developers",
          id: "dsqqsd43243dssd",
          type: "shared",
          users: []
        },
        {
          title: "Tech",
          id: "dsdqs32432",
          type: "shared",
          users: []
        }
      ],
      last_modified: 1507713128
    };

    if (arg.username == "demo" && arg.password == "demo") {
      ret = demoCreds;
    } else if (arg.username == "admin" && arg.password == "admin") {
      ret = adminCreds;
    } else {
      dialog.showErrorBox('Error', 'Error while processing connection .. Try again')
      ret = null;
    }
    connected = ret;
    event.sender.send('connect-reply', ret);
});

exports.connectUser = function(data) {

}

function createWindow () {
  win = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  console.log('started');

  // Open the DevTools.
  win.webContents.openDevTools();

  win.webContents.on('jPass', function(data) {
    console.log(data);
  });
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})