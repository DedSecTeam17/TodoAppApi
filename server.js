var express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoListModel'), //created model loading here
    bodyParser = require('body-parser');



require('dotenv').config()

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.listen(process.env.PORT || 5000, () => {
    mongoose.set('useFindAndModify', false);
    mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
});









const db = mongoose.connection;


db.on('error', (error) => {
    console.log(error)
});


// if we have connection opened then require route file
db.on('open', () => {
    var routes = require('./api/routes/todoListRoutes'); //importing route
    routes(app); //register the route

    app.use(function(req, res) {
        res.status(404).send({ url: req.originalUrl + ' not found' })
    });
    console.log('todo list RESTful API server started on: ' + port);


    console.log(`server start on port ---> ${process.env.PORT}`);
});
