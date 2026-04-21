# SKILL SHIFT Backend

## Setup Instructions

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Database Setup
- Create MySQL database and run schema.sql
- Update .env with your database credentials

### 3. Environment Configuration
\`\`\`bash
cp .env.example .env
\`\`\`

### 4. Start Server
\`\`\`bash
npm run dev  # Development with nodemon
npm start    # Production
\`\`\`

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/verify

### Users
- GET /api/users/:id
- PUT /api/users/profile/update
- POST /api/users/:userId/follow
- POST /api/users/:userId/unfollow
- GET /api/users/trending/users

### Posts
- GET /api/posts
- POST /api/posts
- GET /api/posts/:id
- PUT /api/posts/:id
- DELETE /api/posts/:id
- POST /api/posts/:postId/like
- DELETE /api/posts/:postId/like

### Comments
- GET /api/posts/:postId/comments
- POST /api/posts/:postId/comments
- PUT /api/comments/:commentId
- DELETE /api/comments/:commentId

### Categories
- GET /api/categories
- GET /api/categories/:id

### Resources
- GET /api/resources
- POST /api/resources
- PUT /api/resources/:id
- DELETE /api/resources/:id

### Events
- GET /api/events
- POST /api/events
- GET /api/events/:id
- POST /api/events/:eventId/join
- POST /api/events/:eventId/leave
