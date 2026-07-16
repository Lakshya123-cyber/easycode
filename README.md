<div align="center">

<br />
<br />

<h1>EasyCode</h1>

<p>
An AI coding agent that understands your codebase, plans tasks,
edits files, executes commands, and streams responses directly in your terminal.
</p>

<p>
Built with Bun, OpenTUI, Hono, Prisma, Clerk, and the AI SDK to provide a fast,
native terminal experience with persistent sessions, authentication, and
multi-provider AI support.
</p>

<br />

<p>
  <a href="#"><img src="https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white" alt="Bun" /></a>&nbsp;
  <a href="#"><img src="https://img.shields.io/badge/OpenTUI-111111?style=for-the-badge" alt="OpenTUI" /></a>&nbsp;
  <a href="#"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" /></a>&nbsp;
  <a href="#"><img src="https://img.shields.io/badge/Hono-E36002?style=for-the-badge&logo=hono&logoColor=white" alt="Hono" /></a>&nbsp;
  <a href="#"><img src="https://img.shields.io/badge/Neon-00E599?style=for-the-badge&logo=neon&logoColor=black" alt="Neon" /></a>&nbsp;
  <a href="#"><img src="https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk" /></a>&nbsp;
  <a href="#"><img src="https://img.shields.io/badge/Polar-000000?style=for-the-badge&logo=polar&logoColor=white" alt="Polar" /></a>&nbsp;
  <a href="#"><img src="https://img.shields.io/badge/Sentry-362D59?style=for-the-badge&logo=sentry&logoColor=white" alt="Sentry" /></a>&nbsp;
  <a href="#"><img src="https://img.shields.io/badge/Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white" alt="Railway" /></a>
</p>

</div>

<br />

## Features

- **Terminal AI Chat** - Run an AI coding assistant directly in your terminal with an OpenTUI and React interface
- **Plan and Build Modes** - Use read-only planning tools or enable write, edit, and shell execution tools for implementation
- **Real-Time Streaming** – Stream AI responses token-by-token using the Vercel AI SDK.
- **Developer Tools** – Read, search, edit and create files, execute shell commands, and inspect project structure directly from the terminal.
- **Multi-Model Support** – Use OpenAI, Anthropic, Google Gemini and OpenRouter models interchangeably.
- **Session Persistence** – Resume previous conversations with complete chat history stored in PostgreSQL.
- **Clerk OAuth** - Authenticate the CLI through a browser-based Clerk OAuth flow
- **Project Context** – Maintain conversation history and project context across long-running development sessions.

## Why EasyCode?

Most AI coding tools either live in the browser or act as simple chat interfaces.

EasyCode brings AI directly into the terminal, combining conversational assistance with project-aware tooling. It can inspect codebases, plan implementation steps, edit files, execute shell commands, and maintain long-running development sessions—all while supporting multiple AI providers through a modular architecture.

## Getting Started

### Prerequisites

