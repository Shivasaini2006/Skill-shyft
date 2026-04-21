# SKILL SHIFT - Modern Tech Community Platform

## 🚀 Project Overview

SKILL SHIFT is a modern, scalable tech community platform built with a bold, futuristic design. It connects developers, designers, and innovators through discussions, resources, events, and challenges.

**Tagline:** *Shift Your Potential*

## 📁 Project Structure

```
Skill-shyft/
├── database/
│   └── schema.sql          # MySQL database schema
├── server/                 # Node.js/Express backend
│   ├── config/            # Database configuration
│   ├── controllers/        # Business logic
│   ├── middleware/         # Auth & validation
│   ├── routes/             # API endpoints
│   ├── server.js          # Entry point
│   └── package.json       # Backend dependencies
└── frontend/              # Next.js frontend
    ├── app/               # Next.js pages
    ├── components/        # React components
    ├── lib/               # Utilities & stores
    ├── styles/            # Global styles
    └── package.json       # Frontend dependencies
```

## 🎨 Design Philosophy

- **Dark Theme**: Black background (#0a0e27) with white/gray typography
- **Bold Typography**: Large block-style headings with strong visual hierarchy
- **Sharp Edges**: Minimal rounded corners, rectangular buttons
- **Accent Colors**: Neon blue (#00d9ff) for primary, purple (#7c3aed) for secondary
- **Glitch Effects**: Subtle hover animations and transitions
- **Modern Minimalism**: Clean interfaces with generous whitespace

## ⚙️ Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS with custom dark theme
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: React Icons

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Authentication**: JWT
- **Password Hashing**: bcryptjs

## 🗄️ Database Schema

### Core Tables
- **users** - User accounts and profiles
- **posts** - Forum discussions
- **comments** - Discussion replies
- **categories** - Post categories
- **likes** - Post interactions
- **followers** - User connections
- **resources** - Learning materials
- **events** - Hackathons and challenges
- **event_participants** - Event registrations
- **notifications** - User notifications

## 🚀 Getting Started

### Backend Setup

1. **Install Dependencies**
```bash
cd server
npm install
```

2. **Configure Database**
```bash
# Create .env file
cp .env.example .env

# Update .env with your MySQL credentials
```

3. **Initialize Database**
```bash
# Run schema.sql in your MySQL client
mysql -u root -p < ../database/schema.sql
```

4. **Start Server**
```bash
npm run dev  # Development
npm start    # Production
```

### Frontend Setup

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Configure Environment**
```bash
# Create .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
```

3. **Start Development**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📚 Core Features

### 1. **Homepage**
- Hero section with logo and CTA
- Trending discussions feed
- Featured members
- Community statistics

### 2. **Community Forum**
- Browse discussions by category
- Create, edit, delete posts
- Comment system with nested replies
- Like/upvote functionality
- Full-text search

### 3. **User System**
- JWT-based authentication
- User profiles with skills
- Follow/unfollow system
- Activity tracking
- User statistics

### 4. **Resources Section**
- Curated articles and tutorials
- Tag-based filtering
- Category organization
- Community-contributed content

### 5. **Events & Challenges**
- Hackathons and coding challenges
- Event registration
- Participant tracking
- Event management

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Token verification

### Posts
- `GET /api/posts` - Get all posts (paginated)
- `POST /api/posts` - Create post
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post
- `POST /api/posts/:postId/like` - Like post

### Comments
- `POST /api/posts/:postId/comments` - Create comment
- `GET /api/posts/:postId/comments` - Get comments
- `PUT /api/comments/:commentId` - Update comment
- `DELETE /api/comments/:commentId` - Delete comment

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile/update` - Update profile
- `POST /api/users/:userId/follow` - Follow user
- `POST /api/users/:userId/unfollow` - Unfollow user

### Resources
- `GET /api/resources` - List resources
- `POST /api/resources` - Create resource
- `PUT /api/resources/:id` - Update resource
- `DELETE /api/resources/:id` - Delete resource

### Events
- `GET /api/events` - List events
- `POST /api/events` - Create event
- `GET /api/events/:id` - Get event details
- `POST /api/events/:eventId/join` - Join event
- `POST /api/events/:eventId/leave` - Leave event

## 🎯 Pages & Routes

### Frontend Routes
- `/` - Homepage
- `/login` - Login page
- `/signup` - Registration page
- `/forum` - Community forum
- `/forum/create` - Create post (protected)
- `/resources` - Learning resources
- `/events` - Events & challenges
- `/profile` - User profile (protected)

## 🔐 Authentication Flow

1. User registers/logs in
2. Backend verifies credentials and returns JWT token
3. Token stored in localStorage
4. Token included in all subsequent API requests
5. Token verified on protected routes
6. Automatic logout on token expiration

## 🎨 Component Library

### Reusable Components
- **Navbar** - Navigation with auth state
- **Footer** - Site footer with links
- **Card** - Container with dark theme styling
- **PostCard** - Forum post display
- **ResourceCard** - Learning resource display
- **EventCard** - Event information display

## 📦 Dependencies

### Backend
```json
{
  "express": "^4.18.2",
  "mysql2": "^3.6.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "cors": "^2.8.5",
  "helmet": "^7.0.0",
  "express-validator": "^7.0.0"
}
```

### Frontend
```json
{
  "next": "^14.0.0",
  "react": "^18.2.0",
  "tailwindcss": "^3.3.0",
  "axios": "^1.4.0",
  "zustand": "^4.4.0",
  "react-icons": "^4.10.1"
}
```

## 🚀 Deployment

### Backend (Node.js Server)
```bash
# Build
npm run build

# Start
npm start
```

### Frontend (Vercel/Netlify)
```bash
# Build
npm run build

# Start
npm start
```

## 📖 Documentation

- [Backend README](./server/README.md)
- [Frontend README](./frontend/README.md)
- [Database Schema](./database/schema.sql)

## 🤝 Contributing

1. Create a feature branch
2. Commit changes
3. Push to branch
4. Create Pull Request

## 📄 License

MIT License

## 👥 Team

Built with ❤️ by the SKILL SHIFT team

---

**Ready to shift your potential?** Start building, learning, and connecting with the SKILL SHIFT community! 🚀
