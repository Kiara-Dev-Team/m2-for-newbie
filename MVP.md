# Minimum Viable Product (MVP)

This document defines the **absolute minimum features** needed for the first public release of M2 for Newbies. Every feature must earn its place in the MVP.

## Core Philosophy

**"Ship something simple that works. Add power gradually."**

The MVP exists to validate our hypothesis: *A browser-based, zero-installation M2 interface can democratize access to computational algebra.*

---

## MVP Success Criteria

A successful MVP means a mathematician can:

1. ✅ **Open a browser** → Go to our URL
2. ✅ **See a notebook** → Familiar Jupyter-style interface
3. ✅ **Write M2 code** → Type `R = QQ[x,y,z]`
4. ✅ **Execute immediately** → Press Shift+Enter
5. ✅ **See beautiful results** → LaTeX-rendered output
6. ✅ **Learn by doing** → Clear error messages if something goes wrong
7. ✅ **Share their work** → Copy URL to share session (future: save notebooks)

**That's it.** Everything else is Phase 2+.

---

## MVP Feature Set

### 1. Core Features (Must Have)

#### 1.1 Notebook Interface
**User Story:** *As a mathematician, I want to write and execute M2 code in a familiar notebook interface.*

**Features:**
- [ ] Code cells with syntax highlighting
- [ ] Execute cells with Shift+Enter
- [ ] Add/delete cells with keyboard shortcuts
- [ ] Markdown cells for documentation (basic)
- [ ] Cell execution status indicator (idle/running/success/error)

**Out of Scope for MVP:**
- ❌ Drag-and-drop cell reordering
- ❌ Cell output collapsing
- ❌ Collaborative editing
- ❌ Notebook versioning

---

#### 1.2 Code Execution
**User Story:** *As a mathematician, I want to run M2 code and see results immediately.*

**Features:**
- [ ] Execute M2 code securely on backend
- [ ] Return results within 30 seconds (timeout)
- [ ] Preserve session state between executions
- [ ] Queue multiple executions (FIFO)
- [ ] Display execution time

**Supported M2 Operations (MVP):**
```
✓ Ring definition:      R = QQ[x,y,z]
✓ Ideal creation:       I = ideal(x^2, xy)
✓ Groebner basis:       gb I
✓ Resolution:           res I
✓ Betti tables:         betti res I
✓ Primary decomposition: primaryDecomposition I
✓ Kernel/image:         kernel f, image f
✓ Basic arithmetic:     2+2, factor 15
```

**Out of Scope for MVP:**
- ❌ File I/O operations
- ❌ Package installation
- ❌ External library loading
- ❌ Graphics/Plotting (Phase 2)
- ❌ Advanced M2 packages

---

#### 1.3 Mathematical Rendering
**User Story:** *As a mathematician, I want results displayed in proper mathematical notation.*

**Features:**
- [ ] LaTeX rendering with KaTeX
- [ ] Pretty-print polynomial rings
- [ ] Format ideals nicely
- [ ] Matrix display
- [ ] Betti table formatting

**Examples:**
```
Input:  R = QQ[x,y,z]
Output: 𝕂[x,y,z]  (rendered LaTeX)

Input:  I = ideal(x^2, xy)
Output: ⟨x², xy⟩  (rendered LaTeX)
```

**Out of Scope for MVP:**
- ❌ 3D visualizations
- ❌ Interactive graphs
- ❌ Custom rendering plugins

---

#### 1.4 Error Handling
**User Story:** *As a mathematician, I want clear, helpful error messages when something goes wrong.*

**Features:**
- [ ] Friendly error messages (no raw stack traces)
- [ ] Suggest fixes when possible
- [ ] Highlight the line with the error
- [ ] Distinguish between syntax errors and runtime errors

**Examples:**
```
❌ Bad:  "RING_NOT_INITIALIZED at line 42"
✅ Good: "You need to define a ring first. Try: R = QQ[x,y,z]"

❌ Bad:  "SEGFAULT in M2 core"
✅ Good: "Oops! The computation crashed. Please try again."
```

**Out of Scope for MVP:**
- ❌ AI-powered error suggestions
- ❌ Automatic error recovery
- ❌ Detailed debugging tools

---

#### 1.5 Session Management
**User Story:** *As a mathematician, I want my work to persist during my session.*

**Features:**
- [ ] 30-minute session timeout
- [ ] Session warning before timeout (5 min warning)
- [ ] Extend session with user activity
- [ ] Clear session indicator (session ID)

