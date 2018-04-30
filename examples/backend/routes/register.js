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

module.exports = router;
