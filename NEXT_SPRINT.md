# Next Development Sprint Plan
## Strategic Roadmap Based on Phase 1 Completion

*Created: 2025-12-23*  
*Context: Following successful completion of landing page improvements (interactive demo, learning journey, psychological safety features)*

---

## Executive Summary

**Current State**: Phase 1 Complete ✅
- Interactive demo on landing page
- Learning journey visualization
- Beginner-friendly messaging
- Comprehensive UX analysis

**Next Goal**: Transform simulated demo into **real, working notebook experience**

**Sprint Duration**: 3-4 weeks  
**Team Required**: 1-2 full-stack developers + 1 designer  
**Priority**: HIGH - Bridge between promise and delivery

---

## Sprint Objectives

### Primary Goal
**Make the demo REAL**: Convert simulated interactive demo into functional M2 web notebook

### Success Criteria
- [ ] Users can write actual M2 code (not pre-filled)
- [ ] Real M2 computation engine executes code
- [ ] Results display with LaTeX rendering
- [ ] Session persists for 30 minutes
- [ ] 3 working examples users can try

---

## Sprint Backlog: Prioritized User Stories

### 🔥 CRITICAL (Must Have)

#### Story 1: Real M2 Backend Integration
**As a user, I want my code to execute on a real M2 engine, not just see simulated output**

**Acceptance Criteria**:
- [ ] M2 instance runs in Docker container
- [ ] WebSocket connection between frontend and M2
- [ ] Code submitted from browser executes in M2
- [ ] Results stream back to browser in real-time
- [ ] Timeout after 30 seconds for long computations

**Technical Approach**:
```
Architecture:
Frontend (index.html) 
  → WebSocket → 
Backend (Python FastAPI) 
  → Process → 
M2 Docker Container
  → Output → 
Backend → 
Frontend
```

**Deliverables**:
- Docker image with M2 installed
- FastAPI server with WebSocket endpoint
- JavaScript WebSocket client in index.html
- Error handling for connection failures

**Estimated Effort**: 1 week (5-7 days)

**Priority**: P0 - Blocking all other features

---

#### Story 2: Editable Code Cells
**As a user, I want to modify the example code and try my own variations**

**Acceptance Criteria**:
- [ ] Code editor supports typing/editing (not just display)
- [ ] Syntax highlighting works for M2 syntax
- [ ] "Run" button executes current cell content
- [ ] Multiple cells can be added/removed
- [ ] Shift+Enter keyboard shortcut works

