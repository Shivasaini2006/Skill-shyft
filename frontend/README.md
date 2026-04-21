# SKILL SHIFT Frontend

## Setup Instructions

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Environment Configuration
Create \`.env.local\`:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

### 3. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

- \`app/\` - Next.js app directory (pages & layouts)
- \`components/\` - Reusable React components
- \`lib/\` - Utilities (API client, stores)
- \`styles/\` - Global styles & Tailwind config

## Features

- **Dark Theme**: Black background with white/gray typography
- **Modern Design**: Bold block-style headings with sharp visual hierarchy
- **Responsive**: Mobile-first design
- **Authentication**: JWT-based auth with Zustand store
- **API Integration**: Axios client with interceptors
- **Tailwind CSS**: Utility-first styling with custom dark theme

## Pages

- \`/\` - Homepage with trending posts & events
- \`/login\` - User login
- \`/signup\` - User registration
- \`/forum\` - Community forum (coming soon)
- \`/resources\` - Learning resources (coming soon)
- \`/events\` - Events & challenges (coming soon)
- \`/profile\` - User profile (coming soon)
