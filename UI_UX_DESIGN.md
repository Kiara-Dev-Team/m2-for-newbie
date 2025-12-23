# Macaulay2 for Newbies: A Steve Jobs-Inspired UI/UX Redesign

## Executive Summary

This document outlines a comprehensive redesign of Macaulay2's user experience, inspired by Steve Jobs' philosophy of elegant simplicity. The goal is to transform Macaulay2 from a powerful but intimidating computational algebra system into an intuitive, accessible tool that mathematicians can use without thinking about the technology.

## Philosophy & Core Principles

### The Vision
**"Great software is invisible. The mathematician should think mathematics, not code."**

Macaulay2 possesses world-class mathematical capabilities trapped inside a programmer's interface. This redesign removes barriers between mathematicians and their work by:
- Eliminating unnecessary complexity
- Speaking the mathematician's language
- Making the right choice the default choice
- Respecting the user's time and intelligence

### Six Design Principles

1. **Simplicity is the ultimate sophistication**
   - Every feature must justify its complexity
   - The default should be correct 95% of the time
   - Hide advanced options until they're needed

2. **Invisible technology**
   - The system should disappear into the background
   - Users should only see mathematics, not infrastructure
   - Technical details emerge only when necessary

3. **Focus on goals, not constraints**
   - Design for what mathematicians want to achieve
   - Don't expose internal system limitations
   - Frame everything in mathematical terms, not computational ones

4. **Make decisions for them**
   - Provide sensible defaults over endless configuration
   - Progressive disclosure: simple first, power later
   - One obvious way to do common tasks

5. **Delight in the details**
   - Beautiful typography and mathematical rendering
   - Helpful, kind error messages
   - Smooth interactions and instant feedback
   - Polish shows respect for the user

6. **Progress, not perfection**
   - Ship something simple that works perfectly
   - Add power gradually through usage patterns
   - Iterate based on real user behavior

## Current Pain Points & Solutions

### 1. Learning Curve from Hell

**Problem:** Mathematicians must simultaneously learn mathematical concepts AND programming syntax. The system punishes non-programmers.

**Solution:**
- **Natural notation**: `R = QQ[x,y,z]` should be self-explanatory
- **Interactive onboarding**: 5-minute tutorial shows results instantly
- **Human error messages**: "You need to define a ring first. Try: R = QQ[x,y,z]" instead of "RING_NOT_INITIALIZED"
- **Contextual hints**: System suggests next logical steps
- **No jargon**: Speak mathematics, not computer science

**Implementation:**
```
Instead of: Error: type mismatch in assignment
Say: "The ring R expects polynomial coefficients, but you provided a number.
     Try wrapping it: ideal(x^2 - 2*x + 1)"
```

### 2. Emacs Tyranny

**Problem:** Forcing modern mathematicians to use a 1976 editor. While Emacs is powerful, it's a barrier to entry. Most users expect Jupyter, VS Code, or web interfaces.

**Solution:**
- **Browser-first**: Jupyter-style notebook at macaulay2.org
- **No installation required**: Click and compute in seconds
- **Works everywhere**: Any device with a browser
- **Modern alternatives**: VS Code extension, not Emacs evangelism
- **Optional Emacs**: Still available for power users who want it

**Implementation:**
- Web-based notebook with cells (input/output pairs)
- Live LaTeX rendering of mathematical output
- Syntax highlighting and auto-completion
- One-click sharing of notebooks
- Persistent sessions in cloud

### 3. Documentation is a Maze

**Problem:** Dense, scattered documentation forces hours of searching. Examples are technical, not pedagogical. New users can't find answers.

**Solution:**
- **Wikipedia-style structure**: 
  - **What it is** (plain English)
  - **Why you care** (motivation)
  - **Show me** (live example)
  - **Try it** (interactive sandbox)
- **Smart search**: Return answers, not document lists
- **In-context help**: `?` button shows relevant help without leaving workspace
- **Progressive depth**: Quick reference → Tutorial → Advanced topics
- **Cross-linking**: Related concepts are one click away

