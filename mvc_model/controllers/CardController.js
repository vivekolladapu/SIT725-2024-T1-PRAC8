const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const Card = require('../models/model');
const url = "mongodb+srv://vivekolladapu5:vivek12345@cluster0.b1rc26m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = 'Modal_form_data';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });



exports.getCards = async (req, res) => {
    try {
        const cards = await Card.find();
        console.log(cards);
        res.status(200).json(cards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.submitForm = async (req, res) => {
    try {
        // await collection.insertOne(req.body);
        const { name, image_url, email } = req.body;
        const newCard = new Card({ name, image_url, email });
        await newCard.save();
        console.log('Data inserted');
        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
