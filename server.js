const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/saveSignature', (req, res) => {
  const signatureData = req.body;

  // Зберігаємо в файл (наприклад, з таймстампом)
  const fileName = `signature_${Date.now()}.json`;
  const filePath = path.join(__dirname, fileName);

  fs.writeFile(filePath, JSON.stringify(signatureData, null, 2), (err) => {
    if (err) {
      console.error('Помилка при збереженні файлу:', err);
      return res.status(500).json({ error: 'Помилка при збереженні' });
    }
    console.log('Дані збережено у файл:', fileName);
    res.json({ message: 'Дані збережено' });
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});