**Example Structure:**
```
Topic: "Primary Decomposition"

WHAT: Break an ideal into irreducible pieces
WHY: Understand the geometric structure of varieties
SHOW: [Live interactive example]
  R = QQ[x,y]
  I = ideal(x^2 - y^3, x*y)
  primaryDecomposition I
  → Shows: { ideal(x,y), ideal(x-y^2, y^3) }
TRY: [Editable sandbox with this code]
MORE: [Links to: Ideals, Varieties, Associated Primes]
```

### 4. Cryptic Error Messages

**Problem:** System errors instead of guidance. "RING_NOT_INITIALIZED" means nothing to a mathematician learning the system.

**Solution:**
- **Clear, kind messages**: Explain what went wrong in human terms
- **Show the context**: Highlight the problematic line
- **Suggest fixes**: Offer concrete solutions, ideally with one-click application
- **Educational tone**: Help users learn, don't just report failures
- **No system jargon**: Translate internal errors to user concepts

**Error Message Redesign:**

| Old Error | New Error |
|-----------|-----------|
| `RING_NOT_INITIALIZED` | "You haven't defined a ring yet. Try: `R = QQ[x,y,z]`" |
| `type mismatch in function application` | "The function `gb` expects an ideal, but you gave it a ring. Try: `gb ideal(x^2, y^2)`" |
| `index out of bounds: 5` | "Your matrix has only 3 rows, but you asked for row 5. Remember: we count starting from 0." |
| `symbol not found: I` | "The variable `I` isn't defined yet. Did you mean to create an ideal first?" |

### 5. Installation Nightmare

**Problem:** Hours compiling from source. Dependency hell. Platform-specific failures. Many users give up before computing anything.

**Solution:**
- **Cloud-first**: No installation needed for 90% of users
- **One-command install**: `brew install macaulay2` or `apt install macaulay2`
- **Pre-built binaries**: That actually work, for all major platforms
- **Docker image**: For complex environments
- **Same experience everywhere**: Cloud and local versions are identical

**Installation Flow:**
```
Option 1 (Recommended): Visit macaulay2.org → Start computing in 10 seconds
Option 2: brew install macaulay2 → Done
Option 3: Download pre-built binary → Double-click → Done
Option 4 (Advanced): Docker pull → Run
Option 5 (Developers): Build from source (full instructions)
```

### 6. Syntax Quirks Are Obstacles

**Problem:** Non-standard choices create friction:
- Function composition is right-to-left (why?)
- Semicolons are required (visual clutter)
- 0-based indexing (violates mathematical convention)

**Solution:**
- **Match mathematical notation**: `f(x)` is function application
- **Optional semicolons**: Editor adds them invisibly if needed
- **1-based indexing**: Like mathematical convention (configurable for programmers)
- **Intuitive operators**: `^` for power, `*` for multiplication (not juxtaposition confusion)
- **The system adapts**: Not the mathematician

**Example:**
```
Before (awkward):
  f = map(S, R, {x, y})
  g = map(T, S, {a, b})
  composition = f * g  -- Wait, this is g∘f, not f∘g!

After (natural):
  f: R → S defined by x ↦ x, y ↦ y
  g: S → T defined by x ↦ a, y ↦ b
  g(f(x))  -- Composes left to right as expected
```

### 7. Slow Community Response

**Problem:** Questions languish on moderated Google Groups. New users wait days for answers, often giving up.

**Solution:**
- **Active Discord server**: Real-time help from community
- **AI-powered help**: GPT-based assistant trained on M2 documentation
- **Discourse forum**: Modern, searchable, unmoderated
- **GitHub Discussions**: For development questions
- **Stack Overflow tag**: For canonical Q&A
- **Office hours**: Live video sessions with experts

**Support Hierarchy:**
1. **In-app AI assistant**: Instant answers to common questions
2. **Documentation search**: Indexed and smart
3. **Discord**: Quick community response (~minutes)
4. **Discourse forum**: Detailed discussions (~hours)
5. **GitHub Issues**: Bug reports and feature requests
6. **Office hours**: Complex problems get expert attention (weekly)

### 8. Visualizations Don't Exist

**Problem:** Mathematicians work with geometric objects, but M2 outputs text matrices. Hard to build intuition.

**Solution:**
- **LaTeX rendering**: All output displays beautifully
- **Interactive 3D plots**: Varieties, polytopes, complexes
- **Diagram generation**: Commutative diagrams, resolution charts
- **Publication-ready**: Copy-paste into papers
- **Lightweight**: Uses standard libraries (Three.js, MathJax)