**Technical Approach**:
- Use **Monaco Editor** (VS Code's editor) or **CodeMirror**
- M2 syntax highlighting mode
- Cell management system (add/remove/reorder)

**Deliverables**:
- Monaco Editor integration
- M2 syntax definition file
- Cell CRUD operations
- Keyboard shortcuts

**Estimated Effort**: 3-4 days

**Priority**: P0 - Core functionality

---

#### Story 3: Session Management
**As a user, I want my work to persist during my session so I don't lose progress**

**Acceptance Criteria**:
- [ ] Session ID generated on first visit
- [ ] M2 state preserved between cell executions
- [ ] Session timeout warning at 25 minutes
- [ ] "Extend session" option available
- [ ] Variables defined in cell 1 available in cell 2

**Technical Approach**:
- Session ID in cookie or localStorage
- Backend maintains M2 instance per session
- Redis/memory store for session state
- Automatic cleanup after timeout

**Deliverables**:
- Session middleware
- M2 instance pool manager
- Timeout warning UI
- Session extension logic

**Estimated Effort**: 2-3 days

**Priority**: P0 - Required for multi-step workflows

---

### 🔶 HIGH (Should Have)

#### Story 4: Enhanced Examples Library
**As a beginner, I want 5 working examples I can learn from**

**Acceptance Criteria**:
- [ ] "Examples" dropdown or sidebar
- [ ] 5 examples from UX_ANALYSIS.md implemented:
  1. Hello M2 (create a ring)
  2. Basic ideal (Groebner basis)
  3. Resolution (free resolution)
  4. Betti numbers (Betti table)
  5. Primary decomposition
- [ ] "Load Example" button fills cells
- [ ] Each example has explanation text

**Deliverables**:
- Examples data structure (JSON)
- Example selector UI component
- Load mechanism
- Explanatory text for each

**Estimated Effort**: 2 days

**Priority**: P1 - Helps users learn

---

#### Story 5: LaTeX Output Rendering
**As a user, I want mathematical output to display beautifully, not as plain text**

**Acceptance Criteria**:
- [ ] Polynomial output renders as LaTeX
- [ ] Matrices render as formatted tables
- [ ] Ideals use proper mathematical notation
- [ ] Betti tables display as visual grids
- [ ] Render within 200ms

**Technical Approach**:
- **KaTeX** (fast) or **MathJax** (comprehensive)
- Output parser to detect math expressions
- Markdown + LaTeX mixed rendering

**Deliverables**:
- KaTeX integration
- Output formatter
- Math detection regex
- Rendering pipeline

**Estimated Effort**: 2-3 days

**Priority**: P1 - Major UX improvement

---

#### Story 6: Helpful Error Messages
**As a user, when I make a mistake, I want clear guidance, not cryptic errors**

**Acceptance Criteria**:
- [ ] Top 5 errors have custom messages:
  1. Ring not defined → "Try: R = QQ[x,y,z]"
  2. Symbol not found → "Did you define this variable?"
  3. Type mismatch → "Expected ideal, got ring"
  4. Syntax error → Highlight problematic line
  5. Timeout → "Computation took too long (>30s)"
- [ ] Error messages in friendly tone
- [ ] Suggestions provided when possible

**Deliverables**:
- Error classification mapping
- User-friendly message templates
- Error UI component
- Suggestion engine

**Estimated Effort**: 2 days

**Priority**: P1 - Reduces frustration

---

### 🔷 MEDIUM (Nice to Have)

#### Story 7: Progress Indicators
**As a user, I want to know when my code is running**

**Acceptance Criteria**:
- [ ] Spinner shows during computation
- [ ] "Computing..." status message
- [ ] Progress estimation for known operations
- [ ] "Cancel" button for long-running code

**Estimated Effort**: 1 day

**Priority**: P2 - Quality of life

---

#### Story 8: Keyboard Shortcuts
**As a power user, I want keyboard shortcuts for common actions**

**Acceptance Criteria**:
- [ ] Shift+Enter: Run cell
- [ ] Ctrl+Enter: Run and stay in cell
- [ ] Esc: Command mode
- [ ] A: Add cell above
- [ ] B: Add cell below
- [ ] D+D: Delete cell

**Estimated Effort**: 1 day

**Priority**: P2 - For efficiency

---

## Sprint Timeline (3-4 Weeks)

### Week 1: Backend Foundation
**Focus**: Get M2 running and connected

**Day 1-2**: Docker + M2 setup
- [ ] Create Dockerfile with M2
- [ ] Test M2 execution in container
- [ ] Document setup process

**Day 3-4**: Backend API
- [ ] FastAPI server skeleton
- [ ] WebSocket endpoint
- [ ] M2 process management
- [ ] Basic error handling

**Day 5**: Integration Testing
- [ ] Test frontend → backend → M2 flow
- [ ] Fix connection issues
- [ ] Load testing (10 concurrent users)

---

### Week 2: Frontend Functionality
**Focus**: Make notebook interactive

**Day 6-7**: Code Editor
- [ ] Monaco Editor integration
- [ ] M2 syntax highlighting
- [ ] Basic cell UI

**Day 8-9**: Cell Management
- [ ] Add/remove cells
- [ ] Execute cells
- [ ] Display output
- [ ] Keyboard shortcuts

**Day 10**: Polish
- [ ] Loading states
- [ ] Error display
- [ ] Mobile responsiveness

---

### Week 3: Features & Polish
**Focus**: Examples, LaTeX, error messages

**Day 11-12**: Examples
- [ ] 5 examples implemented
- [ ] Example selector UI
- [ ] Load mechanism

**Day 13-14**: LaTeX Rendering
- [ ] KaTeX integration
- [ ] Output formatting
- [ ] Visual polish

**Day 15**: Error Messages
- [ ] Top 5 errors mapped
- [ ] Friendly messages
- [ ] Suggestion logic

---

### Week 4: Testing & Deployment
**Focus**: Validate and launch

**Day 16-17**: User Testing
- [ ] 5 newbie testers recruited
- [ ] Testing protocol executed
- [ ] Feedback gathered
- [ ] Critical issues fixed

**Day 18-19**: Performance
- [ ] Optimize load times
- [ ] Reduce latency
- [ ] Handle edge cases

**Day 20**: Deployment
- [ ] Deploy to production
- [ ] Monitor errors
- [ ] Announce to community

---

## Resource Requirements

### Team
- **1 Backend Developer** (Python, Docker, M2)
  - M2 expertise required
  - WebSocket experience helpful
  
- **1 Frontend Developer** (JavaScript, React/Monaco)
  - Strong JavaScript skills
  - UI/UX sensibility
  
- **0.5 Designer** (part-time)
  - Polish visual design
  - User testing facilitation

### Infrastructure
- **Development**:
  - Docker environment
  - M2 installed locally
  - Git repository access

- **Production**:
  - Cloud hosting (AWS/DigitalOcean/Render)
  - Estimated cost: $50-100/month
  - Docker container orchestration
  - Load balancer for scaling

### Tools
- Docker
- FastAPI (Python)
- Monaco Editor
- KaTeX
- Redis (optional, for session storage)
- GitHub Actions (CI/CD)

---

## Success Metrics

### Quantitative
- [ ] **< 3 seconds** page load time
- [ ] **< 1 second** code execution (simple)
- [ ] **< 30 seconds** code execution (complex)
- [ ] **> 80%** example completion rate
- [ ] **> 50%** users try modifying example code
- [ ] **> 30%** users create from scratch

### Qualitative
- [ ] "I can actually use this now!" (user quote)
- [ ] "The examples helped me learn" (feedback)
- [ ] "It's fast enough for real work" (performance)

### Testing Goals
- [ ] 5 newbies successfully complete 3 examples
- [ ] 4/5 can explain what their code does
- [ ] 3/5 try custom modifications
- [ ] Average time to first success: < 5 minutes

---

## Risk Management

### Risk 1: M2 Docker Image Too Large
**Impact**: Slow downloads, high hosting costs  
**Mitigation**: 
- Optimize Docker layers
- Use alpine base image
- Pre-build and cache

**Probability**: Medium  
**Severity**: Medium

---

### Risk 2: WebSocket Connection Instability
**Impact**: Lost sessions, frustrated users  
**Mitigation**:
- Automatic reconnection
- Session state backup
- Clear error messages

**Probability**: Medium  
**Severity**: High

---

### Risk 3: M2 Computation Timeouts
**Impact**: Complex code doesn't complete  
**Mitigation**:
- 30-second timeout with warning
- "Upgrade for longer timeout" path
- Async computation with callback

**Probability**: Low  
**Severity**: Medium

---

### Risk 4: Insufficient User Testing
**Impact**: Launch with poor UX  
**Mitigation**:
- Recruit 5 testers in week 3
- Iterate based on feedback
- Soft launch to small group first

**Probability**: Medium  
**Severity**: High

---

## Out of Scope (Future Sprints)

### Not This Sprint
- ❌ User accounts / authentication
- ❌ Save notebooks permanently
- ❌ Share notebooks via URL
- ❌ Collaborative editing
- ❌ 3D visualizations
- ❌ Advanced M2 packages
- ❌ Mobile app
- ❌ Offline mode
- ❌ AI-powered help

**Rationale**: Focus on core functionality first. Validate the concept with minimal features before adding complexity.

---

## Definition of Done

### Sprint is complete when:
1. ✅ User can write custom M2 code
2. ✅ Real M2 executes the code
3. ✅ Results display with LaTeX
4. ✅ 5 examples work end-to-end
5. ✅ Error messages are helpful
6. ✅ 5 user testers give thumbs up
7. ✅ Deployed to production
8. ✅ No critical bugs in production

### Quality Gates
- [ ] All P0 stories complete
- [ ] 80% of P1 stories complete
- [ ] Zero critical bugs
- [ ] Performance benchmarks met
- [ ] Security review passed (basic)
- [ ] Documentation updated

---

## Communication Plan

### Daily Standups (15 min)
- What I did yesterday
- What I'm doing today
- Any blockers

### Weekly Demo (Friday)
- Show working features
- Gather feedback
- Adjust priorities

### Sprint Retrospective (End of Week 4)
- What went well?
- What could improve?
- Action items for next sprint

---

## Next Sprint Preview (Sprint 2)

After this sprint, the next priorities will be:

### Sprint 2 Focus: Persistence & Sharing
1. User accounts (simple email/password)
2. Save notebooks to database
3. Share notebooks via URL
4. Gallery of community notebooks
5. Search functionality

**Timeline**: Another 3-4 weeks  
**Goal**: Enable users to build a portfolio of work

---

## Appendix: Technical Decisions

### Why FastAPI?
- Fast performance (async)
- WebSocket support built-in
- Python (easy M2 integration)
- Auto-generated API docs

### Why Monaco Editor?
- VS Code quality
- Excellent syntax highlighting
- Keyboard shortcuts built-in
- Active maintenance

### Why Docker?
- Consistent environments
- Easy M2 installation
- Scalable (container orchestration)
- Isolated execution

### Why KaTeX over MathJax?
- 10x faster rendering
- Smaller bundle size
- Sufficient for M2 output
- Can upgrade to MathJax later if needed

---

## Questions for Discussion

Before sprint starts, align on:

1. **Hosting**: AWS, DigitalOcean, or Render?
2. **Budget**: What's the monthly budget for hosting?
3. **Team**: Who's available for this sprint?
4. **Timeline**: Start immediately or wait for resources?
5. **Scope**: Any features to add/remove from this plan?

---

## Conclusion

This sprint transforms the landing page demo from **simulation to reality**. By end of sprint, users will have a functional M2 web notebook they can use for real mathematical work.

**Key Principle**: Ship minimal, ship fast, iterate based on feedback.

**Success looks like**: A beginner can visit the site, try the examples, modify code, and successfully compute something meaningful - all in under 10 minutes.

**Let's build it!** 🚀

---

*Ready to start? Review this plan, adjust as needed, then kick off Week 1 Day 1!*
