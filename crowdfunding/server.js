const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();
const port = 3000;

const STORES_API_KEY = 'your_stores_api_key';
const STORES_SECRET = 'your_stores_secret';

// MongoDB接続
mongoose.connect('mongodb://127.0.0.1:27017/crowdfunding', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// ミドルウェア設定
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // 静的ファイルの提供

// スキーマとモデル定義
const donationSchema = new mongoose.Schema({
  date: String,
  donor: String,
  amount: String,
  return: String,
  email: String
});

const Donation = mongoose.model('Donation', donationSchema);

// 支援の処理
app.post('/api/donations', async (req, res) => {
  const { name, email, return: returnItem, amount } = req.body;
  console.log('Received request:', req.body);

  // STORES決済APIを呼び出して支払いを処理
  try {
    const response = await axios.post('https://api.stores.jp/v1/payments', {
      amount,
      currency: 'JPY',
      capture: true,
      description: `Support for ${returnItem}`,
      customer: {
        email: email,
        name: name
      }
    }, {
      auth: {
        username: STORES_API_KEY,
        password: STORES_SECRET
      }
    });

    console.log('Payment response:', response.data);

    if (response.data.status === 'succeeded') {
      // 支払い成功の場合、寄付情報を保存
      const newDonation = new Donation({
        date: new Date().toLocaleString(),
        donor: name,
        amount: amount,
        return: returnItem,
        email: email
      });

      newDonation.save()
        .then(() => res.json({ msg: 'Donation added and payment succeeded' }))
        .catch(err => {
          console.error('Error saving donation:', err);
          res.status(400).json({ error: 'Unable to save donation' });
        });
    } else {
      console.error('Payment failed:', response.data);
      res.status(400).json({ error: 'Payment failed' });
    }
  } catch (error) {
    console.error('Payment processing error:', error.message);
    res.status(500).json({ error: 'Payment processing error', details: error.message });
  }
});

// ルートハンドラ
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
