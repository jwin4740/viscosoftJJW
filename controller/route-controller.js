// Requiring express
var express = require("express");
var db = require("../models")
var parishArray = [];
// constructor Function for parish

function Parish(state, name, address, cityStateZip, priest, founded, website, manager, phone, photoUrl) {
    this.state = state;
    this.name = name;
    this.address = address;
    this.priest = "Pastor: " + priest;
    this.cityState = cityState;
    this.founded = "founded" + founded;
    this.website = website;
    this.manager = manager;
    this.phone = phone;
    this.photoUrl = photoUrl;

}


var sqlDataArray = [];


db.parishes.findAll({
    where: {
        STATE: "Illinois"
    },
    raw: true
}).then(function (data) {

});


// setting router
var router = express.Router();

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {

    res.render("home");

});

router.get("/parishes/:state", function (req, res) {
    var state = req.params.state;
    var info = [];
    db.parishes.findAll({
        where: {
            STATE: state
        },
        raw: true
    }).then(function (data) {

        res.render("chapter", {
            parish: data,
            state : state

        });
    });



});




// Export routes for server.js to use.
module.exports = router;