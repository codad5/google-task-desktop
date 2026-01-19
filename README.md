# Google Task Desktop

An unofficial, lightweight desktop client for Google Tasks built with **Tauri**, **React**, **TypeScript**, and **Rust**.

![Screenshot](dist/assets/screenshot.png)

## Features

### Core
- ✅ Google OAuth authentication
- ✅ View all task lists and tasks
- ✅ Create, edit, and delete tasks
- ✅ Mark tasks complete/incomplete
- ✅ Star/unstar important tasks
- ✅ Create and manage subtasks
- ✅ Move tasks between lists

### Advanced
- ✅ Inline task editing (click to edit title, notes, due date)
- ✅ Drag-and-drop task reordering
- ✅ Due date/time picker with Today/Tomorrow quick chips
- ✅ Task due time notifications (OS native)
- ✅ Collapsible sidebar with list visibility toggles
- ✅ Starred tasks view across all lists
- ✅ Multi-account support (sign out and sign in with another account)

## Tech Stack

- **Frontend**: React + TypeScript + Material-UI (MUI)
- **Backend**: Rust + Tauri
- **State Management**: Recoil (minimal, UI-only)
- **Architecture**: Layered (API Client → Repository → Service → Hooks → Components)

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Node.js](https://nodejs.org/) (v18+)
- Cargo (comes with Rust)

## Installation

```bash
git clone https://github.com/codad5/google-task-desktop.git
cd google-task-desktop
npm install
npm run launch:dev
```

## Setup

### Google Cloud Configuration

1. Create a new project on [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the **Google Tasks API**
3. Create OAuth 2.0 credentials (Desktop app)
4. Copy the Client ID and Client Secret
5. Create a `.env` file:
   ```
   VITE_GOOGLE_CLIENT_ID=<YOUR_CLIENT_ID>
   VITE_GOOGLE_CLIENT_SECRET=<YOUR_CLIENT_SECRET>
   ```

### IDE Setup (Recommended)

- [VS Code](https://code.visualstudio.com/)
- [Tauri Extension](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## Roadmap

- [x] Login/Authentication
- [x] Task lists CRUD
- [x] Tasks CRUD with subtasks
- [x] Star/unstar tasks
- [x] Due date/time with notifications
- [x] Inline editing
- [x] Drag-and-drop reordering
- [x] Multi-account support
- [x] Proper state management (Recoil)
- [ ] Global keyboard shortcuts
- [ ] Offline support with sync

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for a detailed explanation of the codebase structure and design patterns.

## License

[GPL-3.0](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
