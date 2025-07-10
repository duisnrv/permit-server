// Імпортуємо Express
const express = require('express');
const app = express();

// Вбудований middleware для парсингу JSON-запитів
app.use(express.json());

// Приклад базового маршруту
app.get('/', (req, res) => {
  res.send('Сервер працює успішно! 🚀');
});

// Тестовий POST-маршрут
app.post('/data', (req, res) => {
  const data = req.body;
  console.log('Отримані дані:', data);
  res.json({ message: 'Дані отримано!', отримано: data });
});

// Використовуємо порт Render або 3000 для локального запуску
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порті ${PORT}`);
});


