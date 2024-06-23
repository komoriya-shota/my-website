const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // 静的ファイルの提供

let supportData = [];
let contactMessages = [];

app.post('/support', (req, res) => {
    const { amount, name, email, message } = req.body;
    supportData.push({ amount, name, email, message });
    console.log(`支援額: ${amount}, 名前: ${name}, メール: ${email}, メッセージ: ${message}`);
    res.json({ status: 'success', message: '支援が送信されました。ありがとうございます！' });
});

app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;
    contactMessages.push({ name, email, message });
    console.log(`名前: ${name}, メール: ${email}, メッセージ: ${message}`);
    res.json({ status: 'success', message: 'メッセージが送信されました。ありがとうございます！' });
});

app.get('/support-data', (req, res) => {
    res.json(supportData);
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
