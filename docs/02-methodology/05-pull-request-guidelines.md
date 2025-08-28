# Pull Request Guidelines

Pull requests are the cornerstone of collaborative development. This guide establishes standards for creating, reviewing, and merging pull requests that maintain code quality and facilitate knowledge sharing.

## Pull Request Lifecycle

### 1. Pre-PR Checklist

Before creating a pull request:

- [ ] **Code is complete and tested**
  - All functionality works as expected
  - Unit tests written and passing
  - Integration tests updated if needed

- [ ] **Code quality standards met**
  - Linting passes without errors
  - Code follows established style guide
  - No debugging code or TODO comments

- [ ] **Documentation updated**
  - README updated if needed
  - API documentation reflects changes
  - Inline code comments added for complex logic

- [ ] **Branch is up to date**
  - Latest changes from target branch merged
  - No merge conflicts present

### 2. PR Creation Standards

#### Title Format
Use clear, descriptive titles that follow conventional commit format:

```
<type>(<scope>): <description>

Examples:
feat(auth): add OAuth2 social login
fix(api): resolve timeout issues in user endpoint
docs(readme): update deployment instructions
```

#### Description Template

```markdown
## Summary
Brief description of what this PR accomplishes.

## Changes Made
- [ ] Feature/fix 1
- [ ] Feature/fix 2
- [ ] Documentation updates

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests passing
- [ ] Manual testing completed

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Breaking Changes
[List any breaking changes or "None"]

## Related Issues
Fixes #123
Related to #456

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

### 3. Review Process

#### Reviewer Responsibilities

**Initial Review (Within 24 hours)**
- [ ] Verify PR follows guidelines
- [ ] Check for obvious issues
- [ ] Assign additional reviewers if needed

**Code Review Checklist**
- [ ] **Functionality**
  - Code does what it's supposed to do
  - Edge cases are handled
  - Error handling is appropriate

- [ ] **Code Quality**
  - Code is readable and maintainable
  - Functions are focused and single-purpose
  - Variable and function names are descriptive

- [ ] **Performance**
  - No obvious performance issues
  - Database queries are optimized
  - Memory usage is reasonable

- [ ] **Security**
  - No security vulnerabilities introduced
  - Input validation is present
  - Sensitive data is handled properly

- [ ] **Testing**
  - Adequate test coverage
  - Tests are meaningful and well-written
  - All tests are passing

#### Review Guidelines

**Providing Feedback**

Use constructive, specific feedback:

```markdown
# Good Examples
"Consider extracting this logic into a separate function for better readability"
"This API endpoint needs input validation for the email parameter"
"Add error handling for the case where user is not found"

# Avoid
"This is wrong"
"Bad code"
"Why did you do this?"
```

**Review Categories**

Use labels to categorize feedback:
- **💡 Suggestion**: Optional improvements
- **🐛 Issue**: Problems that should be addressed
- **❓ Question**: Need clarification
- **🎉 Praise**: Acknowledge good work

## PR Templates

### Feature PR Template

```markdown
## Feature Description
[Describe the feature and its purpose]

## Implementation Details
[Technical details of the implementation]

### Changes Made
- [ ] Core functionality
- [ ] Tests
- [ ] Documentation
- [ ] Database migrations (if any)

### Testing Strategy
- [ ] Unit tests
- [ ] Integration tests
- [ ] End-to-end tests
- [ ] Manual testing scenarios

### Performance Considerations
[Any performance implications or improvements]

### Security Considerations
[Security review and implications]

## Deployment Notes
[Any special deployment requirements]

## Post-Deployment Tasks
- [ ] Monitor application performance
- [ ] Verify feature flags (if applicable)
- [ ] Update user documentation
```

### Bug Fix PR Template

```markdown
## Bug Description
[Describe the bug that was fixed]

## Root Cause Analysis
[What caused the bug?]

## Solution
[How was the bug fixed?]

### Changes Made
- [ ] Bug fix implementation
- [ ] Tests to prevent regression
- [ ] Documentation updates

### Testing
- [ ] Verified fix resolves the issue
- [ ] Regression tests added
- [ ] No new issues introduced

## Risk Assessment
- **Risk Level**: [Low/Medium/High]
- **Areas Affected**: [List components/features affected]
- **Rollback Plan**: [How to rollback if issues arise]

