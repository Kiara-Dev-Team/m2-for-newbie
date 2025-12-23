# System Architecture

This document defines the system architecture for **M2 for Newbies**, designed to deliver a browser-first, zero-installation computational algebra experience.

## Design Principles

1. **Browser-First**: The mathematician's browser is the interface
2. **Zero-Installation**: Click a link, start computing
3. **Progressive Enhancement**: Works everywhere, better with modern features
4. **Separation of Concerns**: Clean boundaries between UI, API, and compute
5. **Stateless Where Possible**: Easy to scale, simple to reason about
6. **Security by Design**: Sandboxed execution, input validation, rate limiting

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        User's Browser                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           React Frontend (TypeScript)                   │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │   Notebook   │  │     Math     │  │    Visual    │ │ │
│  │  │   Interface  │  │   Renderer   │  │   Explorer   │ │ │
│  │  │  (Monaco)    │  │   (KaTeX)    │  │  (Plotly)    │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │ │
│  │                                                          │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │          API Client (axios/fetch)                │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                        HTTPS/WSS
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Backend API (FastAPI)                     │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              API Gateway & Router                       │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │   Session    │  │     Auth     │  │     Rate     │ │ │
│  │  │  Management  │  │  Middleware  │  │   Limiting   │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │           Computation Service                           │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │   Request    │  │   Execution  │  │    Result    │ │ │
│  │  │   Parser     │  │   Manager    │  │   Formatter  │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                    Subprocess/Container
                              │
┌─────────────────────────────────────────────────────────────┐
│                   M2 Execution Environment                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │        Macaulay2 Core (Docker Container)               │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │ │
│  │  │  Sandboxed   │  │    Timeout   │  │   Resource   │ │ │
│  │  │   Process    │  │  Management  │  │    Limits    │ │ │
│  │  └──────────────┘  └──────────────┘  └──────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Details

### 1. Frontend Layer (React)

**Responsibilities:**
- User interface and interaction
- Code editing with syntax highlighting
- Mathematical notation rendering
- Result visualization
- Error display with helpful messages

**Key Components:**

#### Notebook Interface
```typescript
interface NotebookCell {
  id: string;
  type: 'code' | 'markdown';
  content: string;
  output?: ComputationResult;
  status: 'idle' | 'running' | 'success' | 'error';
}
```

- **Code Cells**: Monaco editor with M2 syntax highlighting
- **Markdown Cells**: Rich text with KaTeX for inline math
- **Output Cells**: Formatted results, visualizations, error messages

#### State Management
```typescript
interface AppState {
  notebook: NotebookCell[];
  session: SessionInfo;
  isConnected: boolean;
  computationQueue: string[];
}
```

**Communication:**
- REST API for code execution
- WebSocket (future) for real-time updates
- Optimistic UI updates for perceived speed

---

### 2. Backend API Layer (FastAPI)

**Responsibilities:**
- Request validation and sanitization
- Session management
- Computation orchestration
- Response formatting
- Error handling

**API Endpoints:**

```python
# Core endpoints
POST   /api/v1/execute          # Execute M2 code
GET    /api/v1/session/:id      # Get session state
POST   /api/v1/session          # Create new session
DELETE /api/v1/session/:id      # Destroy session

# Future endpoints
GET    /api/v1/examples         # Example notebooks
GET    /api/v1/docs             # API documentation
POST   /api/v1/notebooks        # Save notebook
GET    /api/v1/notebooks/:id    # Load notebook
```

**Request/Response Flow:**

1. **Request arrives** → Validate input, check rate limits
2. **Session check** → Create or retrieve session
3. **Enqueue computation** → Send to execution manager
4. **Execute M2 code** → Run in isolated environment
5. **Format response** → Parse output, render errors
6. **Return result** → JSON response with results/errors

**Security Layers:**
- Input sanitization (prevent code injection)
- Rate limiting (prevent abuse)
- Timeout enforcement (prevent infinite loops)
- Resource limits (CPU, memory, disk)
- Sandboxed execution (Docker isolation)

