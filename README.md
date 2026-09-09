# 📚 SJCEM Digital Library & Dashboard

A vibrant Neobrutalist digital library web application featuring student reading tracking, AI inquiry assistant, study groups, real-time attendance, and administrative controls.

---

## 🚀 Deployment to Vercel

This project is configured and ready for 1-click deployment on [Vercel](https://vercel.com).

### Option 1: Deploy via GitHub (Recommended)

1. **Push this folder to a GitHub repository**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - SJCEM Digital Library"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to **[vercel.com/new](https://vercel.com/new)**.
3. Import your GitHub repository.
4. Leave all build settings as default (Framework Preset: **Other**).
5. Click **Deploy**.

---

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI globally (if not installed):
   ```bash
   npm i -g vercel
   ```
2. In this project directory, run:
   ```bash
   vercel
   ```
3. Follow the CLI prompts to deploy directly.
4. For production release:
   ```bash
   vercel --prod
   ```

---

## ⚙️ Configuration Files Included

- **`vercel.json`**: Configures clean URLs, asset caching headers, and security headers.
- **`.vercelignore`**: Excludes local dev server scripts (`server.js`, `server.ps1`) and unnecessary files from production.
- **`package.json`**: Provides standard project metadata and an instant zero-error build script.
- **`.gitignore`**: Excludes `node_modules`, `.vercel`, and environment files from Git.
