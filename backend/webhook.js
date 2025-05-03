// Contoh sederhana endpoint webhook
const express = require('express');
const app = express();
app.use(express.json());

const sessions = {};

app.post('/webhook', (req, res) => {
  const { session_id, message } = req.body;
  
  // Simpan pesan user
  if (!sessions[session_id]) {
    sessions[session_id] = [];
  }
  sessions[session_id].push({ sender: 'user', content: message });

  // Proses pesan (contoh sederhana)
  let response;
  if (message.includes('harga')) {
    response = "Produk paracord kami mulai dari Rp 25.000/meter. Mau lihat katalog?";
  } else {
    response = "Pesan diterima! Tim kami akan segera merespons.";
  }

  // Simpan pesan AI
  sessions[session_id].push({ sender: 'ai', content: response });

  res.json({ success: true });
});

app.get('/webhook/get', (req, res) => {
  const { session_id } = req.query;
  res.json({ 
    new_messages: sessions[session_id]?.filter(msg => msg.sender === 'ai') || []
  });
});

app.listen(3000, () => console.log('Webhook running on port 3000'));