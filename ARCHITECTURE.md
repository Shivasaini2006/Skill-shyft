# SKILL SHIFT - Project Architecture

## 📊 Complete Project Structure

```
Skill-shyft/
│
├── 📁 database/
│   └── schema.sql                 # MySQL database schema with all tables
│
├── 📁 server/                     # Express.js Backend (Port 5000)
│   ├── 📁 config/
│   │   └── database.js           # MySQL connection pool
│   │
│   ├── 📁 controllers/           # Business logic
│   │   ├── auth.controller.js    # Authentication (register, login)
│   │   ├── users.controller.js   # User profiles & relationships
│   │   ├── posts.controller.js   # Forum posts
│   │   ├── comments.controller.js # Comments & replies
│   │   ├── categories.controller.js # Categories
│   │   ├── resources.controller.js # Learning resources
│   │   └── events.controller.js  # Events & challenges
│   │
│   ├── 📁 middleware/
│   │   └── auth.js               # JWT authentication middleware
│   │
│   ├── 📁 routes/                # API endpoints
│   │   ├── auth.routes.js        # /api/auth/*
│   │   ├── users.routes.js       # /api/users/*
│   │   ├── posts.routes.js       # /api/posts/*
│   │   ├── comments.routes.js    # /api/comments/*
│   │   ├── categories.routes.js  # /api/categories/*
│   │   ├── resources.routes.js   # /api/resources/*
│   │   └── events.routes.js      # /api/events/*
│   │
│   ├── .env.example              # Environment template
│   ├── server.js                 # Express server entry point
│   ├── package.json              # Node dependencies
│   └── README.md                 # Backend documentation
│
├── 📁 frontend/                  # Next.js Frontend (Port 3000)
│   ├── 📁 app/                   # Next.js App Directory
│   │   ├── 📁 forum/
│   │   │   └── page.js          # Forum listing
│   │   ├── 📁 events/
│   │   │   └── page.js          # Events listing
│   │   ├── 📁 resources/
│   │   │   └── page.js          # Resources listing
│   │   ├── 📁 login/
│   │   │   └── page.js          # Login page
│   │   ├── 📁 signup/
│   │   │   └── page.js          # Registration page
│   │   ├── 📁 profile/
│   │   │   └── page.js          # User profile
│   │   ├── layout.js             # Root layout (Navbar/Footer)
│   │   └── page.js               # Homepage
│   │
│   ├── 📁 components/            # Reusable React Components
│   │   ├── Navbar.jsx            # Navigation bar
│   │   ├── Footer.jsx            # Footer
│   │   ├── Card.jsx              # Card container
│   │   ├── PostCard.jsx          # Forum post display
│   │   ├── ResourceCard.jsx      # Resource display
│   │   └── EventCard.jsx         # Event display
│   │
│   ├── 📁 lib/                   # Utilities & State Management
│   │   ├── apiClient.js          # Axios API client with interceptors
│   │   └── authStore.js          # Zustand auth store
│   │
│   ├── 📁 styles/
│   │   └── globals.css           # Global Tailwind styles & animations
│   │
│   ├── tailwind.config.js        # Tailwind CSS configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── next.config.js            # Next.js configuration
│   ├── .env.local                # Environment variables
│   ├── package.json              # Node dependencies
│   └── README.md                 # Frontend documentation
│
├── 📄 README.md                  # Main project documentation
├── 📄 QUICK_START.md             # Quick setup guide
├── 📄 DEVELOPMENT.md             # Development environment setup
├── 📄 ARCHITECTURE.md            # This file
└── 📄 .gitignore                 # Git ignore rules
```

## 🔄 Data Flow Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                             │
│  (React Components with Tailwind CSS)                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                    HTTP/REST
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS FRONTEND                             │
│  - Server-side rendering                                        │
│  - Zustand state management (auth)                              │
│  - Axios API client                                             │
│  - Responsive Tailwind UI                                       │
└────────────────────────┬────────────────────────────────────────┘
                         │
                   JWT Token + API
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  EXPRESS.JS BACKEND                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Routes (7 modules)                                       │   │
│  │ → Auth, Users, Posts, Comments, Categories, Resources   │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Controllers (Business Logic)                            │   │
│  │ → Validation, Processing, Response formatting          │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Middleware                                              │   │
│  │ → JWT Authentication, CORS, Error handling              │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────────┘
                         │
                    SQL Queries
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    MYSQL DATABASE                               │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Core Tables:                                            │   │
│  │ • Users (authentication & profiles)                    │   │
│  │ • Posts (forum discussions)                            │   │
│  │ • Comments (post replies)                              │   │
│  │ • Categories (post organization)                       │   │
│  │ • Likes (post interactions)                            │   │
│  │ • Followers (user connections)                         │   │
│  │ • Resources (learning materials)                       │   │
│  │ • Events (hackathons & challenges)                     │   │
│  │ • Notifications (user alerts)                          │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 🔐 Authentication Flow

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │ 1. Submit email/password
       ▼
┌─────────────────────────────────────────────────────┐
│  POST /api/auth/register OR /api/auth/login         │
│  - Validate input                                   │
│  - Hash password (bcryptjs)                         │
│  - Query database                                   │
└──────┬──────────────────────────────────────────────┘
       │ 2. Generate JWT token
       ▼
┌─────────────────────────────────────────────────────┐
│  JWT Token created (7 days expiry)                  │
└──────┬──────────────────────────────────────────────┘
       │ 3. Return token + user data
       ▼
┌─────────────────────────────────────────────────────┐
│  Frontend stores token in localStorage              │
│  Create Zustand auth store                          │
└──────┬──────────────────────────────────────────────┘
       │ 4. Include in all API requests
       │    Header: Authorization: Bearer <token>
       ▼
