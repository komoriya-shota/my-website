const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3001;

// MongoDB接続
mongoose.connect('mongodb://127.0.0.1:27017/crowdfunding', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// ミドルウェア設定
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// スキーマとモデル定義
const donationSchema = new mongoose.Schema({
  date: String,
  donor: String,
  amount: String
});

const contactSchema = new mongoose.Schema({
  date: String,
  name: String,
  email: String,
  message: String
});

const Donation = mongoose.model('Donation', donationSchema);
const Contact = mongoose.model('Contact', contactSchema);

// ルート定義
app.post('/api/donations', (req, res) => {
  const newDonation = new Donation({
    date: new Date().toLocaleString(),
    donor: req.body.name,
    amount: req.body.amount
  });

  newDonation.save()
    .then(() => res.json({ msg: 'Donation added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this donation' }));
});

app.post('/api/contacts', (req, res) => {
  const newContact = new Contact({
    date: new Date().toLocaleString(),
    name: req.body.name,
    email: req.body.email,
    message: req.body.message
  });

  newContact.save()
    .then(() => res.json({ msg: 'Contact added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this contact' }));
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
