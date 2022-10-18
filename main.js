const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');

const isMacOS = process.platform === 'darwin';
const isDev = process.env.NODE_ENV !== 'development';

// Create Main Window
function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: 'Image Resizer',
    width: isDev ? 1000 : 500,
    heigth: 600
  });

  // Open devtools if in development environment
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

// Create About Window
function createAboutWindow() {
  const aboutWindow = new BrowserWindow({
    title: 'Image Resizer',
    width: 300,
    heigth: 300
  });

  aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
}

// App is ready
app.whenReady().then(() => {
  createMainWindow();

  // Implement menu
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  // If no window exists, create the window
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  });
});

// Menu template
const menu = [
  ...(isMacOS ? [{
    label: app.name,
    submenu: [
      {
        label: 'About',
        click: createAboutWindow,
      }
    ]
  }] : [{
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: createAboutWindow,
        }
      ],
    }
  ]),
  {
    label: 'File',
    submenu: [
      {
        label: 'quit',
        click: () => app.quit(),
        accelerator: 'CmdOrCtrl+W'
      },
    ],
  },
];

// Alternate Menu Template using a role
// const menu = [
//   {
//     role: 'fileMenu',
//   },
// ];

// Check to see if not on MacOS. It not,
// then terminate the process
app.on('window-all-closed', () => {
  if (!isMacOS) {
    app.quit();
  }
})