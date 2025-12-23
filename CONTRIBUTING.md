# Contributing to M2 for Newbies

Thank you for your interest in contributing to M2 for Newbies! We're building a delightful, accessible computational algebra system, and we'd love your help.

## 🚀 Quick Start

### Current Status

**Important:** This project is currently in the planning and early development phase. We have excellent documentation but minimal code implementation. **We urgently need contributors to help build the actual system.**

### What We Need Most

1. **Frontend developers** - Build the notebook interface (React + TypeScript)
2. **Backend developers** - Create the API and M2 integration (Python + FastAPI)
3. **DevOps engineers** - Set up Docker, CI/CD, deployment
4. **UX designers** - Refine the interface and user experience
5. **Technical writers** - Improve documentation and tutorials
6. **Mathematicians** - Test the system and provide feedback

## 📋 How to Contribute

### 1. Set Up Development Environment

**Prerequisites:**
- Node.js 18+ (for frontend)
- Python 3.10+ (for backend)
- Docker (for M2 execution)
- Git

**Current Setup (will be improved):**

```bash
# Clone the repository
git clone https://github.com/Kiara-Dev-Team/m2-for-newbie.git
cd m2-for-newbie

# Note: Development infrastructure is being set up
# Check ACTION_ITEMS.md for current status
```

### 2. Understand the Vision

Before contributing, please read:

1. **[README.md](README.md)** - Project vision and goals
2. **[DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md)** - Design philosophy
3. **[MVP.md](MVP.md)** - What we're building first
4. **[ANALYSIS.md](ANALYSIS.md)** - Current state and improvement areas

**Key Principle:** 
> "Make the tool invisible, so the mathematics can shine."

Every contribution should make M2 more accessible, not more complex.

### 3. Pick a Task

**For First-Time Contributors:**

Start with these beginner-friendly tasks:
- [ ] Set up basic React frontend structure
- [ ] Create initial FastAPI backend
- [ ] Write Dockerfile for M2 container
- [ ] Add GitHub Actions CI configuration
- [ ] Fix HTML/CSS issues in landing page
- [ ] Improve documentation clarity

**For Experienced Contributors:**

- [ ] Implement code execution backend
- [ ] Build notebook cell component
- [ ] Add LaTeX rendering with KaTeX
- [ ] Create Docker-based M2 execution environment
- [ ] Set up deployment pipeline
- [ ] Implement session management

**Check [ACTION_ITEMS.md](ACTION_ITEMS.md) for current priorities.**

### 4. Development Guidelines

#### Code Style

**Frontend (TypeScript/React):**
```typescript
// Use functional components with hooks
const NotebookCell = ({ code, onExecute }) => {
  const [output, setOutput] = useState('');
  
  return (
    <div className="notebook-cell">
      {/* Component code */}
    </div>
  );
};

// Use clear, descriptive names
// Add comments for complex logic
// Keep components small and focused
```

**Backend (Python):**
```python
# Follow PEP 8 style guide
# Use type hints
def execute_code(code: str, session_id: str) -> ExecutionResult:
    """Execute M2 code in a sandboxed environment.
    
    Args:
        code: M2 code to execute
        session_id: User session identifier
        
    Returns:
        ExecutionResult with output or error
    """
    # Implementation
```

#### Principles to Follow

1. **Simplicity First**
   - Simple solution > clever solution
   - Delete code when possible
   - Avoid premature optimization

2. **User Focus**
   - Every feature should make users' lives easier
   - Test with real mathematicians
   - Beautiful errors, not cryptic messages

3. **Small PRs**
   - One feature per PR
   - Easy to review and merge
   - Can be shipped independently

4. **Documentation**
   - Update docs when changing functionality
   - Add comments for non-obvious code
   - Include examples in API docs

5. **Testing**
   - Write tests for new features
   - Ensure tests pass before submitting
   - Include both happy path and error cases

### 5. Submit a Pull Request

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, tested code
   - Follow style guidelines
   - Update documentation

