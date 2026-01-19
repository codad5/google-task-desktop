<div align="center">

# Google Task Desktop

**An unofficial, lightweight desktop client for Google Tasks**

Built with **Tauri** | **React** | **TypeScript** | **Rust**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/codad5/google-task-desktop/releases)
[![License](https://img.shields.io/badge/license-GPL--3.0-green.svg)](LICENSE)
[![Tauri](https://img.shields.io/badge/Tauri-1.4-orange.svg)](https://tauri.app)

![Screenshot](dist/assets/screenshot.png)

</div>

---

## ✨ Features

### Core Functionality
- 📋 **Full Google Tasks Integration** - Sync with your Google account
- ✅ **Create, Edit, Delete Tasks** - Full CRUD operations
- 📁 **Multiple Task Lists** - Organize tasks in separate lists
- ⭐ **Star Important Tasks** - Quick access to starred tasks view
- 📅 **Due Dates** - Set due dates with Today/Tomorrow shortcuts
- 🔔 **Desktop Notifications** - Configurable reminder time on due dates

### Advanced Features
- ✏️ **Inline Editing** - Click any task to edit in place
- 🔃 **Drag-and-Drop** - Reorder tasks within lists
- 📎 **Subtasks** - Create and manage subtasks
- 👁️ **Collapsible Sidebar** - Show/hide lists with visibility toggles
- 🔄 **Multi-Account** - Switch between Google accounts
- 🎨 **Modern UI** - Clean Material Design interface

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript, Material-UI |
| **Backend** | Rust, Tauri 1.4 |
| **State** | Recoil (minimal, UI-only) |
| **Architecture** | Layered (Repository → Service → Hooks → Components) |

## 📥 Installation

### From Releases

Download the latest release for your platform from the [Releases](https://github.com/codad5/google-task-desktop/releases) page.

### From Source

#### Prerequisites
- [Rust](https://www.rust-lang.org/tools/install) (latest stable)
- [Node.js](https://nodejs.org/) (v18+)

#### Steps

```bash
# Clone the repository
git clone https://github.com/codad5/google-task-desktop.git
cd google-task-desktop

# Install dependencies
npm install

# Start development server
npm run launch:dev

# Build for production
npm run tauri build
```

## ⚙️ Configuration

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable **Google Tasks API**
4. Create **OAuth 2.0 Client ID** (Desktop application)
5. Create a `.env` file:

```env
VITE_GOOGLE_CLIENT_ID=your_client_id
VITE_GOOGLE_CLIENT_SECRET=your_client_secret
```

## 📖 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed codebase architecture
- [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute
- [CHANGELOG.md](./CHANGELOG.md) - Version history

## ⚠️ Known Limitations

| Limitation | Reason |
|------------|--------|
| **No due times** | Google Tasks API only supports dates, not times |
| **No offline mode** | Planned for future release |

> **Note**: Notifications are triggered at your configured time on the due date (default: 9 AM). Change it in Settings.

## 🗺️ Roadmap

- [x] Core task management
- [x] Inline editing
- [x] Drag-and-drop reordering
- [x] Starred tasks
- [x] Desktop notifications
- [ ] Global keyboard shortcuts
- [ ] Offline support with sync
- [x] Dark mode
- [ ] Theme toggle (light/dark)
- [ ] Recurring tasks

## 👨‍💻 Author

**Aniezeofor Chibueze Michael (Codad5)**

- GitHub: [@codad5](https://github.com/codad5)
- Website: [codad5.me](https://codad5.me)
- Twitter: [@codaborealise](https://twitter.com/codaborealise)

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the **GPL-3.0 License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tauri](https://tauri.app) - For the amazing cross-platform framework
- [Material-UI](https://mui.com) - For the beautiful React components
- [Google Tasks API](https://developers.google.com/tasks) - For the backend integration

---

<div align="center">

**If you find this project helpful, please consider giving it a ⭐!**

[Report Bug](https://github.com/codad5/google-task-desktop/issues) · [Request Feature](https://github.com/codad5/google-task-desktop/issues)

</div>
