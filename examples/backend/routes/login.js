var express = require('express');
var router = express.Router();

router.post('/submit', function(req, res) {
    if (req.body.password == "kee") {
        res.send({
            "username": req.body.username
        });
    }
});

module.exports = router;