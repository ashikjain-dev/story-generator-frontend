# Story Generator - Frontend

A premium, chat-based interface for generating creative stories from YouTube transcripts or text prompts. Built with **React**, **TypeScript**, and **Vite**.

## Features

- **Bidirectional Chat UI**: A seamless conversational experience between the user and the AI.
- **Premium Design System**: Clean dark-mode aesthetic built with Vanilla CSS and custom variables.
- **Session Persistence**: Automatic cookie-based session synchronization with the backend.
- **Micro-Animations**: Smooth message transitions and animated typing indicators.

## Tech Stack

- **Framework**: React 18+
- **Bundler**: Vite 5+ (Optimized for Node.js 20.17.0)
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Custom Variable System)
- **API Client**: Axios

## Getting Started

### Prerequisites

- Node.js (v20.17.0 or compatible)
- npm

### Installation

1. Clone the repository.
2. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root of the `frontend` directory and set the backend API URL:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Architecture

- `src/components/chat`: Core UI components for the chat interface.
- `src/hooks/useChat.ts`: Custom hook for managing message flow and API state.
- `src/services/api.service.ts`: Centralized Axios instance with credential support.
- `src/assets/styles/global.css`: Global design tokens and base utility classes.
