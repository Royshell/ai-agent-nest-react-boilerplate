# AI Agent — NestJS + React Boilerplate

A **production-ready monorepo boilerplate** for building AI-powered agents with a modern, clean architecture.

Built with:

- **TypeScript**
- **NestJS** — backend API & agent logic
- **React** — chat-based frontend UI
- **Shared packages** — types & utilities reused across apps

This repository is meant to be a **starting point**, not a locked framework.  
Feel free to copy, fork, strip it down, or build on top of it.

---

## Demo

![AI Agent Demo](./docs/images/chat-bot.gif)

---

## Monorepo Structure

```txt
apps/
  server/        # NestJS backend (API + AI agent)
  web/           # React frontend (chat UI)
packages/
  shared/        # Shared TypeScript types & utilities
Each app is isolated, with its own environment variables and lifecycle, while sharing common code where it makes sense.

Getting Started
1. Clone the repository
bash
Copy code
git clone https://github.com/your-username/ai-agent-nest-react-boilerplate.git
cd ai-agent-nest-react-boilerplate
2. Environment variables
This boilerplate currently uses Google Gemini as the LLM provider.

Backend (apps/server)
Copy the example env file:

bash
Copy code
cp apps/server/.env.example apps/server/.env
Create a Gemini API key:

Visit: https://ai.google.dev/

Generate an API key

Fill in the .env file:

env
Copy code
GEMINI_API_KEY=your_api_key_here
⚠️ .env files are not committed to the repository.
Only .env.example files are tracked.

3. Install dependencies
You can use pnpm (recommended) or npm.

Using pnpm
bash
Copy code
pnpm install
Using npm
bash
Copy code
npm install
4. Run the project (development mode)
From the repository root:

bash
Copy code
pnpm dev
or

bash
Copy code
npm run dev
This will start:

the NestJS backend

the React frontend

5. Open the app
Once everything is running, open:

arduino
Copy code
http://localhost:5173
(React dev server default)

About This Boilerplate
This is a boilerplate, not a framework.

You are encouraged to:

copy files

remove parts

reshape the architecture

reuse whatever helps you

The goal is to provide a clean, opinionated starting point for AI-driven applications without over-engineering.

LLM Support
The current implementation is Gemini-based.

The architecture is intentionally designed so additional LLM providers can be added easily.

Planned / upcoming variants:

OpenAI

Anthropic

Local / self-hosted models

License & Usage
Use it freely.

There are no restrictions on copying or adapting parts of the codebase.
If this helps you build something useful or interesting — that’s exactly the point.

Notes
Strict TypeScript configuration

Type-only imports enforced

Environment variables are app-scoped (server / web)

Designed to scale beyond a single agent or UI

Happy hacking 🚀

yaml
Copy code
