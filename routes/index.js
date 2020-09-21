var express = require('express');
// var router = express.Router();

var app = express();

var StaticContentController = require("../controllers/v1/staticContent");
var RootController = require("../controllers/v1/RootController")
var UserSubscribeController = require("../controllers/v1/UserSubscribeController")

// route grouping
app.prefix('/api/v1/', function (router) {
    var v1 = require("./v1/common.route");
    router.use('/', v1);
});

app.get('/v1/api/get-token-details', StaticContentController.getTokenomicsDetails);
app.get('/v1/api/get-contact-details', StaticContentController.getContactDetails);
app.post('/v1/api/get-encrypted-key-details', RootController.getEncryptedPrivateKey);
app.post('/v1/api/get-decrypted-key-details', RootController.getDecryptedPrivateKey);
app.post('/v1/api/subscribe-user', UserSubscribeController.saveUserEmail)

app.use(function (req, res, next) {
    var err = new Error('Resource Not Found');
    err.status = 404;
    var resources = {};
    res.status(404);
    resources.status = err.status;
    resources.message = err.message;
    return res.json(resources);
});

module.exports = app;
