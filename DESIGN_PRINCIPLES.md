# Macaulay2 Design Principles
## A Quick Reference for the Steve Jobs-Inspired Redesign

> "Simplicity is the ultimate sophistication." — Leonardo da Vinci (quoted by Steve Jobs)

## The Core Philosophy

Every design decision should answer YES to these questions:
1. **Does it remove barriers between mathematicians and their work?**
2. **Does it speak the mathematician's language, not the programmer's?**
3. **Is it beautiful in both form and function?**
4. **Does it make the right thing the easy thing?**
5. **Could a mathematician use it productively in their first 5 minutes?**

If the answer is NO to any of these, reconsider the design.

---

## The Six Principles (Quick Version)

### 1. Simplicity is the ultimate sophistication
- Default should be right 95% of the time
- Hide complexity until it's needed
- One obvious way to do common tasks

### 2. Invisible technology
- Users see mathematics, not infrastructure
- System disappears into the background
- Technical details only when necessary

### 3. Focus on goals, not constraints
- Design for what users want to achieve
- Don't expose internal limitations
- Frame everything in mathematical terms

### 4. Make decisions for them
- Sensible defaults over endless options
- Progressive disclosure: simple → powerful
- Guide users to success

### 5. Delight in the details
- Beautiful typography and rendering
- Helpful, kind error messages
- Smooth interactions
- Polish shows respect

### 6. Progress, not perfection
- Ship simple things that work perfectly
- Add power gradually
- Iterate based on real usage

---

## Decision Framework

When evaluating a feature or design choice, use this framework:

```
┌─────────────────────────────────────────────────────┐
│                  Feature Decision Tree              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Is it essential for the primary use case?         │
│           ├─ YES: Include in default view          │
│           └─ NO: ↓                                  │
│                                                     │
│  Will 80%+ of users need it eventually?            │
│           ├─ YES: Progressive disclosure           │
│           └─ NO: ↓                                  │
│                                                     │
│  Is it required for advanced workflows?            │
│           ├─ YES: Hide in "Advanced" section       │
│           └─ NO: ↓                                  │
│                                                     │
│  Does it add value for specific users?             │
│           ├─ YES: Make it a plugin/extension       │
│           └─ NO: Don't build it                    │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Design Patterns to Follow

### Error Messages
**Bad:** `RING_NOT_INITIALIZED`  
**Good:** "You haven't defined a ring yet. Try: `R = QQ[x,y,z]`"

**Pattern:**
1. What went wrong (plain English)
2. Show the context (highlight line)
3. Why it matters
4. How to fix it (concrete suggestion)
5. One-click fix when possible

### Documentation
**Bad:** Dense technical reference  
**Good:** What → Why → Show → Try

**Pattern:**
1. **What**: Plain English definition
2. **Why**: Why you care (motivation)
3. **Show**: Live example with output
4. **Try**: Interactive sandbox
5. **More**: Links to related concepts

### User Interface
**Bad:** Dropdown menus with 50 options  
**Good:** Smart defaults with "More options" disclosure

**Pattern:**
1. Show most common choice by default
2. 2-3 alternatives if multiple popular choices
3. "More options" expands to full set
4. Remember user's choices

### Onboarding
**Bad:** "Read the manual first"  
**Good:** "Try this code right now"

**Pattern:**
1. Pre-filled example (5 seconds)
2. User modifies and runs (2 minutes)
3. Success → exploration (5 minutes)
4. Tutorial offer (optional, 10 minutes)
5. Gradual depth increase

---

## What This Means In Practice

### For Interface Design
- **Browser-first**: No installation required for 90% of users
- **Notebook-style**: Cells, LaTeX output, inline help
- **Progressive disclosure**: Simple by default, power available
- **Keyboard shortcuts**: For efficiency
- **Touch-friendly**: Works on tablets

### For Documentation
- **Search-first**: Prominent search bar, AI-powered
- **Answer, not links**: Return the answer, not a list of documents
- **Interactive examples**: Every function has runnable code
- **Cross-linked**: Related concepts one click away
- **Multiple depths**: Quick ref → Tutorial → Deep dive

### For Error Handling
- **Human language**: No system jargon
- **Context-aware**: Understand what user was trying to do
- **Actionable**: Suggest specific fixes
- **Educational**: Help users learn, don't just report errors
- **One-click fixes**: When possible, apply the fix automatically

### For Installation
- **Cloud-first**: Visit URL, start computing
- **One-command**: `brew install macaulay2` for local
- **Pre-built binaries**: For all major platforms
- **Same everywhere**: Cloud and local identical
- **No compilation**: Unless you choose to

### For Community
- **Real-time help**: Discord for quick questions
- **Async discussion**: Discourse for detailed topics
- **AI assistance**: Built into the interface
- **Expert access**: Office hours, workshops
- **Shared knowledge**: Gallery of notebooks, packages

---

## Anti-Patterns to Avoid

### ❌ Don't Do This
1. **"Read the documentation first"** → Users want to compute, not read
2. **Expose all options upfront** → Overwhelming, decision paralysis
3. **Technical error messages** → "SEGFAULT" means nothing to mathematicians
4. **Require installation** → Major barrier to entry
5. **Force editor choice** → Let users use what they know
6. **0-based indexing** → Violates mathematical convention
7. **Cryptic syntax** → `#` for length? Why not `length()`?
8. **Scattered documentation** → Users get lost
9. **Slow support** → Questions languish for days
10. **Text-only output** → Mathematicians need visualization

