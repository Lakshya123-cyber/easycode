# EasyCode

**EasyCode** is an AI-powered command-line coding assistant that helps you write, edit, explain, and manage code directly from your terminal.

Built with **Bun**, **TypeScript**, and **OpenTUI**, EasyCode provides a fast, interactive terminal experience while communicating with a cloud backend hosted on Railway.

---

## Features

* AI-powered coding assistant
* Interactive terminal interface
* Fast performance with Bun
* Support for multiple AI models
* Cloud-powered backend
* TypeScript-first architecture
* Real-time streaming AI responses

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Lakshya123-cyber/easycode.git
cd easycode
```

### 2. Install dependencies

```bash
bun install
```

### 3. Configure your environment

Copy the example environment file:

```bash
cp .env.example .env
```

Open the `.env` file and add your API keys.

### 4. Link the CLI globally

```bash
bun run link:cli
```

You can now use EasyCode from any directory:

```bash
easycode
```

---

## Updating EasyCode

To update to the latest version:

```bash
git pull
bun install
bun run link:cli
```

---

## 🛠️ Development

### Running the CLI

Start the CLI in development mode:

```bash
bun run dev:cli
```

### Running the Backend

The production backend is hosted on Railway, so you only need to run the server locally if you're developing or modifying the backend.

Before starting the server, update your `.env` file:

```env
API_URL=http://localhost:3000
```

Then start the backend:

```bash
bun run dev:server
```
---

## 📁 Project Structure

```text
easycode/
├── packages/
│   ├── cli/        # Terminal application
│   ├── server/     # Backend API
│   └── shared/     # Shared types and utilities
├── .env.example
└── package.json
```

---

## 🤝 Contributing

Contributions, feature requests, and bug reports are welcome.

If you'd like to contribute:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a Pull Request.
