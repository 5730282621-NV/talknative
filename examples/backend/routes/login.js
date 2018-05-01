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
                "isOk": false,
                "username": ""
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

router.post('/test', function (req, res) {

    var AWS3 = require("aws-sdk");
    env = process.env;

    AWS3.config.update({
        region: "ap-southeast-1",
        accessKeyId: env.S3_KEY,
        secretAccessKey: env.S3_SECRET,
        endpoint: "s3.ap-southeast-1.amazonaws.com"
    });

    var S3 = new AWS3.S3();

    var params = {
        Bucket: 'talknative',
        Key: req.body.fileName
    };

    S3.getSignedUrl('getObject', params, function(err, url){
        console.log('the url of the image is', url);
        res.send(url);
    })
});

module.exports = router;