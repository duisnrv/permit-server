const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>Форма для підпису</h2>
        <form id="signatureForm">
          <input type="text" name="username" placeholder="Ваше ім'я" required />
          <input type="text" name="signature" placeholder="Ваш підпис" required />
          <button type="submit">Надіслати</button>
        </form>
        <div id="result"></div>
        <script>
          document.getElementById('signatureForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = e.target.username.value;
            const signature = e.target.signature.value;
            const res = await fetch('/api/saveSignature', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ username, signature })
            });
            const result = await res.json();
            document.getElementById('result').innerText = result.message;
          });
        </script>
      </body>
    </html>
  `);
});

app.post('/api/saveSignature', (req, res) => {
  const { username, signature } = req.body;
  if (!username || !signature) {
    return res.status(400).json({ message: 'Не всі дані заповнені' });
  }

  const filePath = path.join(__dirname, 'signatures.json');
  let data = [];

  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath);
    data = JSON.parse(raw);
  }

  data.push({ username, signature, timestamp: new Date().toISOString() });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  res.json({ message: 'Підпис збережено успішно!' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});

