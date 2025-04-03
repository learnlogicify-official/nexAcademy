# Coding Practice Platform

A full-stack coding practice and assessment platform similar to LeetCode. Built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL.

## Features

- User authentication (email/password and Google OAuth)
- Browse and search coding problems
- Code editor with multiple language support
- Code execution engine
- User dashboard with progress tracking
- Admin dashboard for problem management
- Mobile responsive design

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Code Editor**: Monaco Editor
- **State Management**: Zustand

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Google OAuth credentials (for Google Sign-in)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/coding-platform.git
   cd coding-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables with your values:
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `NEXTAUTH_SECRET`: Generate a random string
     - `NEXTAUTH_URL`: Your application URL
     - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: From Google Cloud Console

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/src
  /app
    /api          # API routes
    /auth         # Authentication pages
    /components   # Reusable components
    /problems     # Problem pages
    /dashboard    # User dashboard
    /admin        # Admin dashboard
  /lib           # Utility functions and configurations
  /prisma        # Database schema and migrations
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. # nexAcademy