4. **Commit with clear messages**
   ```bash
   git commit -m "Add LaTeX rendering to output cells"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Describe what you changed and why
   - Reference any related issues
   - Include screenshots for UI changes
   - Mention if this needs user testing

### 6. Code Review Process

- Maintainers will review within 2-3 days
- Address feedback and update PR
- Once approved, we'll merge your changes
- Celebrate! 🎉

## 🐛 Reporting Bugs

### Before Reporting

1. Check if the bug is already reported
2. Verify it's reproducible
3. Gather relevant information

### Bug Report Template

```markdown
**Description:**
Clear description of the bug

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- Browser: Chrome 120
- OS: macOS 14.0
- Version: [commit SHA or version]

**Screenshots:**
If applicable
```

## 💡 Suggesting Features

We love feature ideas! But please check:

1. **Read [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md)** - Does it align?
2. **Check [MVP.md](MVP.md)** - Is it in scope?
3. **Search existing issues** - Already suggested?

### Feature Request Template

```markdown
**Problem:**
What problem does this solve?

**Proposed Solution:**
How would this feature work?

**User Benefit:**
How does this help mathematicians?

**Alternatives Considered:**
What other solutions did you think about?

**Alignment with Principles:**
Which design principles does this support?
```

## 🤝 Community Guidelines

### Be Kind and Respectful

- Welcome newcomers warmly
- Assume good intentions
- Provide constructive feedback
- Help others learn and grow

### Communication Channels

- **GitHub Issues:** Bug reports, feature requests
- **Pull Requests:** Code contributions
- **Discussions:** Design questions, ideas
- **Discord (planned):** Real-time chat and support

### Code of Conduct

We follow the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

**In short:**
- Be welcoming and inclusive
- Be respectful of differing viewpoints
- Accept constructive criticism gracefully
- Focus on what's best for the community

## 📚 Resources

### Documentation

- [README.md](README.md) - Project overview
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design
- [TECH_STACK.md](TECH_STACK.md) - Technology choices
- [ROADMAP.md](ROADMAP.md) - Implementation timeline
- [ANALYSIS.md](ANALYSIS.md) - Current state assessment

### Learning Resources

**React + TypeScript:**
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

**FastAPI:**
- [FastAPI Tutorial](https://fastapi.tiangolo.com/tutorial/)

**Docker:**
- [Docker Get Started](https://docs.docker.com/get-started/)

**Macaulay2:**
- [Official Documentation](http://www2.macaulay2.com/Macaulay2/doc/)

## 🎯 Priorities

### Urgent (This Month)

1. Set up development infrastructure
2. Build minimal working prototype
3. Deploy to production
4. Get first user feedback

### High Priority (Next 2 Months)

1. Core MVP features (see [MVP.md](MVP.md))
2. LaTeX rendering
3. Error message system
4. User testing with 5-10 mathematicians

### Medium Priority (Months 3-4)

1. Advanced features
2. Visualization engine
3. Community building
4. Documentation completion

See [ACTION_ITEMS.md](ACTION_ITEMS.md) for detailed task list.

## ❓ Questions?

**Getting Started:**
- Read the documentation
- Check existing issues
- Ask in GitHub Discussions

**Technical Questions:**
- Review [ARCHITECTURE.md](ARCHITECTURE.md)
- Check [TECH_STACK.md](TECH_STACK.md)
- Ask maintainers in PR comments

**Design Questions:**
- Review [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md)
- Open a discussion
- Reference specific principles in your question

## 🙏 Thank You

Every contribution matters, whether it's:
- A single line of code
- A bug report
- Documentation improvement
- User testing feedback
- Spreading the word

You're helping make computational algebra accessible to everyone. That's incredible.

**Let's build something beautiful together.**

---

## License

By contributing to M2 for Newbies, you agree that your contributions will be licensed under the [GNU Affero General Public License v3.0 (AGPL-3.0)](LICENSE).

---

*"Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs*