**Out of Scope for MVP:**
- ❌ User accounts
- ❌ Permanent notebook storage
- ❌ Session sharing between users
- ❌ Session export/import

---

### 2. UI/UX Essentials (Must Have)

#### 2.1 Landing Page
**User Story:** *As a visitor, I want to understand what this is and start immediately.*

**Features:**
- [ ] Hero section: "What is M2 for Newbies?"
- [ ] One-click "Launch Notebook" button
- [ ] Quick example: "Try typing: R = QQ[x,y,z]"
- [ ] Link to documentation

**Out of Scope for MVP:**
- ❌ User testimonials
- ❌ Feature comparison table
- ❌ Video tutorials
- ❌ Blog/News section

---

#### 2.2 Notebook UI
**User Story:** *As a mathematician, I want a clean, distraction-free interface.*

**Features:**
- [ ] Clean white/light theme (like Jupyter)
- [ ] Monospace font for code
- [ ] Readable font for text
- [ ] Minimal toolbar (Run, Add Cell, Delete Cell)
- [ ] Keyboard shortcuts help (Shift+Enter, Ctrl+S, etc.)

**Out of Scope for MVP:**
- ❌ Dark mode
- ❌ Custom themes
- ❌ Customizable layouts
- ❌ Advanced toolbars

---

#### 2.3 Help System
**User Story:** *As a beginner, I want quick access to help without leaving the notebook.*

**Features:**
- [ ] Help button that opens sidebar
- [ ] Link to M2 documentation
- [ ] Keyboard shortcuts reference
- [ ] Basic examples (5 examples max)

**Out of Scope for MVP:**
- ❌ Interactive tutorials
- ❌ Context-aware help
- ❌ Video guides
- ❌ Community forum integration

---

### 3. Performance Requirements (Must Have)

| Metric | Target | Why |
|--------|--------|-----|
| Page load | < 2 seconds | First impression matters |
| Cell execution | < 1 second (simple) | Feels instant |
| Cell execution | < 30 seconds (complex) | Reasonable limit |
| API response | < 500ms | Feels responsive |
| Session start | < 3 seconds | Don't make them wait |

---

### 4. Examples (Must Have)

**Provide 5 built-in examples:**

1. **Hello M2**: Create a ring
   ```
   R = QQ[x,y,z]
   describe R
   ```

2. **Basic Ideal**: Define and compute Groebner basis
   ```
   R = QQ[x,y,z]
   I = ideal(x^2, xy, xz)
   gb I
   ```

3. **Resolution**: Compute free resolution
   ```
   R = QQ[x,y,z]
   I = ideal(x^2, xy, xz)
   res I
   ```

4. **Betti Numbers**: Display Betti table
   ```
   R = QQ[x,y,z]
   I = ideal(x^2, xy, xz)
   betti res I
   ```

5. **Primary Decomposition**: Find prime components
   ```
   R = QQ[x,y,z]
   I = ideal(x*y, x*z)
   primaryDecomposition I
   ```

**Out of Scope for MVP:**
- ❌ Gallery of 100+ examples
- ❌ Community-contributed examples
- ❌ Search examples feature

---

## Not in MVP (Explicitly)

These are great ideas for Phase 2+, but they don't belong in MVP:

### User Accounts & Authentication
- ❌ Sign up / Sign in
- ❌ Password reset
- ❌ OAuth (Google, GitHub)
- ❌ User profiles

**Why not?** Adds complexity. Focus on the math, not the user system.

### Notebook Management
- ❌ Save notebooks to cloud
- ❌ Load saved notebooks
- ❌ Share notebooks via link
- ❌ Fork notebooks
- ❌ Notebook search

**Why not?** Users can copy-paste code for now. Sharing comes in Phase 2.

### Advanced Features
- ❌ 3D visualizations
- ❌ Plotting libraries
- ❌ Custom M2 packages
- ❌ File upload/download
- ❌ Export to PDF/LaTeX
- ❌ Collaborative editing

**Why not?** These are power features. Validate the core experience first.

### Community Features
- ❌ Discussion forum
- ❌ User comments
- ❌ Upvoting examples
- ❌ User leaderboards

**Why not?** Community comes after we have users. Focus on the product.

### Performance Optimizations
- ❌ WebAssembly M2 (client-side)
- ❌ Computation caching
- ❌ Result memoization
- ❌ Lazy loading

**Why not?** Optimize when we have performance problems, not before.

---

## Implementation Phases