## Related Issues
Fixes #[issue-number]
```

### Hotfix PR Template

```markdown
## 🚨 HOTFIX: [Brief Description]

### Severity
- **Impact**: [Critical/High/Medium]
- **Users Affected**: [Number or percentage]
- **Business Impact**: [Description]

### Issue
[Describe the critical issue]

### Solution
[Quick description of the fix]

### Testing
- [ ] Issue reproduction confirmed
- [ ] Fix verified in staging
- [ ] Minimal regression testing completed

### Deployment Plan
- **Target Environment**: Production
- **Deployment Window**: [ASAP/Specific time]
- **Rollback Plan**: [Immediate rollback strategy]

### Post-Deployment
- [ ] Monitor application stability
- [ ] Verify issue resolution
- [ ] Create follow-up tasks for comprehensive fix
```

## Review Approval Process

### Single Approval (Small Changes)
- Documentation updates
- Configuration changes
- Minor bug fixes (< 50 lines changed)

### Two Approvals Required
- New features
- Significant refactoring
- Database schema changes
- Security-related changes

### Architecture Review Required
- Major system changes
- New dependencies or frameworks
- Performance-critical changes
- Breaking API changes

## Merge Strategies

### When to Use Each Strategy

**Squash and Merge** (Recommended)
- Feature branches with multiple commits
- Cleanup commit history
- Single logical change

**Merge Commit**
- Preserve detailed commit history
- Long-running feature branches
- Release branches

**Rebase and Merge** 
- Clean, linear commits on feature branch
- No merge conflicts
- Experienced team members only

## Automated Checks

### Required Status Checks
- [ ] **Continuous Integration**
  - All tests passing
  - Build successful
  - Linting checks pass

- [ ] **Code Quality**
  - Code coverage meets threshold (80%+)
  - Security scan passes
  - Dependency vulnerability check

- [ ] **Performance**
  - Bundle size within limits
  - Performance regression checks
  - Lighthouse scores (for frontend)

### Optional Checks
- [ ] Design system compliance
- [ ] Accessibility standards
- [ ] Browser compatibility

## Common PR Patterns

### Large Feature Development

For substantial features:

1. **Create Epic Issue**
   - Break down into smaller tasks
   - Define acceptance criteria
   - Identify dependencies

2. **Progressive PRs**
   ```
   feat(auth): add user model and database schema
   feat(auth): implement authentication service
   feat(auth): add login/logout endpoints
   feat(auth): create frontend login components
   ```

3. **Feature Flag Integration**
   - Deploy incrementally
   - Enable for testing
   - Gradual rollout

### Refactoring PRs

Structure refactoring changes:

1. **Preparation PR**: Add tests for existing behavior
2. **Refactoring PR**: Make the changes
3. **Cleanup PR**: Remove deprecated code

## Troubleshooting

### Common Issues

**PR Conflicts with Target Branch**
```bash
# Update your branch
git checkout your-branch
git fetch origin
git merge origin/develop
# Resolve conflicts and push
```

**CI Failures**
1. Check build logs for specific errors
2. Run tests locally to reproduce
3. Fix issues and push updates

**Review Feedback Resolution**
1. Address each comment individually
2. Mark resolved comments as resolved
3. Request re-review when ready

### PR Best Practices

#### Size Guidelines
- **Small PR**: < 200 lines changed (preferred)
- **Medium PR**: 200-500 lines changed
- **Large PR**: > 500 lines (requires justification)

#### Timing
- Create PR when feature is complete
- Request reviews during business hours
- Allow 24-48 hours for review
- Follow up if no response after 3 days

#### Communication
- Use PR comments for technical discussion
- Move complex discussions to meetings
- Document decisions in PR description
- Tag relevant team members

---

:::tip Quick Reference
**Perfect PR Checklist:**
- [ ] Clear, descriptive title
- [ ] Comprehensive description
- [ ] All tests passing
- [ ] Code reviewed by self first
- [ ] Documentation updated
- [ ] No merge conflicts
:::

:::warning Critical Rules
- Never merge your own PR without review
- Don't merge if any required checks fail
- Address all review feedback before merging
- Keep PRs focused on single logical change
:::