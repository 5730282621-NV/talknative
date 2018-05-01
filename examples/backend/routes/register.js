var express = require('express');
var router = express.Router();

router.post('/submit', function (req, res) {

  console.log(req.body)
  var params = {
    TableName: "chat_user",
    Key: {
      "username": req.body.username
    }
  };

  docClient.get(params, function (err, data) {

    console.log("docClient");
    let krtn = {
      "isOk": false,
      "msg": "There was an error processing your request!"
    };

    if (err) {
      console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("Get item succeeded:", JSON.stringify(data, null, 2));
      if (data['Item'] == null) {

        let regisParams = {
          TableName: "chat_user",
          Item: {
            "username": req.body.username,
            "password": req.body.password,
            "displayname": req.body.displayName,
            "name": req.body.firstName,
            "surname": req.body.LastName,
            "email": req.body.email,
            "profile_pic": req.body.profilePicName,
            "native_language": req.body.nativeLanguage
          }
        };

        docClient.put(regisParams, function (err, data) {
          if (err) {
            console.error("Unable to put item. Error JSON:", JSON.stringify(err, null, 2));
            return res.send(krtn);
          } else {
            console.log("Added item succeeded:", JSON.stringify(data, null, 2));
            krtn.msg = "Sign up successfully!";
            krtn.isOk = true;
            return res.send(krtn);
          }
        });
      } else {
        krtn.msg = "Sorry, That username has already been taken!";
        return res.send(krtn);
      }
    }


  });
});

router.post('/selectProfilePic', function (req, res) {

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

  S3.getSignedUrl('getObject', params, function (err, url) {
    console.log('the url of the image is', url);
    res.send(url);
  })
});

module.exports = router;