---

### 3. Computation Layer (M2 Execution)

**Responsibilities:**
- Execute M2 code safely
- Capture output and errors
- Enforce resource limits
- Handle timeouts gracefully

**Execution Model:**

```python
class ComputationExecutor:
    def execute(self, code: str, session_id: str) -> Result:
        # 1. Prepare environment
        container = self.get_or_create_container(session_id)
        
        # 2. Inject code with safety wrapper
        wrapped_code = self.wrap_with_safety(code)
        
        # 3. Execute with timeout
        result = container.run(
            wrapped_code,
            timeout=30,  # 30 seconds max
            memory_limit="512MB",
            cpu_quota=50000  # 50% CPU
        )
        
        # 4. Parse output
        return self.parse_result(result)
```

**Docker Container:**
```dockerfile
FROM alpine:latest

# Install M2 dependencies
RUN apk add --no-cache \
    macaulay2 \
    python3 \
    # ... other deps

# Set resource limits
RUN ulimit -t 30 -v 524288

# Run as non-root user
USER m2user

WORKDIR /workspace
```

**Safety Measures:**
- **Timeout**: Kill after 30 seconds
- **Memory Limit**: 512MB RAM per session
- **CPU Limit**: 50% of one core
- **Disk Quota**: 100MB temporary storage
- **Network**: Disabled (no external access)
- **System Calls**: Restricted (seccomp profile)

---

## Data Flow

### Typical Code Execution Flow

```
1. User types code in notebook cell
   ↓
2. Frontend: User presses Shift+Enter
   ↓
3. Frontend: Cell status → "running"
   ↓
4. Frontend: POST /api/v1/execute
   Body: { code: "R = QQ[x,y,z]", session_id: "abc123" }
   ↓
5. Backend: Validate request
   - Check rate limits
   - Sanitize input
   - Verify session
   ↓
6. Backend: Send to execution manager
   ↓
7. Executor: Create/reuse Docker container
   ↓
8. Executor: Run code in M2
   ↓
9. M2: Compute result
   ↓
10. Executor: Capture output
    - stdout: "PolynomialRing, 3 variables"
    - stderr: (empty)
    - exit_code: 0
   ↓
11. Backend: Format result
    {
      "success": true,
      "output": "PolynomialRing, 3 variables",
      "latex": "\\mathbb{Q}[x,y,z]",
      "execution_time": 0.23
    }
   ↓
12. Frontend: Update cell
    - Status → "success"
    - Render output with KaTeX
    - Show execution time
   ↓
13. User sees beautiful rendered result
```

---

## Session Management

### Session Lifecycle

```
┌─────────────┐
│   Create    │
│   Session   │
└──────┬──────┘
       │
       ↓
┌─────────────┐
│   Active    │ ←──────┐
│  (30 min)   │        │
└──────┬──────┘        │
       │               │
       │ Activity      │ Computation
       ↓               │
┌─────────────┐        │
│   Extend    │────────┘
│   Timeout   │
└──────┬──────┘
       │
       │ Timeout/Explicit Close
       ↓
┌─────────────┐
│   Cleanup   │
│   Destroy   │
└─────────────┘
```

**Session Storage (MVP):**
```python
# In-memory for MVP
sessions = {
    "session_id": {
        "created_at": datetime,
        "last_activity": datetime,
        "container_id": "docker_container_id",
        "variable_state": {...},  # M2 workspace
        "history": [...]  # Recent commands
    }
}
```

**Session Features:**
- **Persistence**: Variables persist across executions
- **Timeout**: Auto-cleanup after 30 minutes inactivity
- **Isolation**: Each session = separate Docker container
- **Cleanup**: Automatic container removal on timeout

---

## Security Architecture

### Defense in Depth

