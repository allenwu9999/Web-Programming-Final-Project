// use require instead?
import express from 'express'
import cors from 'cors'
import routes from './routes'
import mongoose from 'mongoose'
import morgan from 'morgan';
// import bodyParser from 'body-parser';

import guessRoute from './routes/index';

require('dotenv').config();
const app = express();

// define db
const dboptions = {
	useNewUrlParser: true,
	useCreateIndex: true,
	auto_reconnect: true,
	useUnifiedTopology: true,
	poolSize: 10
};
if (!process.env.MONGO_URL) {
	console.error('Missing MONGO_URL!!!');
	process.exit(1);
}

mongoose.connect(process.env.MONGO_URL, dboptions);
const db = mongoose.connection;

db.on('error', (error) => {
	console.error(error);
});

db.once('open', () => {
	console.log('MongoDB connected!');
});

// init middleware

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.use(express.json());

// parse body params and attache them to req.body
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

// HTTP request logger middleware for node.js
app.use(morgan('dev'));

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Allow-Credentials', 'true');
	next();
});

// define routes
app.use('/api/guess', guessRoute);
const port = process.env.PORT || 4000;

// routes(app)

app.listen(port, () => {
	console.log(`Server is up on port ${port}.`);
})
