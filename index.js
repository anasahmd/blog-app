import express from 'express';
import dotenv from 'dotenv';
import configureDB from './config/db.js';
dotenv.config();
const PORT = process.env.PORT || 3636;

const app = express();
configureDB();

app.use(express.json());

app.get('/', (req, res) => {
	res.json('Hello World!');
});

app.listen(PORT, () => {
	console.log('Listening on PORT: ' + PORT);
});
