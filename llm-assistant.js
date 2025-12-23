// M2 AI Assistant JavaScript
// Handles user interactions, message sending, and UI updates

// Constants
const MIN_RESPONSE_DELAY = 1000; // milliseconds
const MAX_ADDITIONAL_DELAY = 1000; // milliseconds
const MAX_INPUT_LENGTH = 2000; // characters
const INPUT_WARNING_THRESHOLD = 0.9; // show warning at 90% of max
const MAX_INPUT_HEIGHT = 120; // pixels

// State management
const state = {
    isOpen: false,
    messages: [],
    isLoading: false
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeAssistant();
    setupAutoResize();
});

function initializeAssistant() {
    // Load any saved conversation from sessionStorage
    const savedMessages = sessionStorage.getItem('m2-assistant-messages');
    if (savedMessages) {
        try {
            state.messages = JSON.parse(savedMessages);
            renderMessages();
        } catch (e) {
            console.error('Failed to load saved messages:', e);
        }
    }
    
    // Set up event listeners
    const input = document.getElementById('messageInput');
    if (input) {
        input.addEventListener('input', updateCharCount);
        input.addEventListener('input', autoResize);
    }
}

// Open/Close assistant
function openAssistant() {
    const container = document.querySelector('.assistant-container');
    const fab = document.querySelector('.fab');
    
    if (container && fab) {
        container.classList.add('open');
        fab.classList.add('hidden');
        state.isOpen = true;
        
        // Focus on input
        setTimeout(() => {
            const input = document.getElementById('messageInput');
            if (input) input.focus();
        }, 300);
    }
}

function closeAssistant() {
    const container = document.querySelector('.assistant-container');
    const fab = document.querySelector('.fab');
    
    if (container && fab) {
        container.classList.remove('open');
        fab.classList.remove('hidden');
        state.isOpen = false;
    }
}

// Handle message sending
function sendMessage(event) {
    if (event) {
        event.preventDefault();
    }
    
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message || state.isLoading) {
        return;
    }
    
    // Add user message
    addMessage('user', message);
    
    // Clear input
    input.value = '';
    updateCharCount();
    autoResize();
    
    // Show loading indicator
    showLoading();
    
    // Simulate AI response (in production, this would call an API)
    const delay = MIN_RESPONSE_DELAY + Math.random() * MAX_ADDITIONAL_DELAY;
    
    setTimeout(() => {
        const response = generateResponse(message);
        addMessage('assistant', response);
        hideLoading();
    }, delay); // Random delay between 1-2 seconds
}

// Send quick question
function sendQuickQuestion(question) {
    const input = document.getElementById('messageInput');
    if (input) {
        input.value = question;
        input.focus();
        // Optionally auto-send
        sendMessage();
    }
}

// Add message to chat
function addMessage(role, content) {
    const message = {
        role: role, // 'user' or 'assistant'
        content: content,
        timestamp: new Date().toISOString()
    };
    
    state.messages.push(message);
    saveMessages();
    renderMessage(message);
    scrollToBottom();
}

// Render a single message
function renderMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.role}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = message.role === 'assistant' ? '🤖' : '👤';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    // Parse content for code blocks and formatting
    content.innerHTML = parseMessageContent(message.content);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatMessages.appendChild(messageDiv);
}

// Render all messages
function renderMessages() {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    // Store welcome message content before clearing
    const welcomeMessage = chatMessages.querySelector('.assistant-message');
    const welcomeMessageClone = welcomeMessage ? welcomeMessage.cloneNode(true) : null;
    
    // Clear all messages
    chatMessages.innerHTML = '';
    
    // Re-add welcome message if it existed
    if (welcomeMessageClone) {
        chatMessages.appendChild(welcomeMessageClone);
    }
    
    // Render all saved messages
    state.messages.forEach(message => renderMessage(message));
}

