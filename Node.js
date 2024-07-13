const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/crowdfunding', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const DonationSchema = new mongoose.Schema({
    name: String,
    email: String,
    returnName: String,
    price: Number,
    date: { type: Date, default: Date.now }
});

const Donation = mongoose.model('Donation', DonationSchema);

app.post('/saveDonationData', (req, res) => {
    const { name, email, returnName, price } = req.body;

    const newDonation = new Donation({
        name,
        email,
        returnName,
        price
    });

    newDonation.save()
        .then(() => res.status(200).json({ message: '支援が保存されました' }))
        .catch(error => res.status(500).json({ message: 'エラーが発生しました', error }));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
