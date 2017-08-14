var express = require("express");

var exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'jwin4740@gmail.com',
        pass: '47bughouse'
    }
});

// setup email data with unicode symbols
const mailOptions = {
    from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
    to: 'annwinkle@yahoo.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

var bodyParser = require("body-parser");
var path = require("path");
var app = express();

var port = process.env.PORT || 8080;
var db = require("./models");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
    type: "application/vnd.api+json"
}));

app.use(express.static(path.join(__dirname, "./public")));
// require("./routes/api-routes.js")(app);
// require("./routes/html-routes.js")(app);

app.engine('handlebars', exphbs({
    defaultLayout: 'main'

}));
app.set('view engine', 'handlebars');

var routes = require("./controller/route-controller.js");
app.use("/", routes);




db.sequelize.sync({
    force: false
}).then(function () {
    app.listen(port, function () {
        console.log("App listening on port " + port);
        
    });
   
});




// function sendIt() {
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message %s sent: %s', info.messageId, info.response);
//     });

// }