```
Layer 1: Network
├─ HTTPS only
├─ CORS policy
└─ Rate limiting (100 req/min per IP)

Layer 2: API Gateway
├─ Input validation (Pydantic models)
├─ SQL injection prevention (N/A - no DB)
├─ XSS prevention (output sanitization)
└─ CSRF protection (token-based)

Layer 3: Execution Environment
├─ Docker isolation
├─ Resource limits (CPU, RAM, disk)
├─ Timeout enforcement
├─ Restricted system calls (seccomp)
├─ No network access
└─ Non-root user

Layer 4: Code Execution
├─ Syntax validation before execution
├─ Dangerous functions blocked (file I/O to host)
├─ Output size limits (prevent memory bombs)
└─ Error message sanitization (no paths leaked)
```

### Threat Model

| Threat | Mitigation |
|--------|-----------|
| Infinite loops | 30-second timeout per execution |
| Memory bombs | 512MB RAM limit per container |
| Fork bombs | Container process limits |
| File system access | Read-only host, tmpfs for container |
| Network attacks | No network access from container |
| DDoS | Rate limiting, auto-scaling |
| Code injection | Input validation, sandboxed execution |

---

## Deployment Architecture

### Production Setup

```
┌──────────────────────────────────────────────────────┐
│                   Vercel CDN                          │
│              (Static Frontend)                        │
└────────────────────┬─────────────────────────────────┘
                     │
                     │ HTTPS
                     │
┌────────────────────┴─────────────────────────────────┐
│              Load Balancer / Proxy                    │
│              (Cloudflare / Render)                    │
└────────────────────┬─────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
┌───────┴────────┐      ┌────────┴────────┐
│  Backend API   │      │  Backend API    │
│   Instance 1   │      │   Instance 2    │
│                │      │                 │
│  ┌──────────┐ │      │  ┌──────────┐  │
│  │  Docker  │ │      │  │  Docker  │  │
│  │   Pool   │ │      │  │   Pool   │  │
│  └──────────┘ │      │  └──────────┘  │
└────────────────┘      └─────────────────┘
```

**Scaling Strategy:**
- **Frontend**: Globally distributed via CDN (instant)
- **Backend**: Horizontal scaling (add instances)
- **Containers**: Pool of warm containers per instance
- **Database** (future): Managed PostgreSQL with read replicas

---

## Monitoring & Observability

### Metrics to Track

**Performance:**
- API response time (p50, p95, p99)
- M2 execution time
- Container startup time

**Usage:**
- Active sessions
- Requests per minute
- Popular computations

**Errors:**
- Error rate by type
- Timeout frequency
- Failed container starts

**Resources:**
- CPU usage per container
- Memory usage per container
- Container pool size

### Tools
- **MVP**: Simple logging (stdout)
- **Production**: Prometheus + Grafana or vendor solutions (Render metrics)

---

## Future Enhancements

### Phase 2: User Accounts
```
┌─────────────┐
│   Add       │
│ PostgreSQL  │  → User accounts, saved notebooks
└─────────────┘
```

### Phase 3: Real-time Collaboration
```
┌─────────────┐
│   Add       │
│  WebSocket  │  → Live multi-user editing
│    + CRDT   │
└─────────────┘
```

### Phase 4: Offline Mode
```
┌─────────────┐
│   Add       │
│    WASM     │  → Client-side M2 execution
│   M2 Port   │
└─────────────┘
```

---

## Development Workflow

```
Developer
    ↓
  Git Push
    ↓
GitHub Actions
    ↓
┌──────────┬──────────┬──────────┐
│  Lint    │   Test   │  Build   │
└──────────┴──────────┴──────────┘
    ↓
┌─────────────────┐
│  Deploy Preview │ (on PR)
└─────────────────┘
    ↓ (on merge to main)
┌─────────────────┐
│  Deploy Prod    │
│  - Frontend     │ → Vercel
│  - Backend      │ → Render
└─────────────────┘
```

---

*Last updated: 2025-12-23*  
*Document owner: M2 for Newbies Team*