// Parse message content for formatting (with basic XSS protection)
function parseMessageContent(content) {
    // Split content by backticks to separate code from text
    const parts = [];
    let currentText = '';
    let inCode = false;
    
    for (let i = 0; i < content.length; i++) {
        if (content[i] === '`') {
            if (inCode) {
                // End code block
                parts.push({ type: 'code', content: currentText });
                currentText = '';
                inCode = false;
            } else {
                // Start code block - save any text before it
                if (currentText) {
                    parts.push({ type: 'text', content: currentText });
                    currentText = '';
                }
                inCode = true;
            }
        } else {
            currentText += content[i];
        }
    }
    
    // Add any remaining content
    if (currentText) {
        parts.push({ type: inCode ? 'code' : 'text', content: currentText });
    }
    
    // Escape HTML helper
    const escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    };
    
    // Build the final HTML
    let result = parts.map(part => {
        if (part.type === 'code') {
            return `<code>${escapeHtml(part.content)}</code>`;
        } else {
            // Escape text and apply formatting
            let text = escapeHtml(part.content);
            // Convert newlines to <br>
            text = text.replace(/\n/g, '<br>');
            // Convert **bold** to <strong>
            text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
            return text;
        }
    }).join('');
    
    return result;
}

// Generate AI response (mock - in production, this would call an API)
function generateResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Pattern matching for common questions
    if (lowerMessage.includes('ring') || lowerMessage.includes('polynomial')) {
        return `To define a polynomial ring in Macaulay2, use this syntax:\n\n` +
               `<code>R = QQ[x,y,z]</code>\n\n` +
               `This creates a polynomial ring <code>R</code> over the rational numbers <code>QQ</code> ` +
               `with variables <code>x, y, z</code>.\n\n` +
               `You can also use other coefficient rings like:\n` +
               `• <code>ZZ</code> for integers\n` +
               `• <code>ZZ/p</code> for integers mod p\n` +
               `• <code>RR</code> for real numbers`;
    }
    
    if (lowerMessage.includes('groebner') || lowerMessage.includes('gröbner')) {
        return `A **Groebner basis** is a special generating set for an ideal that makes many ` +
               `computations easier.\n\n` +
               `To compute a Groebner basis:\n` +
               `<code>R = QQ[x,y,z]</code>\n` +
               `<code>I = ideal(x^2, xy, xz)</code>\n` +
               `<code>gb I</code>\n\n` +
               `The <code>gb</code> function returns the Groebner basis with respect to the default ` +
               `monomial order (usually graded reverse lexicographic).`;
    }
    
    if (lowerMessage.includes('resolution') || lowerMessage.includes('resolve')) {
        return `A **free resolution** expresses a module as the homology of a complex of free modules.\n\n` +
               `To compute a resolution:\n` +
               `<code>R = QQ[x,y,z]</code>\n` +
               `<code>I = ideal(x^2, xy, xz)</code>\n` +
               `<code>C = res I</code>\n\n` +
               `To see the Betti numbers:\n` +
               `<code>betti C</code>\n\n` +
               `This is fundamental in homological algebra and algebraic geometry!`;
    }
    
    if (lowerMessage.includes('error') || lowerMessage.includes('problem') || lowerMessage.includes('wrong')) {
        return `I'd be happy to help debug! Please share:\n\n` +
               `1. The code you're running\n` +
               `2. The error message you're seeing\n` +
               `3. What you were trying to accomplish\n\n` +
               `Common issues:\n` +
               `• **Undefined ring**: Make sure to define your ring first with <code>R = QQ[x,y,z]</code>\n` +
               `• **Type mismatch**: Check that your inputs match what the function expects\n` +
               `• **Syntax error**: Verify parentheses, commas, and brackets are balanced`;
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
        return `I'm here to help with Macaulay2! I can assist with:\n\n` +
               `📚 **Concepts**: Explain rings, ideals, modules, resolutions, etc.\n` +
               `💻 **Syntax**: Show you how to write M2 code\n` +
               `🐛 **Debugging**: Help fix errors and understand error messages\n` +
               `📖 **Examples**: Provide code examples for common tasks\n` +
               `🎓 **Learning**: Point you to resources and tutorials\n\n` +
               `Just ask me a specific question, and I'll do my best to help!`;
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        return `You're welcome! 😊 Feel free to ask if you have more questions. Happy computing!`;
    }
    
    // Default response
    return `Thanks for your question! While I'm a demonstration version, in production I would:\n\n` +
           `1. Analyze your question using an LLM\n` +
           `2. Search relevant M2 documentation\n` +
           `3. Provide helpful examples and explanations\n\n` +
           `For now, try asking about:\n` +
           `• Defining polynomial rings\n` +
           `• Computing Groebner bases\n` +
           `• Working with resolutions\n` +
           `• Debugging errors\n\n` +
           `Or use the quick action buttons below!`;
}

