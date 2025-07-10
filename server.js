const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Головна сторінка
app.get('/', (req, res) => {
  res.send('✅ Головна сторінка працює');
});

// Статус сервера
app.get('/status', (req, res) => {
  res.json({ status: 'Сервер працює ✅', time: new Date().toISOString() });
});

// Збереження підпису
app.post('/api/saveSignature', (req, res) => {
  const signatureData = req.body;

  const fileName = `signature_${Date.now()}.json`;
  const filePath = path.join(__dirname, fileName);

  fs.writeFile(filePath, JSON.stringify(signatureData, null, 2), (err) => {
    if (err) {
      console.error('❌ Помилка при збереженні файлу:', err);
      return res.status(500).json({ error: 'Помилка при збереженні' });
    }
    console.log('✅ Дані збережено у файл:', fileName);
    res.json({ message: 'Дані збережено' });
  });
});

// Отримати всі підписи
app.get('/signatures', (req, res) => {
  const files = fs.readdirSync(__dirname).filter(name => name.startsWith('signature_'));
  const data = files.map(filename => {
    const content = fs.readFileSync(path.join(__dirname, filename), 'utf-8');
    return JSON.parse(content);
  });
  res.json(data);
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на порті ${PORT}`);
});
