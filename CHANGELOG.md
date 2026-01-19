# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-19

### 🎉 First Major Release

Complete rewrite of the application with modern architecture, new features, and improved UX.

### Added

- **Architecture Rewrite**: Layered architecture (API Client → Repository → Service → Hooks → Components)
- **Recoil State Management**: Minimal, UI-only state with proper separation
- **Starred Tasks**: Star important tasks and view them in dedicated "Starred" section
- **Inline Task Editing**: Click any task to edit title, notes, and due date in place
- **Drag-and-Drop Reordering**: Reorder tasks within a list using drag handles
- **Subtask Support**: Create and manage subtasks with proper parent-child display
- **Task Due Date Notifications**: OS notifications at 9 AM on task due dates
- **Collapsible Sidebar**: Hide/show sidebar with list visibility toggles  
- **Multi-Account Support**: Sign out and sign in with a different Google account
- **Splash Screen**: Animated loading screen with pulsing logo
- **Comprehensive Documentation**: ARCHITECTURE.md explaining the codebase

### Changed

- **UI Framework**: Migrated from Chakra UI to Material-UI (MUI)
- **Type Safety**: Strong TypeScript types throughout (AppTask, GoogleTask, etc.)
- **Simplified Due Dates**: Date-only support (Google Tasks API limitation)

### Fixed

- Task list rename now works correctly (added ID to PUT request body)
- Sign out experience properly clears cached credentials
- Proper type handling between Google API types and app types

### Known Limitations

- **Due times not supported**: Google Tasks API only stores dates, not times. Notifications trigger at 9 AM on the due date.
- **Offline mode**: Not yet implemented (planned for future release)

---

## [0.0.9] - 2024-04-02

### Previous Release

- Basic Google Tasks functionality
- Login/logout support
- Create, delete, complete tasks

---

## Future Plans

- [ ] Global keyboard shortcuts
- [ ] Offline support with sync
- [ ] Recurring tasks
- [ ] Dark mode themes