**Visualization Examples:**
```
R = QQ[x,y,z]
I = ideal(x^2 + y^2 - z^2)
variety(I)  → Shows interactive 3D cone

C = res I
betti C     → Shows Betti diagram as visual table
            → Click for full resolution display
```

## User Journey Maps

### Day One: First Contact

**Goal:** Compute something meaningful in 5 minutes without reading documentation.

**Journey:**
1. **Discovery** (30 seconds)
   - User visits macaulay2.org
   - Sees: "Compute algebraic geometry. In your browser. Right now."
   - Big button: "Start Computing"

2. **First computation** (2 minutes)
   - Notebook opens with welcome cell
   - Pre-filled example: `R = QQ[x,y,z]; I = ideal(x^2 - y^3); primaryDecomposition I`
   - User clicks "Run" (Shift+Enter)
   - Result appears instantly with LaTeX rendering
   - Tooltip: "You just decomposed an ideal! Try modifying the variables."

3. **Exploration** (2 minutes)
   - User changes `x^2 - y^3` to `x^2 + y^2 - 1`
   - Runs again, sees different result
   - Hovers over `primaryDecomposition` → tooltip explains what it does
   - Clicks "?" → full docs open in sidebar without disrupting work

4. **Success** (30 seconds)
   - User feels: "I just did real mathematics"
   - System prompts: "Want to learn more? Try our 10-minute tutorial"
   - Option to save notebook (guest mode) or create account

**Outcome:** User successfully computed something, understands basic workflow, feels confident to continue.

### Week One: Building Confidence

**Goal:** Complete real research tasks independently, understand core concepts.

**Journey:**
1. **Tutorial sequence** (Day 2-3)
   - Interactive lessons on: Rings, Ideals, Modules, Resolutions
   - Each lesson: 10-15 minutes, hands-on, immediate feedback
   - Users modify examples, see results instantly
   - Progress saved, can resume anytime

2. **First real problem** (Day 4-5)
   - User tries their research problem
   - Encounters errors → clear messages guide them
   - Uses in-context help: hover for quick tips, ? for details
   - AI assistant answers: "How do I compute Hilbert series?"

3. **Community connection** (Day 6-7)
   - User shares notebook with colleague (one-click link)
   - Asks question in Discord, gets answer in minutes
   - Discovers package for their specific area
   - Downloads example notebooks from gallery

**Outcome:** User is productive, self-sufficient for common tasks, knows where to get help.

### Month One: Mastery

**Goal:** Use advanced features, contribute to community, work efficiently.

**Journey:**
1. **Power user features** (Week 2-3)
   - Discovers keyboard shortcuts, multi-cursor editing
   - Learns about packages, installs domain-specific tools
   - Uses local installation for large computations
   - Cloud and local work seamlessly sync

2. **Advanced mathematics** (Week 3-4)
   - Tackles complex research problems
   - Writes custom functions, saves as package
   - Uses parallel computation features
   - Generates publication-ready diagrams

3. **Community contribution** (Week 4)
   - Shares package with community
   - Answers beginner questions in Discord
   - Creates tutorial notebook for their specific area
   - Provides feedback on UI improvements

**Outcome:** User is expert, contributing member of community, advocating for M2 to colleagues.

## Interface Design Specifications

### Browser-First Notebook Interface

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  Macaulay2  [Docs] [Gallery] [Account]          [?] Help    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  📓 Untitled Notebook                    [▷ Run All] [Save]  │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ In[1]: R = QQ[x,y,z]                                │    │
│  │        I = ideal(x^2 - y^3)                         │    │
│  │        primaryDecomposition I                       │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Out[1]: {ideal(x,y)}                                │    │
│  │         Irreducible decomposition with 1 component  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  [+ Code] [+ Markdown] [+ Visualization]                     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

**Features:**
- **Cells**: Input/output pairs, reorderable
- **Auto-complete**: Context-aware suggestions
- **Syntax highlighting**: Mathematical operators emphasized
- **LaTeX output**: Rendered beautifully by default
- **Inline help**: Hover tooltips, ? for full docs
- **Collaboration**: Share links, real-time co-editing (future)
- **Export**: PDF, HTML, Markdown, M2 script

