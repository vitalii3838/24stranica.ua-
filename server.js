const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware ��� ��������� ������ ���� � JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ��� ������������ � ������ ��������������
const adminUsername = "admin";
const adminPasswordHash = bcrypt.hashSync("password123", 10);

// �������� ������������ � ������ � ������ (��� ��������)
let comments = [];
let likes = 0;

// ������� ��� �����������
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === adminUsername && bcrypt.compareSync(password, adminPasswordHash)) {
        res.json({ success: true, message: '�������� ����' });
    } else {
        res.status(401).json({ success: false, message: '�������� ��� ������������ ��� ������!' });
    }
});

// ������� ��� ���������� ��������
app.post('/save-content', (req, res) => {
    const { content } = req.body;
    console.log("����������� �������:", content);
    res.json({ success: true, message: '������� ��������!' });
});

// ������� ��� ��������� ������������ � ������
app.get('/comments', (req, res) => {
    res.json({ comments, likes });
});

// ������� ��� ���������� �����������
app.post('/comments', (req, res) => {
    const { comment } = req.body;
    comments.push(comment);
    res.json({ success: true, comments });
});

// ������� ��� ���������� �����
app.post('/like', (req, res) => {
    likes++;
    res.json({ success: true, likes });
});

// ������������ ����������� ������ (HTML, CSS, �����������)
app.use(express.static(path.join(__dirname, 'public')));

// ������ ������� �� ��������� �����
app.listen(PORT, () => {
    console.log(`������ ������� �� http://localhost:${PORT}`);
});