<script>
document.addEventListener('DOMContentLoaded', function() {
  const chatMessages = document.getElementById('chat-messages');
  const userInput = document.getElementById('user-message');
  const sendBtn = document.getElementById('send-btn');

  // Webhook Configuration
  const WEBHOOK_URL = 'https://your-api-endpoint.com/webhook';
  const SESSION_ID = generateSessionId(); // Generate unique session ID

  // Send Message via Webhook
  async function sendToWebhook(message) {
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: SESSION_ID,
          message: message,
          timestamp: new Date().toISOString()
        })
      });
      return await response.json();
    } catch (error) {
      console.error('Webhook error:', error);
      return { error: true };
    }
  }

  // Receive Message from Webhook
  async function receiveFromWebhook() {
    // Implement webhook listener (via WebSocket or polling)
    // Example using polling (simplified):
    setInterval(async () => {
      const response = await fetch(`${WEBHOOK_URL}/get?session_id=${SESSION_ID}`);
      const data = await response.json();
      if (data.new_messages) {
        data.new_messages.forEach(msg => {
          addMessage(msg.content, 'ai');
        });
      }
    }, 3000); // Poll every 3 seconds
  }

  // UI Functions
  function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message mb-3`;
    messageDiv.innerHTML = `
      <div class="message-content ${sender === 'ai' ? 'bg-dark text-white' : 'bg-light'} p-3 rounded">
        ${content}
      </div>
      <small class="text-muted">Baru saja</small>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Event Listeners
  sendBtn.addEventListener('click', async () => {
    const message = userInput.value.trim();
    if (message) {
      addMessage(message, 'user');
      userInput.value = '';
      
      // Send to webhook
      const response = await sendToWebhook(message);
      if (response.error) {
        addMessage("Maaf, Bakul Tali sedang sibuk. Coba lagi nanti.", 'ai');
      }
    }
  });

  // Start listening for responses
  receiveFromWebhook();

  // Helper function
  function generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9);
  }
});
</script>