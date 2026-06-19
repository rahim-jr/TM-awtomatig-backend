# API Task Manager

Simple Express and TypeScript backend for a task manager API connected to MongoDB with Mongoose.

## Setup

```bash
npm install
```

Create a `.env` file:

```bash
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_ORIGIN=http://localhost:3000
```

For Vercel, set these backend environment variables:

```bash
MONGODB_URI=your_mongodb_atlas_connection_string
CLIENT_ORIGIN=https://your-frontend.vercel.app
```

To allow Vercel preview URLs too:

```bash
CLIENT_ORIGIN=https://your-frontend.vercel.app,https://*.vercel.app
```

## Run

Start the backend in development mode:

```bash
npm run dev
```

Expected output:

```text
MongoDB connected
Server running on port 5000
```

The dev command watches your TypeScript files and restarts the backend when you make changes.

## Production Build

Build the project:

```bash
npm run build
```

## API Testing

Postman testing steps are in [postman-testing.md](./postman-testing.md).
