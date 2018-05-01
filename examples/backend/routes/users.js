var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/get_info', function (req,res) {
	var username = req.body.username;
	var params = {
		TableName : "chat_user",
	    Key: {"username":username}
	};
	console.log(username)
	docClient.get(params, function(err, data) {
	    if (err) {
	        console.log("Unable to get item. Error:", JSON.stringify(err, null, 2));
	        return res.json({
				result: false
		    })
	    } else {
	        console.log("Get item succeeded.",data);
	        console.log(data['Item']['native_language']);
	        return res.json({
				result: true,
				displayname: data['Item']['displayname'],
				native_lang: data['Item']['native_language']
		    })
	    }
	});

});

module.exports = router;
