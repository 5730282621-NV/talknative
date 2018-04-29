var express = require('express');
var router = express.Router();



/* GET home page. */

router.post('/get_msg_id', function (req, res) {
  // res.render('index', { title: 'Express' });
  	var chat_room_id = req.body.chat_room_id
	var params = {
		TableName : "chat_room",
		Key : {
			"chat_room_id": chat_room_id
		}
	};
	
	docClient.get(params, function(err, data) {
	    if (err) {
	        console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
			return res.json({
				result: false
		    })
	    } else {
	        console.log("Get item succeeded:", JSON.stringify(data, null, 2));
	        msg_id = data['Item']['last_msg_id']+1;
			return res.json({
				result: true,
		    	msg_id: msg_id
		    })
	    }
	});

});

router.post('/send_msg', function (req, res) {
	var chat_room_id = req.body.chat_room_id
  	var msg = req.body.msg;
  	var timestamp = (new Date()).toISOString();
  	var username = req.body.username;
  	var msg_id = req.body.msg_id;
	var params = {
		TableName : "chat_message",
		Item : {
			"chat_room_id": chat_room_id,
			"msg_id": msg_id,
			"msg": msg,
			"timestamp": timestamp,
			"username": username
		}
	};
	docClient.put(params, function(err, data) {
		if (err) {
		    console.error("Unable to put item. Error JSON:", JSON.stringify(err, null, 2));
			return res.json({
		        result: false
		    })
		} else {
		    console.log("Added item succeeded:", JSON.stringify(data, null, 2));
			return res.json({
		    	result: true
		    })
		}
	});

 });

router.post('/get_new_msg', function (req,res) {
	var chat_room_id = req.body.chat_room_id;
  	var msg_id = req.body.msg_id;
	var params = {
		TableName : "chat_message",
	    KeyConditionExpression: "chat_room_id = :chat_room_id and msg_id > :msg_id",
	    ExpressionAttributeValues: {
	        ":chat_room_id":chat_room_id,
	        ":msg_id": msg_id
	    }
	};

	docClient.query(params, function(err, data) {
	    if (err) {
	        console.log("Unable to query. Error:", JSON.stringify(err, null, 2));
	        return res.json({
				result: false
		    })
	    } else {
	        console.log("Query succeeded.");
	        return res.json({
				result: true,
				msg_list: data['Items']
		    })
	    }
	});

});

router.post('/leave_room', function (req,res) {
	var chat_room_id = req.body.chat_room_id;
  	var username = req.body.username;
	var params = {
		TableName : "chat_session",
	    Key: {
	    	"chat_room_id": chat_room_id,
	    	"username": username
	    }

	};

	docClient.delete(params, function(err, data) {
	    if (err) {
	        console.log("Unable to delete. Error:", JSON.stringify(err, null, 2));
	        return res.json({
				result: false
		    })
	    } else {
	        console.log("Deleted item succeeded.");
	        return res.json({
				result: true
		    })
	    }
	});

});
module.exports = router;