// Show/hide loading indicator
function showLoading() {
    state.isLoading = true;
    const loading = document.getElementById('loadingIndicator');
    const sendBtn = document.getElementById('sendBtn');
    
    if (loading) {
        loading.style.display = 'flex';
    }
    if (sendBtn) {
        sendBtn.disabled = true;
    }
}

function hideLoading() {
    state.isLoading = false;
    const loading = document.getElementById('loadingIndicator');
    const sendBtn = document.getElementById('sendBtn');
    
    if (loading) {
        loading.style.display = 'none';
    }
    if (sendBtn) {
        sendBtn.disabled = false;
    }
}

// Auto-resize textarea
function setupAutoResize() {
    const input = document.getElementById('messageInput');
    if (input) {
        autoResize.call(input);
    }
}

function autoResize(event) {
    // Get input element - either from event target or by ID
    let input;
    if (event && event.target) {
        input = event.target;
    } else if (this && this.tagName === 'TEXTAREA') {
        input = this;
    } else {
        input = document.getElementById('messageInput');
    }
    
    if (!input) return;
    
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, MAX_INPUT_HEIGHT) + 'px';
}

// Update character count
function updateCharCount() {
    const input = document.getElementById('messageInput');
    const counter = document.getElementById('charCount');
    
    if (input && counter) {
        const length = input.value.length;
        
        counter.textContent = `${length}/${MAX_INPUT_LENGTH}`;
        
        if (length > MAX_INPUT_LENGTH) {
            counter.style.color = 'var(--error-red)';
            input.value = input.value.substring(0, MAX_INPUT_LENGTH);
        } else if (length > MAX_INPUT_LENGTH * INPUT_WARNING_THRESHOLD) {
            counter.style.color = 'var(--warning-yellow)';
        } else {
            counter.style.color = 'var(--text-secondary)';
        }
    }
}

// Handle keyboard shortcuts
function handleKeyDown(event) {
    // Enter without Shift sends message
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
    
    // Escape closes assistant
    if (event.key === 'Escape') {
        closeAssistant();
    }
}

// Scroll to bottom of chat
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    if (chatMessages) {
        setTimeout(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 100);
    }
}

// Save messages to sessionStorage
function saveMessages() {
    try {
        sessionStorage.setItem('m2-assistant-messages', JSON.stringify(state.messages));
    } catch (e) {
        console.error('Failed to save messages:', e);
    }
}

// Clear conversation
function clearConversation() {
    if (confirm('Clear all messages? This cannot be undone.')) {
        state.messages = [];
        sessionStorage.removeItem('m2-assistant-messages');
        renderMessages();
    }
}

// Export conversation
function exportConversation() {
    const text = state.messages
        .map(msg => `${msg.role === 'user' ? 'You' : 'Assistant'}: ${msg.content}`)
        .join('\n\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `m2-conversation-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// Keyboard shortcut: Cmd/Ctrl + K to open assistant
document.addEventListener('keydown', (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        if (state.isOpen) {
            closeAssistant();
        } else {
            openAssistant();
        }
    }
});