┌─────────────────────────────────────────────────────┐
│  Backend middleware validates token                 │
│  - Verify JWT signature                            │
│  - Check expiry                                    │
│  - Attach user to request                          │
└──────┬──────────────────────────────────────────────┘
       │ 5. Grant access to protected endpoints
       ▼
┌─────────────────────────────────────────────────────┐
│  Execute protected route handler                    │
└─────────────────────────────────────────────────────┘
```

## 🎨 Frontend Architecture (Component Hierarchy)

```
RootLayout
├── Navbar
│   ├── Logo
│   ├── Navigation Links
│   │   ├── Forum
│   │   ├── Resources
│   │   ├── Events
│   │   └── Community
│   └── Auth Section
│       ├── Search
│       ├── Notifications
│       └── Auth Buttons/User Menu
│
├── Pages (Route-specific)
│   ├── HomePage
│   │   ├── Hero Section
│   │   ├── Stats Grid
│   │   ├── PostCard[] (Trending)
│   │   ├── EventCard[] (Upcoming)
│   │   └── CTA Section
│   │
│   ├── ForumPage
│   │   ├── Sidebar (Categories)
│   │   └── PostCard[] (Paginated)
│   │
│   ├── EventsPage
│   │   ├── Sidebar (Event Type Filter)
│   │   └── EventCard[] (Paginated)
│   │
│   ├── ResourcesPage
│   │   ├── Sidebar (Categories)
│   │   └── ResourceCard[] (Grid)
│   │
│   ├── ProfilePage
│   │   ├── Profile Header
│   │   ├── Stats (posts, followers)
│   │   ├── Skills
│   │   └── Actions (Edit, Logout)
│   │
│   ├── LoginPage
│   │   └── Auth Form
│   │
│   └── SignupPage
│       └── Auth Form
│
└── Footer
    ├── Brand
    ├── Links
    ├── Social
    └── Copyright
```

## 🗄️ Database Schema Overview

```sql
Users ──┬──► Posts ──┬──► Comments
        │            │
        │            └──► Likes
        │
        └──► Followers
        │
        └──► Resources
        │
        └──► Events ──► EventParticipants
        │
        └──► Notifications

Categories ──┬──► Posts
             ├──► Resources
             └──► Events
```

## 🔌 API Request/Response Flow

### Example: Creating a Post

```javascript
// 1. Frontend (React)
const createPost = async (postData) => {
  const response = await apiClient.post('/posts', {
    title: 'My Post',
    content: 'Content here',
    categoryId: 1
  });
  // Axios interceptor adds: Authorization: Bearer <token>
  return response.data;
};

// 2. Backend (Express)
app.post('/posts', authenticateToken, postsController.createPost);

// 3. Auth Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// 4. Controller
const createPost = async (req, res) => {
  // Validate input
  // Insert into database
  // Return created post
};

// 5. Database Query
INSERT INTO posts (user_id, title, content, category_id) 
VALUES (?, ?, ?, ?);

// 6. Response sent back through stack to frontend
```

## 🚀 Deployment Architecture

```
┌─────────────────────────────────────────────────────────┐
│           PRODUCTION ENVIRONMENT                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Frontend: Vercel / Netlify                            │
│  └─ Optimized build with Next.js                       │
│  └─ CDN distribution                                   │
│  └─ Auto-scaling                                       │
│                                                         │
│  Backend: Heroku / AWS / DigitalOcean                  │
│  └─ Node.js server with PM2                            │
│  └─ Environment-specific .env                          │
│  └─ CORS configured for production domain              │
│                                                         │
│  Database: AWS RDS / Cloud SQL / DigitalOcean          │
│  └─ Managed MySQL instance                             │
│  └─ Automatic backups                                  │
│  └─ SSL encrypted connections                          │
│                                                         │
│  CDN: CloudFlare / AWS CloudFront                      │
│  └─ Static asset caching                               │
│  └─ DDoS protection                                    │
│  └─ SSL/TLS certificates                               │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 📈 Scalability Considerations

### Database Optimization
- Connection pooling (already implemented)
- Indexes on frequently queried columns
- Query optimization and caching
- Replication for read scaling

### Backend Optimization
- Load balancing (multiple server instances)
- Caching layer (Redis)
- API rate limiting
- Async job processing (Bull/Bee-Queue)

### Frontend Optimization
- Code splitting (automatic with Next.js)
- Image optimization
- Static site generation
- Edge caching

## 📝 API Documentation

Each endpoint returns structured responses:

```javascript
// Success Response
{
  "data": { /* ... */ },
  "message": "Success message"
}

// Error Response
{
  "error": "Error message",
  "status": 400
}

// Paginated Response
{
  "data": [ /* ... */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

## 🔄 Development Workflow

```
Local Development
├── Create Feature Branch
├── Make Changes
│   ├── Frontend changes in `frontend/`
│   ├── Backend changes in `server/`
│   └── Database changes in `database/`
├── Test Locally
├── Commit & Push
├── Create Pull Request
├── Code Review
└── Merge to Main
    └── Deploy to Production
```

## 🎯 Performance Metrics

### Target Metrics
- **Page Load Time**: < 3 seconds
- **API Response Time**: < 200ms
- **Database Query Time**: < 100ms
- **Image Load Time**: < 1 second
- **Core Web Vitals**: All green

### Monitoring
- Monitor API logs in console
- Track database performance
- Use browser DevTools for frontend performance
- Use logging service (Sentry) in production

---

**This architecture supports:**
- ✅ Thousands of concurrent users
- ✅ Real-time updates potential
- ✅ Mobile responsiveness
- ✅ Horizontal scaling
- ✅ Microservices migration
- ✅ Performance optimization

**Ready to build at scale! 🚀**
