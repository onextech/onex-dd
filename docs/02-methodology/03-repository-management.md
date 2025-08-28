# Repository Management

Effective repository management is the foundation of successful software development. This guide outlines our standards for Git workflows, branching strategies, and repository organization.

## Repository Structure

### Standard Directory Layout

```
project-root/
├── .github/              # GitHub specific files
│   ├── workflows/        # CI/CD workflows
│   ├── ISSUE_TEMPLATE/   # Issue templates
│   └── pull_request_template.md
├── docs/                 # Project documentation
├── src/                  # Source code
│   ├── components/       # Reusable components
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   └── types/           # TypeScript definitions
├── tests/               # Test files
├── public/              # Static assets
├── .env.example         # Environment variables template
├── README.md            # Project overview
├── package.json         # Dependencies and scripts
└── .gitignore          # Git ignore rules
```

### Essential Files

#### README.md Template
```markdown
# Project Name

Brief project description and purpose.

## Quick Start
- Prerequisites
- Installation steps
- Development server setup

## Architecture
- Tech stack overview
- Key design decisions

## Deployment
- Environment setup
- Deployment instructions

## Contributing
- Link to contributing guidelines
- Development workflow
```

#### .gitignore Best Practices
```gitignore
# Dependencies
node_modules/
.pnp
.pnp.js

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build outputs
build/
dist/
.next/

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
Thumbs.db
```

## Git Workflow

### Branching Strategy

We follow a **Git Flow** approach with the following branch types:

#### Main Branches
- **`main`**: Production-ready code
- **`develop`**: Integration branch for features

#### Supporting Branches
- **`feature/`**: New features (`feature/user-authentication`)
- **`hotfix/`**: Critical production fixes (`hotfix/security-patch`)
- **`release/`**: Release preparation (`release/v1.2.0`)

### Branch Naming Conventions

```bash
# Feature branches
feature/ticket-number-short-description
feature/AUTH-123-user-login

# Hotfix branches
hotfix/ticket-number-issue-description
hotfix/SEC-456-xss-vulnerability

# Release branches
release/version-number
release/v1.2.0
```

### Commit Message Standards

Follow the **Conventional Commits** specification:

```bash
# Format
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Commit Types
- **feat**: New features
- **fix**: Bug fixes
- **docs**: Documentation changes
- **style**: Code formatting (no functionality changes)
- **refactor**: Code restructuring without changing functionality
- **test**: Adding or updating tests
- **chore**: Maintenance tasks

#### Examples
```bash
feat(auth): add OAuth2 integration
fix(api): resolve database connection timeout
docs(readme): update installation instructions
refactor(components): extract common Button component
```

## Repository Setup Checklist

### Initial Setup
- [ ] Create repository with descriptive name
- [ ] Add comprehensive README.md
- [ ] Set up .gitignore file
- [ ] Configure branch protection rules
- [ ] Set up issue and PR templates
- [ ] Add license file (if open source)

### Security Configuration
- [ ] Enable branch protection for `main` and `develop`
- [ ] Require PR reviews before merging
- [ ] Require status checks to pass
- [ ] Enable automatic security updates
- [ ] Configure secrets scanning
- [ ] Set up dependency vulnerability alerts

### Access Control
- [ ] Configure team permissions
- [ ] Set up required reviewers
- [ ] Limit who can merge to protected branches
- [ ] Configure admin access appropriately

## Git Best Practices

### Daily Workflow

1. **Start with Latest Code**
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/TICKET-123-new-feature
   ```

3. **Make Focused Commits**
   ```bash
   git add .
   git commit -m "feat(component): add user profile component"
   ```

4. **Keep Branch Updated**
   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/TICKET-123-new-feature
   git merge develop
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/TICKET-123-new-feature
   ```

### Commit Guidelines

#### Do's
- Write clear, descriptive commit messages
- Make atomic commits (one logical change per commit)
- Test before committing
- Use present tense ("add feature" not "added feature")

#### Don'ts
- Commit large, unrelated changes together
- Use vague messages like "fix stuff" or "update"
- Commit commented-out code
- Include sensitive information in commits

### Merge Strategies

#### When to Use Each Strategy

**Merge Commits** (Default)
- Preserves commit history
- Shows when features were integrated
- Best for feature branches

**Squash and Merge**
- Creates clean linear history
- Useful for cleaning up messy feature branches
- Good for small features with many commits

**Rebase and Merge**
- Creates linear history without merge commits
- Requires clean, well-structured commits
- Advanced users only

## Repository Maintenance

### Regular Tasks

#### Weekly
- [ ] Review and merge approved PRs
- [ ] Update dependencies with security patches
- [ ] Clean up merged branches
- [ ] Review repository insights and activity

#### Monthly
- [ ] Audit repository access and permissions
- [ ] Review and update documentation
- [ ] Analyze repository metrics and performance
- [ ] Update project dependencies

#### Quarterly
- [ ] Review branching strategy effectiveness
- [ ] Evaluate repository structure
- [ ] Update development tooling and processes
- [ ] Archive or reorganize old repositories

### Branch Cleanup

```bash
# List merged branches
git branch --merged develop

# Delete merged feature branches
git branch -d feature/completed-feature

# Delete remote tracking branches
git remote prune origin

# Delete branches on remote
git push origin --delete feature/old-branch
```

## Troubleshooting Common Issues

### Resolving Merge Conflicts

1. **Identify Conflicts**
   ```bash
   git merge develop
   # Auto-merging file.js
   # CONFLICT (content): Merge conflict in file.js
   ```

2. **Review Conflict Markers**
   ```javascript
   <<<<<<< HEAD
   // Your changes
   const value = 'feature-value';
   =======
   // Changes from develop
   const value = 'develop-value';
   >>>>>>> develop
   ```

3. **Resolve and Commit**
   ```bash
   # Edit files to resolve conflicts
   git add resolved-file.js
   git commit -m "resolve merge conflict in file.js"
   ```

### Recovering from Common Mistakes

#### Accidentally Committed to Wrong Branch
```bash
# Move last commit to correct branch
git log --oneline -n 1  # Get commit hash
git reset --hard HEAD~1  # Remove from current branch
git checkout correct-branch
git cherry-pick <commit-hash>
```

#### Need to Undo Last Commit
```bash
# Keep changes in working directory
git reset --soft HEAD~1

# Discard changes completely
git reset --hard HEAD~1
```

---

:::warning Important Notes
- Always pull latest changes before starting new work
- Never force push to shared branches
- Coordinate with team before major repository changes
:::

:::tip Pro Tips
- Use `git log --oneline --graph` to visualize branch history
- Set up Git aliases for common commands
- Use `git blame` to understand code context and history
:::