- [Bun](https://bun.com/) installed
- PostgreSQL database, such as [Neon](https://neon.com/)
- [Clerk](https://clerk.com/) application configured for OAuth
- OpenRouter and/or Anthropic and/or OpenAI API key
- [Polar](https://polar.sh/) account and credits meter

### 1. Clone and install

```bash
git clone git@github.com:Lakshya123-cyber/easycode.git
cd easycode
bun install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Fill in the required values:

```bash
API_URL=http://localhost:3000
DATABASE_URL=

ANTHROPIC_API_KEY=
OPENAI_API_KEY=

CLERK_FRONTEND_API=
CLERK_OAUTH_CLIENT_SECRET=
CLERK_OAUTH_CLIENT_ID=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
JWT_SECRET=jwt-secret

POLAR_ACCESS_TOKEN=
POLAR_PRODUCT_ID=
POLAR_SERVER=sandbox
POLAR_CREDITS_METER_ID=
```

### 3. Set up Clerk OAuth

EasyCode authenticates the CLI through a browser-based Clerk OAuth flow. The CLI opens Clerk authorization in the browser, Clerk redirects to the server at `/auth/callback`, and the server forwards the authorization code back to the local CLI callback server.

In [Clerk](https://clerk.com/) dashboard:

1. Go to **Configure > Developers > OAuth applications**.
2. Click **Add OAuth application**.
3. Name it anything, for example `EasyCode`.
4. Select these four scopes: `openid`, `email`, `profile`, and `offline_access`.
5. Turn on **Public**. This is required for the Authorization Code with PKCE flow used by the CLI.
6. Turn on **Consent screen** so users can approve the requested scopes.
7. Add `http://localhost:3000/auth/callback` as a redirect URI for local development.
8. Add your deployed callback URL as another redirect URI for production, for example `https://your-deployment.com/auth/callback`.

You can keep both local and production redirect URIs on the same OAuth application.

Copy the generated application credentials into `.env`:

| Environment variable | Clerk value |
|----------------------|-------------|
| `CLERK_OAUTH_CLIENT_ID` | OAuth application Client ID |
| `CLERK_OAUTH_CLIENT_SECRET` | OAuth application Client Secret |
| `CLERK_FRONTEND_API` | Clerk frontend API URL |
| `CLERK_PUBLISHABLE_KEY` | Clerk publishable key |
| `CLERK_SECRET_KEY` | Clerk secret key |

### 4. Set up Polar billing

EasyCode uses Polar credits to gate new work and bill completed AI usage. The server checks the user's active meter balance before creating sessions or sending chat requests, then ingests usage events after AI responses finish.

In [Polar](https://polar.sh/) dashboard, use sandbox mode for local development and create a meter with these exact settings:

| Setting | Value |
|---------|-------|
| Meter name | `easycode_credits` |
| Filter | Name equals `easycode_usage` |
| Aggregation | Sum |
| Aggregation property | `credits` |

The event name and metadata key must match exactly. The server sends usage events like this:

```ts
{
  name: "easycode_usage",
  metadata: { credits }
}
```

Next, create a meter credits benefit and attach it to a one-time purchase product:

1. Create a benefit using the `easycode_credits` meter.
2. Set the credited units, for example `1000` credits.
3. Create a one-time purchase product, for example `$20` for `1000` credits.
4. Attach the credits benefit to that product.
5. Set the customer portal visibility to private so purchases happen through API-generated checkout links.

Then copy the required Polar values into `.env`:

| Environment variable | Where to find it |
|----------------------|------------------|
| `POLAR_ACCESS_TOKEN` | Polar developer settings token |
| `POLAR_PRODUCT_ID` | Product ID from the credits product |
| `POLAR_SERVER` | Use `sandbox` locally, `production` for live billing |
| `POLAR_CREDITS_METER_ID` | Meter ID from the meter URL |

The CLI upgrade flow calls `/billing/checkout`, which opens a Polar checkout URL. The usage flow calls `/billing/portal`, which opens the customer's Polar portal.

### 5. Set up the database

Generate the Prisma client:

```bash
bun run --cwd packages/database db:generate
```

Apply your Prisma schema to the configured Postgres database using your preferred Prisma workflow.

### 6. Run the server

```bash
bun run dev:server
```

The API runs on `http://localhost:3000`.

### 7. Run the CLI

In another terminal:

```bash
bun run dev:cli
```

To build and link the local CLI binary:

```bash
bun run link:cli
easycode
```

## Project Structure

```
packages/
├── cli/                         # OpenTUI + React terminal client
│   ├── bin/                     # easycode executable shim
│   └── src/
│       ├── components/          # Terminal UI components, dialogs, messages
│       ├── hooks/               # Chat and UI hooks
│       ├── layouts/             # Root terminal layouts
│       ├── lib/                 # API client, auth, OAuth, local tool execution
│       ├── providers/           # Dialog, keyboard, prompt, theme, toast providers
│       └── screens/             # Home, new session, and session screens
├── database/                    # Prisma schema, generated client, database exports
├── server/                      # Hono API for auth, billing, sessions, and chat
└── shared/                      # Shared schemas, tool contracts, and model registry
```
