require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const authRoutes = require('./app/routes/auth.js')
const productRoutes = require('./app/routes/product.js')
const { MONGOOSE_URL }= require('./app/config/db.config')

const app = express();

let corsOptions = {
    origin: '*',
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
    credentials: true
};

app.use(cors(corsOptions));

//parse requests of content-type: application/json
app.use(express.json());
app.use(bodyParser.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.urlencoded({ extended: true}));

//connect to moongosdb
mongoose.connect(MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log("Successfully connected to MongoDB.");

}).catch(err => {
    console.error("Connection error: ", err);
    process.exit();
});

//simple route
app.get('/', (req, res) => {
    res.json({message: 'Welcome to ChowBetter.'});
})

//API endpoints
app.use('/api/auth', authRoutes);
app.use('api/product',productRoutes )

let PORT = process.env.PORT;

if (PORT == null || PORT == '') {
    PORT = 8000;
}

app.listen(PORT, () => (
    console.log(`Server is running on port ${PORT}`)
));