### Week 1-2: Foundation
- [ ] Set up React + TypeScript project
- [ ] Create basic notebook UI (hardcoded cells)
- [ ] Add Monaco editor
- [ ] Style basic layout

### Week 3-4: Backend Integration
- [ ] Set up FastAPI backend
- [ ] Dockerize M2
- [ ] Implement /execute endpoint
- [ ] Add session management (in-memory)

### Week 5-6: Core Features
- [ ] Connect frontend to backend
- [ ] Implement cell execution flow
- [ ] Add execution status indicators
- [ ] Handle errors gracefully

### Week 7-8: Polish
- [ ] Add LaTeX rendering (KaTeX)
- [ ] Improve error messages
- [ ] Add 5 example notebooks
- [ ] Write documentation

### Week 9-10: Deploy & Test
- [ ] Deploy frontend to Vercel
- [ ] Deploy backend to Render
- [ ] Load testing
- [ ] User testing with 5 mathematicians

### Week 11-12: Fix & Ship
- [ ] Address user feedback
- [ ] Fix critical bugs
- [ ] Performance tuning
- [ ] **Launch MVP** 🚀

---

## MVP Success Metrics

How do we know the MVP is successful?

### Quantitative Metrics
- **Usage**: 100 unique visitors in first month
- **Engagement**: 50 users execute code
- **Retention**: 10 users return for a second session
- **Performance**: 95% of executions complete < 30 seconds

### Qualitative Metrics
- **Usability**: 3 out of 5 test users complete example without help
- **Clarity**: 4 out of 5 users understand error messages
- **Delight**: 2 out of 5 users say "this is cool!"

### Failure Criteria
If these happen, the MVP failed:
- ❌ Users can't figure out how to execute code
- ❌ > 50% of executions fail
- ❌ Average execution time > 10 seconds
- ❌ No one returns for a second session

---

## Post-MVP: Phase 2 Features

After MVP ships and we validate the concept:

### Phase 2A: Persistence (Month 2-3)
- Add user accounts (email/password)
- Save notebooks to database
- Share notebooks via public URLs

### Phase 2B: Visualization (Month 4-5)
- 3D plotting with Plotly
- Interactive graphs
- Export to PNG/SVG

### Phase 2C: Advanced M2 (Month 6+)
- Package management
- Custom M2 packages
- File I/O (upload/download)
- WebAssembly port for offline use

---

## Decision Framework

When someone suggests a feature, ask:

1. **Is it essential for the core experience?**  
   → If no, defer to Phase 2

2. **Can we ship without it?**  
   → If yes, defer to Phase 2

3. **Does it block user testing?**  
   → If no, defer to Phase 2

4. **Does it add complexity?**  
   → If yes, defer to Phase 2

5. **Can users work around it?**  
   → If yes, defer to Phase 2

**Default answer: "Great idea! Let's add it in Phase 2."**

---

## MVP Checklist

Use this checklist to track MVP completion:

### Core Features
- [ ] Notebook UI with code cells
- [ ] Execute M2 code (backend)
- [ ] Display results
- [ ] LaTeX rendering
- [ ] Error handling
- [ ] Session management

### UI/UX
- [ ] Landing page
- [ ] Clean notebook design
- [ ] Help button
- [ ] 5 example notebooks

### Technical
- [ ] React + TypeScript frontend
- [ ] FastAPI backend
- [ ] Docker M2 container
- [ ] Deploy to Vercel + Render

### Documentation
- [ ] README with quick start
- [ ] API documentation
- [ ] User guide (basic)
- [ ] Contributing guide

### Testing
- [ ] Manual testing with 5 users
- [ ] Basic automated tests
- [ ] Load testing (100 concurrent users)
- [ ] Security audit (basic)

---

## Launch Plan

### Pre-Launch (Week 11)
- [ ] Final bug fixes
- [ ] User testing with 5 mathematicians
- [ ] Performance optimization
- [ ] Write announcement post

### Launch Day (Week 12)
- [ ] Deploy to production
- [ ] Announce on GitHub
- [ ] Post to relevant communities (r/math, Twitter)
- [ ] Monitor errors/usage

### Post-Launch (Week 13+)
- [ ] Gather user feedback
- [ ] Fix critical bugs
- [ ] Plan Phase 2 features
- [ ] Iterate based on usage data

---

*Last updated: 2025-12-23*  
*Document owner: M2 for Newbies Team*

---

**Remember:** The MVP is not the final product. It's the first step. Ship it, learn from it, improve it.

*"Perfect is the enemy of good. Good is the enemy of shipped."*
