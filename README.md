# EasyCode – A Full-Stack CLI & Backend Toolkit

**EasyCode** is a modern, full-stack monorepo built with **Bun** and **TypeScript** that empowers developers with a powerful CLI tool and a robust backend server. Designed for efficiency and ease of use, it provides an interactive terminal experience backed by a dedicated server for data management and processing.

## Core Features

- **Interactive CLI Interface** – Navigate and manage tasks seamlessly from your terminal.
- **Dedicated Backend Server** – Handles all server-side logic, data processing, and persistence.
- **Modular Monorepo Architecture** – Built with Bun workspaces, featuring:
  - `packages/cli` – The command-line interface for user interaction.
  - `packages/server` – The backend server for API and business logic.
  - `packages/database` – Centralized data layer for consistent storage.
  - `packages/shared` – Common types and utilities shared across the stack.
- **Type-Safe Development** – Leverages TypeScript throughout for reliability and maintainability.
- **Fast & Modern Toolchain** – Powered by [Bun](https://bun.sh), delivering rapid installation, execution, and testing.

## Getting Started

```bash
# Install dependencies
bun install

# Start the CLI interface
bun run cli

# Start the backend server
bun run server

# Run tests
bun test
```

## Development

For detailed development instructions, workspace setup, and contribution guidelines, please refer to the individual `README.md` files within each package:

- [`packages/cli/README.md`](packages/cli/README.md)
- [`packages/server/README.md`](packages/server/README.md)
- [`packages/database/README.md`](packages/database/README.md)
- [`packages/shared/README.md`](packages/shared/README.md)

---

# **EasyCode** – Simplifying full-stack development, one command at a time.
