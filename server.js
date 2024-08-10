const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware для обработки данных форм и JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Имя пользователя и пароль администратора
const adminUsername = "admin";
const adminPasswordHash = bcrypt.hashSync("password123", 10);

// Хранение комментариев и лайков в памяти (для простоты)
let comments = [];
let likes = 0;

// Маршрут для авторизации
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === adminUsername && bcrypt.compareSync(password, adminPasswordHash)) {
        res.json({ success: true, message: 'Успешный вход' });
    } else {
        res.status(401).json({ success: false, message: 'Неверное имя пользователя или пароль!' });
    }
});

// Маршрут для сохранения контента
app.post('/save-content', (req, res) => {
    const { content } = req.body;
    console.log("Сохраненный контент:", content);
    res.json({ success: true, message: 'Контент сохранен!' });
});

// Маршрут для получения комментариев и лайков
app.get('/comments', (req, res) => {
    res.json({ comments, likes });
});

// Маршрут для добавления комментария
app.post('/comments', (req, res) => {
    const { comment } = req.body;
    comments.push(comment);
    res.json({ success: true, comments });
});

// Маршрут для добавления лайка
app.post('/like', (req, res) => {
    likes++;
    res.json({ success: true, likes });
});

// Обслуживание статических файлов (HTML, CSS, изображения)
app.use(express.static(path.join(__dirname, 'public')));

// Запуск сервера на указанном порту
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});