### Documentation Structure

**New hierarchy:**
```
Getting Started
├── 5-Minute Quickstart (interactive)
├── 10-Minute Tutorial (interactive)
└── Installation (if you need it)

Core Concepts
├── Rings and Polynomials
├── Ideals and Varieties
├── Modules and Resolutions
└── Homological Algebra
[Each with: Concept → Example → Try It → Deep Dive]

Reference
├── Function Index (searchable)
├── Package Directory
└── Language Guide

Advanced Topics
├── Performance Optimization
├── Package Development
└── Algorithm Details

Community
├── Discord
├── Forum
├── Gallery (example notebooks)
└── FAQ
```

**Documentation Features:**
- **Search-first**: Prominent search bar, AI-powered
- **Progressive disclosure**: Quick answer → Tutorial → Reference → Theory
- **Interactive examples**: Every function has runnable code
- **Cross-linking**: Related concepts one click away
- **Version-aware**: Show docs for user's version, warn about outdated pages

### Error Message System

**Architecture:**
```
Internal Error → Error Handler → Context Analysis → User-Friendly Message

Components:
1. Error Classification: Categorize by user intent
2. Context Extraction: What were they trying to do?
3. Suggestion Engine: What fix makes sense?
4. Message Templates: Friendly, educational phrasing
5. One-Click Fixes: Apply common corrections automatically
```

**Message Template:**
```
┌────────────────────────────────────────────────┐
│ ⚠️  Undefined Variable                         │
├────────────────────────────────────────────────┤
│ The variable `I` hasn't been defined yet.      │
│                                                 │
│ Line 3: primaryDecomposition I                 │
│                              ^                  │
│                                                 │
│ Common fix: Did you mean to create an ideal?   │
│                                                 │
│ [Try this fix]  I = ideal(x^2 - y^3)           │
│                                                 │
│ [Learn more about ideals]                      │
└────────────────────────────────────────────────┘
```

### Visualization System

**Types of visualizations:**

1. **Algebraic objects**
   - Matrices: LaTeX rendering
   - Betti tables: Visual diagrams
   - Resolutions: Chain complex diagrams
   - Hilbert series: Interactive plots

2. **Geometric objects**
   - Varieties: 3D surface plots
   - Polytopes: Wireframe and solid views
   - Simplicial complexes: Interactive graphs
   - Morphisms: Arrow diagrams

3. **Computational insights**
   - Algorithm progress: Progress bars
   - Performance: Timing charts
   - Memory usage: Visual gauge

**Implementation:**
```javascript
// Example: Visualize a variety
R = QQ[x,y,z]
I = ideal(x^2 + y^2 - z^2)
plot(I, range => {-2,2})
// → Opens interactive 3D plot using Three.js
// → User can rotate, zoom, toggle wireframe
// → Export as PNG, SVG, or interactive HTML
```

## Technical Implementation Roadmap

### Phase 1: Foundation (Months 1-3)

**Deliverables:**
1. **Web notebook prototype**
   - JupyterHub-based infrastructure
   - M2 kernel integration
   - Basic cell execution
   - LaTeX rendering (MathJax)

2. **Documentation v2.0**
   - Restructured hierarchy
   - First 10 core concept pages (new format)
   - Search functionality
   - Interactive examples

3. **Error message system**
   - Error classification schema
   - First 20 improved error messages
   - Context extraction logic

**Success metrics:**
- 100 beta testers
- Average time to first computation < 2 minutes
- 80% of users complete quickstart tutorial
- 50% reduction in "how do I start" support questions

### Phase 2: Polish (Months 4-6)

**Deliverables:**
1. **Enhanced notebook**
   - Auto-complete
   - Syntax highlighting
   - Inline help tooltips
   - Notebook sharing
   - Gallery of examples

2. **Complete documentation**
   - All core concepts covered
   - Package documentation
   - Advanced topics
   - API reference

3. **Community infrastructure**
   - Discord server
   - Discourse forum
   - GitHub Discussions
   - AI assistant (basic)

4. **Visualization engine**
   - 2D plots
   - 3D surface plots
   - Betti diagram renderer
   - Export functionality

**Success metrics:**
- 1,000 active users
- 90% user satisfaction score
- 75% of questions answered in < 1 hour
- 100 shared notebooks in gallery

