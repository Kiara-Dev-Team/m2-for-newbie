# Technology Stack

This document defines the technology choices for **M2 for Newbies**, aligned with our vision of creating a browser-first, zero-installation experience for computational algebra.

## Core Philosophy

**"Make the tool invisible, so the mathematics can shine."**

Every technology choice prioritizes:
- **Zero friction** - No installation barriers
- **Simplicity** - Easy to use, easy to maintain
- **Accessibility** - Works on any device with a browser
- **Beauty** - Clean, modern interface that respects users

---

## Frontend Stack

### Web Interface
- **Framework**: React 18+ with TypeScript
  - **Why**: Industry standard, excellent ecosystem, TypeScript ensures code quality
  - **Alternative considered**: Vue.js (React has better Jupyter-like library support)
  
- **Notebook Interface**: JupyterLab Components / Monaco Editor
  - **Why**: Familiar interface for mathematicians, battle-tested
  - **Features**: Code cells, markdown cells, LaTeX rendering, output display
  
- **Math Rendering**: KaTeX
  - **Why**: Faster than MathJax, excellent LaTeX support, 0 dependencies
  - **Features**: Real-time mathematical notation rendering
  
- **Visualization**: Plotly.js / Three.js
  - **Why**: Interactive 3D plots for algebraic varieties, intuitive controls
  - **Use cases**: Polynomial curves, surfaces, resolution visualizations

- **UI Components**: Radix UI / Headless UI
  - **Why**: Accessible, unstyled components we can customize beautifully
  - **Alternative**: Tailwind CSS for styling
  
- **State Management**: Zustand or React Context
  - **Why**: Simple, no boilerplate, sufficient for our needs
  - **Avoid**: Redux (unnecessary complexity for MVP)

### Build Tools
- **Bundler**: Vite
  - **Why**: Lightning fast, excellent DX, perfect for React + TypeScript
  - **Alternative considered**: webpack (Vite is simpler and faster)
  
- **Package Manager**: npm or pnpm
  - **Why**: Standard, widely adopted, excellent CI/CD support

---

## Backend Stack

### Compute Engine
- **Core**: Macaulay2 (existing C++ implementation)
  - **Integration**: WebAssembly (WASM) or server-side execution
  - **Strategy**: Start with server-side, migrate critical paths to WASM

### API Layer
- **Framework**: FastAPI (Python) or Express.js (Node.js)
  - **Primary choice**: FastAPI
  - **Why**: 
    - Excellent async support for long computations
    - Native Python integration with M2's Python bindings
    - Auto-generated OpenAPI docs
    - Type safety with Pydantic
  - **Alternative**: Express.js if we need tighter Node.js integration

### Session Management
- **Technology**: Redis or in-memory cache
  - **Why**: Fast session state, computation caching, user notebooks
  - **Use cases**: Store computation history, intermediate results

### Execution Environment
- **Container**: Docker
  - **Why**: Consistent M2 environment, easy deployment, security isolation
  - **Image**: Alpine Linux + Macaulay2 compiled binaries

---

## Cloud Infrastructure

### Hosting (Zero-Installation Requirement)
- **Static Frontend**: Vercel, Netlify, or GitHub Pages
  - **Primary choice**: Vercel
  - **Why**: Zero config, global CDN, automatic HTTPS, excellent DX
  
- **Backend Compute**: 
  - **Option 1 (MVP)**: Railway, Render, or Fly.io
  - **Option 2 (Scale)**: Google Cloud Run or AWS Lambda
  - **Why**: Serverless/managed, auto-scaling, pay-per-use

### Database (Future)
- **Not required for MVP**
- **Future**: PostgreSQL for user accounts, saved notebooks, sharing

---

## Development Tools

### Code Quality
- **Linter**: ESLint (TypeScript), Ruff or Black (Python)
- **Formatter**: Prettier (TS/JS), Black (Python)
- **Type Checking**: TypeScript strict mode, mypy (Python)

### Testing
- **Frontend**: Vitest + React Testing Library
  - **Why**: Fast, similar to Jest, native ESM support
  
- **Backend**: pytest (Python) or Jest (Node.js)
  - **Why**: Industry standard, excellent async support

### CI/CD
- **Platform**: GitHub Actions
  - **Why**: Native GitHub integration, free for public repos
  - **Workflow**: Lint → Test → Build → Deploy
  - **Deploy triggers**: Push to main = production, PR = preview

---

## MVP Tech Stack Summary

**Start here, expand later:**

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend Framework | React + TypeScript | Industry standard, great ecosystem |
| Notebook UI | Monaco Editor + Custom cells | Code editor + Math rendering |
| Math Rendering | KaTeX | Fast, beautiful LaTeX |
| Backend API | FastAPI (Python) | Async, Python-M2 integration |
| M2 Integration | Server-side execution | Simplest for MVP |
| Hosting | Vercel (Frontend) + Render (Backend) | Zero config, fast deployment |
| Session State | In-memory (MVP) → Redis (later) | Simple start, scalable path |

---

## Migration Path

### Phase 1: MVP (Current)
- Static React frontend on Vercel
- FastAPI backend on Render
- M2 runs server-side in Docker
- In-memory session management
- No user accounts (sessions expire)

### Phase 2: Scale
- Add Redis for session persistence
- Add user accounts + database
- Implement notebook saving/sharing
- Add WebAssembly M2 for offline use

### Phase 3: Advanced
- Real-time collaboration (CRDT)
- Plugin system for extensions
- Advanced visualizations
- Mobile apps (React Native)

---

## Not Using (And Why)

| Technology | Why Not |
|-----------|---------|
| Emacs | Target: Modern browser interface, not 1976 editor |
| Google Groups | Discord/GitHub Discussions for community |
| Custom build system | Use standard tools (Vite, Docker) |
| Microservices | MVP doesn't need complexity |
| GraphQL | REST is sufficient for MVP |
| MongoDB | No database needed for MVP |

---

## Decision Criteria

When choosing new technologies, ask:

1. **Does it reduce friction?** (Zero-installation principle)
2. **Is it widely adopted?** (Easy to find help, contributors)
3. **Does it prioritize simplicity?** (Less is more)
4. **Can we iterate quickly?** (Fast feedback loops)
5. **Is it beautiful?** (User experience matters)

---

*Last updated: 2025-12-23*  
*Document owner: M2 for Newbies Team*
