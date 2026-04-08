# User & Posts Dashboard

A modern, responsive web application that interacts with the JSONPlaceholder API. It allows users to browse a directory of users, search and filter by name or email, view dedicated profile pages with paginated posts, and securely publish entirely new rich-text posts that persist locally.

## Features

- **User Directory & Search:** Browse users with fast, real-time client-side filtering.
- **Dynamic Post Pagination:** View user posts cleanly formatted and separated across multiple pages for maximum performance.
- **Rich Text Modal:** Draft beautifully formatted posts using an integrated rich text editor housed in a floating modular overlay.
- **Strict Form Validation:** Client-side form handling and robust schema validations blocking invalid or empty submissions.
- **Global State Persistence:** Newly created posts are captured and persisted to local storage, seamlessly surviving browser refreshes.
- **Dark & Light Mode:** First-class responsive theming that remembers your preferred aesthetic.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Forms & Validation:** React Hook Form + Zod
- **Rich Text:** React Quill
- **API Source:** JSONPlaceholder

## Getting Started

First, make sure you have installed the required dependencies:

```bash
npm install
```

Then, run the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to interact with the live application.

## Directory Structure

- `/app` - Next.js App Router endpoints, pages, and base layout configurations.
- `/components` - Reusable modular UI elements (`Navbar`, `PostCard`, `AddPostForm`, etc.).
- `/lib` - Application utilities, API data fetchers, and Zod validation schemas.
- `/store` - Global state management utilizing Zustand.
- `/types` - Centralized TypeScript interfaces ensuring strict structural typing across the ecosystem.
