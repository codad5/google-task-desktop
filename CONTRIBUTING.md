# Contributing to Google Task Desktop

First off, thank you for considering contributing to Google Task Desktop! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Coding Guidelines](#coding-guidelines)
- [Commit Messages](#commit-messages)

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the maintainers.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Set up the development environment** (see below)
4. **Create a branch** for your changes
5. **Make your changes** and test them
6. **Submit a pull request**

## Development Setup

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) (latest stable)
- [Node.js](https://nodejs.org/) (v18 or later)
- [Cargo](https://doc.rust-lang.org/cargo/) (comes with Rust)

### Installation

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/google-task-desktop.git
cd google-task-desktop

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Google OAuth credentials

# Start development server
npm run launch:dev
```

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Tasks API**
4. Create OAuth 2.0 credentials (Desktop application)
5. Copy credentials to your `.env` file

## Project Structure

```
google-task-desktop/
├── src/                    # React frontend
│   ├── api/                # API client and endpoints
│   ├── components/         # React components
│   ├── hooks/              # Custom React hooks
│   ├── repositories/       # Data access layer
│   ├── services/           # Business logic layer
│   ├── store/              # Recoil atoms
│   └── types/              # TypeScript types
├── src-tauri/              # Rust backend
│   └── src/
│       └── libs/           # Rust modules
└── docs/                   # Documentation
```

See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

## Making Changes

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring

### Testing Your Changes

1. Run the development server: `npm run launch:dev`
2. Test the feature manually
3. Ensure there are no TypeScript errors
4. Check the console for runtime errors

## Pull Request Process

1. **Update documentation** if you're changing functionality
2. **Update CHANGELOG.md** with your changes
3. **Ensure the app builds** without errors
4. **Write a clear PR description** explaining:
   - What changes you made
   - Why you made them
   - How to test them
5. **Request review** from maintainers

### PR Title Format

```
type(scope): description

Examples:
feat(tasks): add drag-and-drop reordering
fix(auth): resolve token refresh issue
docs(readme): update installation steps
```

## Coding Guidelines

### TypeScript

- Use strict TypeScript types (avoid `any`)
- Define interfaces for all data structures
- Use meaningful variable and function names

### React

- Use functional components with hooks
- Keep components small and focused
- Use Recoil for shared state only (UI state)

### Rust

- Follow Rust idioms and best practices
- Use descriptive error messages
- Document public functions

### File Organization

- One component per file
- Group related files in directories
- Export from index files when appropriate

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

### Examples

```
feat(notifications): add due date notifications

Implements OS notifications that trigger at 9 AM on task due dates.
Uses Tauri notification API for cross-platform support.
```

```
fix(auth): handle token expiration gracefully

- Added refresh token logic
- Improved error messaging
- Added automatic retry on 401
```

---

## Questions?

Feel free to open an issue if you have questions about contributing. We're happy to help!

**Thank you for contributing!** 🙏
