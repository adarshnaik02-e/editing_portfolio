// ===== CHATBOT =====
const chatbotBubble = document.getElementById('chatbotBubble');
const chatbotBox = document.getElementById('chatbotBox');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const quickReplies = document.getElementById('quickReplies');

// Toggle chat open/close
chatbotBubble.addEventListener('click', () => {
  chatbotBox.classList.toggle('open');
  document.querySelector('.chat-notify').style.display = 'none';
});
chatbotClose.addEventListener('click', () => chatbotBox.classList.remove('open'));

// Bot responses
const responses = {
  'hire': {
    text: "Great! Adarsh is available for new projects. Here's what you can do next:",
    extra: 'manager'
  },
  'pricing': {
    text: "Pricing depends on the project type and length:\n\n💡 Short Reels (30-60s): Starting from ₹500\n🎬 YouTube Videos (5-15 min): Starting from ₹1,500\n📺 Brand Commercials: Starting from ₹3,000\n\nFor exact quotes, connect with the manager:"
    , extra: 'manager'
  },
  'timeline': {
    text: "Typical turnaround times:\n\n⚡ Short Reels: 1-2 days\n🎬 YouTube Videos: 3-5 days\n📺 Brand Videos: 5-7 days\n\nRush delivery available! Contact the manager for details:"
    , extra: 'manager'
  },
  'manager': {
    text: "Sure! You can directly reach Adarsh's manager Sunita Shanbhag. She handles all payments, project discussions, and client communication:",
    extra: 'manager'
  },
  'contact': {
    text: "You can reach us through:\n\n📧 Adarsh: naikadarsh654@gmail.com\n📧 Manager: sunitavshanbhag7@gmail.com\n\nOr click below to email the manager directly:",
    extra: 'manager'
  },
  'hello': { text: "Hello! 👋 How can I help you today? Feel free to ask about pricing, timelines, or connecting with our manager." },
  'hi': { text: "Hi there! 😊 I'm here to help. What would you like to know about Adarsh's video editing services?" },
  'thanks': { text: "You're welcome! 😊 Feel free to reach out anytime. We'd love to work with you!" },
  'default': { text: "I'm not sure about that, but I can connect you with our manager Sunita who can answer all your questions:", extra: 'manager' }
};

function getResponse(msg) {
  const lower = msg.toLowerCase();
  if (lower.includes('hire') || lower.includes('work') || lower.includes('project')) return responses['hire'];
  if (lower.includes('price') || lower.includes('rate') || lower.includes('cost') || lower.includes('charge') || lower.includes('fee')) return responses['pricing'];
  if (lower.includes('time') || lower.includes('long') || lower.includes('days') || lower.includes('deadline') || lower.includes('fast')) return responses['timeline'];
  if (lower.includes('manager') || lower.includes('sunita') || lower.includes('connect') || lower.includes('talk')) return responses['manager'];
  if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) return responses['contact'];
  if (lower.includes('hello') || lower.includes('hey')) return responses['hello'];
  if (lower.includes('hi')) return responses['hi'];
  if (lower.includes('thank')) return responses['thanks'];
  return responses['default'];
}

function addMessage(text, sender) {
  const div = document.createElement('div');
  div.className = `chat-msg ${sender}`;
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = text.replace(/\n/g, '<br>');
  div.appendChild(bubble);
  chatbotMessages.appendChild(div);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  return div;
}

function addManagerCard() {
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.innerHTML = `
    <div class="manager-card">
      <h4>👩‍💼 Sunita Shanbhag — Manager</h4>
      <p>Handles all payments, project discussions & client communication.</p>
      <a href="mailto:sunitavshanbhag7@gmail.com?subject=Project Inquiry — Adarsh Naik Portfolio">
        <i class="fas fa-envelope"></i> Email Manager
      </a>
    </div>`;
  chatbotMessages.appendChild(div);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.id = 'typingIndicator';
  div.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
  chatbotMessages.appendChild(div);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function removeTyping() {
  const t = document.getElementById('typingIndicator');
  if (t) t.remove();
}

function sendMessage(text) {
  if (!text.trim()) return;

  // Hide quick replies after first message
  if (quickReplies) quickReplies.style.display = 'none';

  // Add user message
  addMessage(text, 'user');
  chatbotInput.value = '';

  // Show typing
  showTyping();

  setTimeout(() => {
    removeTyping();
    const resp = getResponse(text);
    addMessage(resp.text, 'bot');
    if (resp.extra === 'manager') {
      setTimeout(addManagerCard, 300);
    }
  }, 1000);
}

// Send on button click
chatbotSend.addEventListener('click', () => sendMessage(chatbotInput.value));

// Send on Enter key
chatbotInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage(chatbotInput.value);
});

// Quick reply buttons
document.querySelectorAll('.quick-btn').forEach(btn => {
  btn.addEventListener('click', () => sendMessage(btn.dataset.msg));
});
