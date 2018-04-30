var express = require('express');
var router = express.Router();

router.post('/submit', function (req, res) {

    var params = {
        TableName: "chat_user",
        Key: {
            "username": req.body.username
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
            return res.json({
                result: false,
                msg_id: 0
            })
        } else {
            console.log("Get item succeeded:", JSON.stringify(data, null, 2));
            let krtn = {
                "isOk": false,
                "username": ""
            };
            if (data['Item'] != null) {
                if (data['Item']['password'] == req.body.password) {
                    krtn.isOk = true;
                    krtn.username = data['Item']['username'];
                }
            }
            res.send(krtn);
        }
    });


});

module.exports = router;