### Phase 3: Scale (Months 7-12)

**Deliverables:**
1. **Production infrastructure**
   - Scalable compute backend
   - User authentication
   - Persistent storage
   - Performance optimization

2. **Local installation**
   - One-command installers (Homebrew, apt, etc.)
   - Pre-built binaries
   - Docker images
   - Cloud-local sync

3. **Advanced features**
   - Real-time collaboration
   - Package manager
   - Integrated debugging
   - Parallel computation UI

4. **AI assistant v2**
   - GPT-4 integration
   - Trained on M2 docs
   - Code generation
   - Error diagnosis

**Success metrics:**
- 10,000 active users
- 95% user satisfaction
- 50% of new users discover via word-of-mouth
- Average session length > 30 minutes (deep engagement)
- 1,000 contributed notebooks

### Phase 4: Ecosystem (Year 2)

**Deliverables:**
1. **VS Code extension**
   - Full notebook support
   - Debugging integration
   - Git integration
   - Local/cloud switching

2. **Mobile experience**
   - Responsive design
   - Touch-optimized
   - Read-only on phone
   - Full editing on tablet

3. **Education platform**
   - Course creation tools
   - Student management
   - Assignment submission
   - Automated grading

4. **Research tools**
   - Experiment tracking
   - Result archival
   - Reproducibility tools
   - Publication export

**Success metrics:**
- 50,000 active users
- Adopted by 10+ universities
- 100+ packages in ecosystem
- 10,000+ notebooks shared
- Self-sustaining community

## Design Guidelines

### Typography
- **Headings**: Inter or SF Pro (clean, modern sans-serif)
- **Code**: JetBrains Mono or Fira Code (ligatures for operators)
- **Math**: Latin Modern Math (LaTeX standard)
- **Body**: System font stack (fast, native feel)

### Color Palette
```
Primary: #0066CC (trustworthy blue)
Success: #28A745 (clear green)
Warning: #FFC107 (attention yellow)
Error: #DC3545 (clear red)
Background: #FFFFFF (clean white)
Surface: #F8F9FA (subtle gray)
Text: #212529 (high contrast black)
Text secondary: #6C757D (readable gray)
Code background: #F6F8FA (GitHub-style)
Math accent: #5E35B1 (distinctive purple)
```

### Interaction Patterns
- **Primary action**: Blue button, prominent
- **Secondary action**: Outline button
- **Destructive action**: Red, requires confirmation
- **Loading**: Subtle spinner, never block the whole screen
- **Success**: Green checkmark, auto-dismiss after 3s
- **Error**: Red, persist until addressed

### Spacing & Layout
- **Grid**: 8px base unit
- **Container**: Max 1200px width (readable)
- **Padding**: 16px mobile, 24px desktop
- **Cell gap**: 12px between cells
- **Section gap**: 32px between major sections

### Animation
- **Transition duration**: 200ms (snappy)
- **Easing**: ease-out (natural)
- **Cell execution**: Subtle pulse on output
- **Loading**: Smooth progress bar
- **Error shake**: Small horizontal wobble
- **Success**: Brief scale-up pulse

## Accessibility Considerations

### Visual
- **Contrast ratio**: WCAG AAA (7:1 for body text)
- **Font size**: Minimum 16px, scalable
- **Color independence**: Never rely solely on color
- **Focus indicators**: Clear, high-contrast outlines
- **Dark mode**: Full support with appropriate contrast

### Motor
- **Keyboard navigation**: All features accessible
- **Focus management**: Logical tab order
- **Target size**: Minimum 44x44px touch targets
- **Sticky elements**: None that block content

### Cognitive
- **Clear hierarchy**: Consistent headings
- **Progressive disclosure**: Complex info hidden until needed
- **Undo/redo**: Always available
- **Autosave**: Never lose work
- **Clear error recovery**: One path back to safety

### Screen readers
- **ARIA labels**: All interactive elements
- **Alt text**: All meaningful images
- **Live regions**: For dynamic updates
- **Skip links**: Quick navigation to main content

## Success Metrics

