# ⚡ Git & Docker Quick Reference Cheat Sheet

## Git Essential Commands
```bash
git checkout -b feature/new-page   # Create and switch to new branch
git add .                          # Stage all changes
git commit -m "feat: message"      # Commit changes
git push origin feature/new-page   # Push branch to remote
```

## Docker Essential Commands
```bash
docker build -t mern-api .        # Build Docker image
docker run -p 5000:5000 mern-api   # Run container mapping port 5000
docker compose up --build -d       # Launch multi-container stack detached
```