### ✅ Do This Instead
1. **"Try this code right now"** → Instant gratification
2. **Smart defaults** → Right choice 95% of the time
3. **Kind error messages** → "Here's what went wrong and how to fix it"
4. **Browser-first** → Zero friction to start
5. **Modern defaults** → Web/Jupyter, with alternatives
6. **1-based indexing** → Match mathematical convention
7. **Intuitive syntax** → `length(L)` is clear
8. **Structured docs** → Clear hierarchy, great search
9. **Fast support** → AI + Discord = minutes not days
10. **Beautiful output** → LaTeX + plots + diagrams

---

## Measuring Success

### Quantitative Metrics
- Time to first computation: **< 2 minutes**
- Tutorial completion: **> 75%**
- 7-day retention: **> 60%**
- Error message helpfulness: **> 80%** (survey)
- Support ticket reduction: **50%**

### Qualitative Metrics
- "Easiest computational algebra system"
- "I understand what's happening"
- "Beautiful and powerful"
- "Recommended to all my students"

### The Ultimate Test
**Can a mathematician who's never used M2 accomplish something meaningful in their first 5 minutes without reading documentation?**

If YES: We've succeeded.  
If NO: We have more work to do.

---

## Implementation Priorities

### Phase 1: Foundation (Must Have)
1. Web notebook (basic)
2. One example that works perfectly
3. Clear, kind error messages (top 10 errors)
4. Quickstart tutorial (5 minutes)
5. LaTeX output rendering

### Phase 2: Polish (Should Have)
1. Auto-complete
2. Interactive documentation
3. Visualization (2D plots, Betti tables)
4. Notebook sharing
5. Community Discord

### Phase 3: Scale (Nice to Have)
1. Real-time collaboration
2. Advanced visualizations (3D)
3. AI assistant
4. Mobile optimization
5. VS Code extension

**Order matters.** Get Phase 1 perfect before Phase 2. Get Phase 2 solid before Phase 3.

"Focus is about saying no to good ideas so you can say yes to the great ones." — Steve Jobs

---

## For Contributors

When adding features or fixing bugs, ask:

1. **Does this align with our six principles?**
2. **Does this make the common case easier?**
3. **Could I explain this to a mathematician in one sentence?**
4. **Is this delightful or just functional?**
5. **Am I adding complexity or removing it?**

If you're unsure, discuss in the community channel. Better to ask than to add something that doesn't fit.

---

## Quick Decision Examples

### Example 1: Syntax Choice
**Question:** Should we use `R.1` or `x` to refer to variables?

**Analysis:**
- `R.1` is computer notation (index)
- `x` is mathematical notation (name)
- Mathematicians think "x", not "first variable"

**Decision:** Use named variables: `R = QQ[x,y,z]` then use `x` directly

**Principle:** Focus on goals (mathematics), not constraints (implementation)

### Example 2: Error Message
**Question:** User tries `gb I` before defining `I`

**Current:** `error: symbol not found: I`

**Redesign:**
```
⚠️  Variable Not Defined

The variable `I` hasn't been defined yet.

Line 5: gb I
           ^

Common fix: Did you mean to create an ideal first?
Try: I = ideal(x^2 - y^3)

[Learn more about ideals]
```

**Principle:** Delight in details, make decisions for them

### Example 3: Installation
**Question:** How should users install M2?

**Options:**
A. Compile from source (most flexible)
B. Package managers (familiar)
C. Web version (zero friction)

**Decision:** Lead with C (web), offer B for power users, keep A for developers

**Principle:** Progress not perfection, simplicity is sophistication

---

## Remember

> "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs

Every pixel, every word, every interaction should serve the mathematician's goal: **to do mathematics beautifully and efficiently.**

When in doubt, choose simplicity.
When overwhelmed, focus on the primary use case.
When stuck, ask: "What would make a mathematician smile?"

**Let's make computational algebra delightful.**
