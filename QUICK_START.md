# SKILL SHIFT - Quick Start Guide

## 📋 Prerequisites

- Node.js 16+ installed
- MySQL 8.0+ installed and running
- Git installed

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    SKILL SHIFT Platform                 │
└─────────────────────────────────────────────────────────┘
         │                           │
    ┌────▼────┐               ┌─────▼──────┐
    │Frontend  │               │   Backend  │
    │Next.js   │◄─────────────►│ Express.js │
    │Port 3000 │   REST API    │ Port 5000  │
    └──────────┘               └─────┬──────┘
                                     │
                              ┌──────▼──────┐
                              │   MySQL     │
                              │ Port 3306   │
                              └─────────────┘
```

## 🚀 Step-by-Step Setup

### Step 1: Clone & Navigate
```bash
cd Skill-shyft
git init
```

### Step 2: Database Setup

1. **Start MySQL Server**
```bash
# Windows
net start MySQL80  # or your version

# macOS
brew services start mysql

# Linux
sudo systemctl start mysql
```

2. **Create Database**
```bash
mysql -u root -p < database/schema.sql
```

3. **Verify Tables**
```bash
mysql -u root -p
USE skill_shift;
SHOW TABLES;
```

### Step 3: Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MySQL credentials
# Update these values:
# DB_PASSWORD=your_mysql_password
# JWT_SECRET=your_secret_key

# Start development server
npm run dev
```

**Backend running at:** `http://localhost:5000`

### Step 4: Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env.local (auto-configured)
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Start development server
npm run dev
```

**Frontend running at:** `http://localhost:3000`

## ✅ Verification

1. **API Health Check**
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{ "status": "API is running", "timestamp": "..." }
```

2. **Visit Frontend**
- Open http://localhost:3000
- You should see the SKILL SHIFT homepage

## 📝 First Steps in the App

1. **Sign Up**
   - Click "Join SKILL SHIFT"
   - Create an account with email and password
   - You'll be automatically logged in

2. **Create a Forum Post**
   - Navigate to "Forum"
   - Click "New Post"
   - Choose a category
   - Write your post

3. **Explore Events**
   - Visit "Events" page
   - View upcoming hackathons and challenges
   - Join an event

4. **Check Resources**
   - Browse learning materials
   - Filter by category

## 🛠️ Common Issues & Solutions

### "Connection refused" on localhost:5000
- Ensure backend is running: `npm run dev` in server directory
- Check if port 5000 is available

### "Cannot GET /api/posts"
- Verify routes are correctly imported in server.js
- Check database connection in .env

### "Database connection error"
- Verify MySQL is running
- Check credentials in .env match your MySQL setup
- Ensure skill_shift database exists

### "CORS error" in frontend
- Ensure CORS_ORIGIN in backend .env matches frontend URL
- Default: http://localhost:3000

### Port already in use
```bash
# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9
```

## 📁 Important Files Reference

| Path | Purpose |
|------|---------|
| `database/schema.sql` | Database structure |
| `server/server.js` | Backend entry point |
| `server/.env` | Backend configuration |
| `frontend/app/layout.js` | Frontend layout |
| `frontend/.env.local` | Frontend configuration |

## 🔑 Default Test Credentials

After first signup:
- Email: your_email@example.com
- Password: your_secure_password

## 📚 Project Documentation

- **Backend Docs**: [server/README.md](server/README.md)
- **Frontend Docs**: [frontend/README.md](frontend/README.md)
- **Database Schema**: [database/schema.sql](database/schema.sql)
- **Main README**: [README.md](README.md)

## 🚀 Next Steps

1. **Customize Design**
   - Edit `frontend/styles/globals.css` for colors
   - Update Tailwind config: `frontend/tailwind.config.js`

2. **Add Features**
   - Create new API endpoints in `server/routes/`
   - Add new pages in `frontend/app/`

3. **Deploy**
   - Backend: Use platforms like Heroku, Railway, or AWS
   - Frontend: Deploy to Vercel or Netlify

## 💡 Tips

- Use `git add .` and `git commit -m "message"` to track changes
- Check console for errors with `F12` in browser
- Use Postman to test API endpoints
- Monitor database with MySQL Workbench

## 🤝 Support

For issues or questions, check:
1. Console errors (F12)
2. Backend logs (terminal)
3. Database connection (MySQL Workbench)
4. Environment variables (.env files)

---

**Happy building! Shift Your Potential! 🚀**
