# SKILL SHIFT - Development Environment Setup

## 🖥️ Recommended Development Setup

### System Requirements
- **OS**: Windows 10+, macOS 10.15+, or Ubuntu 20.04+
- **RAM**: 8GB minimum
- **Storage**: 5GB free space
- **Browser**: Chrome, Firefox, Safari (latest versions)

### Required Software

#### 1. Node.js & npm
- Download: https://nodejs.org/ (LTS version)
- Verify installation:
```bash
node --version
npm --version
```

#### 2. MySQL
- Download: https://www.mysql.com/downloads/mysql/
- Version: 8.0 or later
- Verify installation:
```bash
mysql --version
```

#### 3. Git
- Download: https://git-scm.com/
- Verify installation:
```bash
git --version
```

#### 4. Code Editor (Recommended: VS Code)
- Download: https://code.visualstudio.com/
- Recommended Extensions:
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - Tailwind CSS IntelliSense
  - Thunder Client (for API testing)
  - MySQL

## 📦 Installation Steps

### Backend Setup

1. **Navigate to server directory**
```bash
cd server
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
```

4. **Edit .env file**
```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=skill_shift
DB_PORT=3306

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d

# CORS
CORS_ORIGIN=http://localhost:3000
```

5. **Start development server**
```bash
npm run dev
```

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env.local**
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
```

4. **Start development server**
```bash
npm run dev
```

## 🗄️ MySQL Database Setup

### Method 1: Command Line

```bash
# Connect to MySQL
mysql -u root -p

# Create database (optional, schema.sql creates it)
CREATE DATABASE skill_shift;

# Execute schema
USE skill_shift;
source ../database/schema.sql;

# Verify setup
SHOW TABLES;
```

### Method 2: MySQL Workbench

1. Open MySQL Workbench
2. Create new connection to localhost:3306
3. Open `database/schema.sql`
4. Execute query (Cmd+Enter or Ctrl+Enter)

### Method 3: Command Line (Direct)

```bash
mysql -u root -p skill_shift < database/schema.sql
```

## ✨ VS Code Extensions Setup

### Recommended Extensions

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "rangav.vscode-thunder-client",
    "cweijan.vscode-mysql-client2",
    "dsznajder.es7-react-js-snippets",
    "mhutchie.git-graph"
  ]
}
```

### Installation Command
1. Open Extensions (Ctrl+Shift+X)
2. Search and install each extension
3. Or copy extension IDs and run:
```bash
code --install-extension dbaeumer.vscode-eslint
# ... repeat for other extensions
```

## 🚀 Development Workflow

### Daily Startup

```bash
# Terminal 1: MySQL (if not auto-start)
# Verify: mysql -u root -p

# Terminal 2: Backend
cd server
npm run dev

# Terminal 3: Frontend
cd frontend
npm run dev

# Browser: Open http://localhost:3000
```

### Code Quality

#### Formatting (Prettier)
```bash
# Format all files
prettier --write .

# Or use VS Code: Format Document (Shift+Alt+F)
```

#### Linting
```bash
cd server
npm run lint  # When configured

# Frontend (built into Next.js)
npm run lint
```

## 🐛 Debugging

### Backend Debugging

1. **VS Code Debugger**
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Server",
      "program": "${workspaceFolder}/server/server.js",
      "restart": true,
      "runtimeArgs": [],
      "console": "integratedTerminal"
    }
  ]
}
```

2. **Console Logging**
```javascript
console.log('Variable:', variable);
console.error('Error:', error);
```

### Frontend Debugging

1. **Chrome DevTools** (F12)
   - Elements tab: Inspect components
   - Console: Check errors
   - Network: Monitor API calls

2. **React Developer Tools Extension**
   - Install from Chrome Web Store
   - Inspect component props/state

### API Testing

Use Thunder Client (VS Code extension):
1. Create collection
2. Add requests
3. Test endpoints
4. Save responses

## 📊 Performance Tips

### Backend
- Use connection pooling (already configured)
- Add pagination to list endpoints
- Cache frequently accessed data
- Use indexes on database queries

### Frontend
- Use Next.js Image component for images
- Code splitting (automatic with Next.js)
- Lazy load components
- Minimize bundle size

## 🔒 Security Best Practices

### Never Commit
- `.env` files with secrets
- API keys
- Database passwords
- JWT secrets

### Use Environment Variables
- Always use `.env` for secrets
- Different values for dev/prod
- Add to `.gitignore`

### API Security
- Validate all inputs
- Use HTTPS in production
- Implement rate limiting
- Sanitize database queries

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: describe your change"

# Push to remote
git push origin feature/your-feature

# Create Pull Request (on GitHub)
```

## 🚀 Build & Deploy

### Frontend Build
```bash
cd frontend
npm run build  # Creates optimized production build
npm start      # Start production server
```

### Backend Build
```bash
cd server
npm run build  # If configured
npm start      # Start production server
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Documentation](https://react.dev/)

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Find and kill process
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :3000
kill -9 <PID>
```

### npm Dependency Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### MySQL Connection Issues
```bash
# Verify MySQL service
# Windows: Services app → MySQL80
# macOS: brew services list
# Linux: sudo systemctl status mysql

# Check credentials in .env
# Verify database exists: mysql -u root -p skill_shift
```

---

**You're all set! Happy coding! 🎉**
