const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const fileUpload = require('express-fileupload');
const indexRouter = require('./routes/index');
const db = require('./config/connection');
const createError = require('http-errors');


const app = express();
app.use(cors({
    origin: ['*'],
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/public', express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use('/', indexRouter);
app.use(bodyParser.json());
require('dotenv').config();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
app.post('/login', (req, res) => {
    userHelper.doLogin(req.body)
        .then((response) => {
            if (response.status) {
                const token = jwt.sign({
                    number: response.user.number,
                    role: response.user.role,
                    name: response.user.name,
                    id: response.user._id,
                }, jwtsecret, { expiresIn: '1d' });
                res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none' });
                res.json({ status: 'success', role: response.user.role });
            } else {
                res.json({ status: 'error', message: response.error });
            }
        })
        .catch((error) => {
            res.status(500).json({ status: 'error', message: 'An error occurred during login.' });
        });
});


const Port = process.env.PORT

db.connect((err) => {
    if (err)
        console.log('error ' + err);
    else
        app.listen(Port, () => {
            console.log(`Server is running at ${Port}`);
        });
    console.log("Database connected");
});