### Quantitative
- **Time to first computation**: < 2 minutes
- **Tutorial completion rate**: > 75%
- **Error message helpfulness**: > 80% (user survey)
- **Support ticket volume**: 50% reduction
- **User retention (7-day)**: > 60%
- **User retention (30-day)**: > 40%
- **Average session duration**: > 20 minutes
- **Community contributions**: > 10 notebooks/week

### Qualitative
- "Easiest way to learn computational algebra" (user quote goal)
- "I actually understand what's happening" (comprehension)
- "Beautiful and powerful" (design + function)
- "Recommended to all my students" (word-of-mouth)

### Comparison to Current State
| Metric | Current | Target | Improvement |
|--------|---------|--------|-------------|
| Time to first computation | 30+ min | < 2 min | 15x faster |
| Installation success rate | ~60% | 99% | Pain eliminated |
| New user retention | ~20% | 60% | 3x better |
| Support response time | 1-3 days | < 1 hour | 24x faster |
| User satisfaction | ~60% | 90% | 50% increase |

## Measuring Impact

### Analytics to Track
1. **Funnel analysis**
   - Landing → Signup → First computation → Second session → Active user

2. **Feature usage**
   - Which functions are most used?
   - Which docs are most visited?
   - Where do users get stuck?

3. **Error patterns**
   - Which errors are most common?
   - Do new error messages reduce recurrence?
   - What fixes do users apply?

4. **Community health**
   - Response time to questions
   - Percentage of questions answered
   - Number of active contributors
   - Sentiment analysis of feedback

### A/B Testing Opportunities
- Error message phrasing
- Tutorial content and order
- Documentation structure
- Default examples in quickstart
- Color scheme and typography

### User Research Methods
- **Usability testing**: Watch new users try to accomplish tasks
- **Surveys**: Quarterly satisfaction and feature requests
- **Interviews**: Deep dives with power users and beginners
- **Session recordings**: Identify confusion and friction points
- **Heatmaps**: Where do users click? What do they read?

## Risks & Mitigation

### Risk 1: Simplification sacrifices power
**Mitigation:**
- Progressive disclosure: simple by default, power available
- Advanced mode toggle for experts
- Maintain full API compatibility
- Clear upgrade path from simple to advanced

### Risk 2: Web version is slower than native
**Mitigation:**
- Optimize compute backend (AWS Lambda + compilation caching)
- Stream results for long computations
- Local installation for heavy workloads
- Clear communication of performance expectations

### Risk 3: Community resists change
**Mitigation:**
- Emacs mode remains available
- Traditional docs alongside new ones
- Gradual rollout with feedback loops
- Emphasis: "expanding audience, not replacing experts"
- Involve community in design decisions

### Risk 4: Maintenance burden increases
**Mitigation:**
- Robust testing infrastructure
- Clear code ownership
- Community contributions encouraged
- Automated deployment and monitoring
- Regular dependency updates

### Risk 5: Documentation becomes outdated
**Mitigation:**
- Doc tests that run with every build
- Automated link checking
- Community edit suggestions
- Regular review cycles
- Version-specific docs

## Conclusion

This redesign transforms Macaulay2 from expert-only software into a tool that welcomes beginners while retaining all its power. By following Steve Jobs' philosophy of elegant simplicity, we can:

1. **Eliminate barriers**: No installation, no Emacs requirement, no cryptic errors
2. **Speak the user's language**: Mathematical notation, kind guidance, visual beauty
3. **Build community**: Active support, shared knowledge, collaborative learning
4. **Maintain excellence**: All current capabilities, now accessible to everyone

**The goal is not to dumb down Macaulay2. It's to make mastery accessible.**

The technology exists. The community is ready. The mathematical power is unmatched. All that's needed is the commitment to put the user first—to design with empathy, ship with confidence, and iterate with humility.

**This is how we democratize computational algebra.**

---

## Next Steps

1. **Validate with users**: Test this vision with 10 mathematicians (3 beginners, 4 intermediate, 3 experts)
2. **Build prototype**: Create minimal viable notebook (4 weeks)
3. **Alpha test**: 50 users, gather feedback, iterate (8 weeks)
4. **Public beta**: Launch to community, iterate rapidly (12 weeks)
5. **Version 1.0**: Polish, performance, stability (16 weeks)

**Total time to public launch: 40 weeks (~10 months)**

The revolution starts with a single line of code in a browser. Let's make it happen.
