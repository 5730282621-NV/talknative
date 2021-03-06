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
	       	console.log("msg_id",msg_id);
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
	        if(data['Items'].length > 0){
		        return res.json({
					result: true,
					msg_list: data['Items']
			    })
			}
			else{
		        return res.json({
					result: false
			    })				
			}
	    }
	});

});

router.post('/delete_session', function (req,res) {
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

router.post('/get_last_seen', function (req,res) {
	var chat_room_id = req.body.chat_room_id;
  	var username = req.body.username;
	var params = {
		TableName : "chat_session",
	    Key: {
	    	"chat_room_id": chat_room_id,
	    	"username": username
	    }

	};

	docClient.get(params, function(err, data) {
	    if (err) {
	        console.log("Unable to get item. Error:", JSON.stringify(err, null, 2));
	        return res.json({
				result: false
		    })
	    } else {
	        console.log("Get item succeeded.");
	        item = data['Item']
	        if(item != null){
		        return res.json({
		        	last_seen_msg_id: item['last_seen_msg_id'],
					result: true
			    })
	    	}
	    	else{
		        return res.json({
					result: false
			    })
	    	}
	    }
	});

});
router.post('/update_last_seen', function (req,res) {
	var chat_room_id = req.body.chat_room_id;
  	var username = req.body.username;
  	var last_seen_msg_id = req.body.last_seen_msg_id;
	var params = {
		TableName : "chat_session",
	    Key: {
	    	"chat_room_id": chat_room_id,
	    	"username": username,
	    },
	    UpdateExpression: "set last_seen_msg_id = :l",
	    ExpressionAttributeValues:{
	        ":l":last_seen_msg_id
	    }
	};

	docClient.update(params, function(err, data) {
	    if (err) {
	        console.log("Unable to update item. Error:", JSON.stringify(err, null, 2));
	        return res.json({
				result: false
		    })
	    } else {
	    	return res.json({
					result: true
			    })
	    }
	});

});
router.post('/update_last_msg_id', function (req,res) {
	var chat_room_id = req.body.chat_room_id;
	var params = {
		TableName : "chat_room",
	    Key: {
	    	"chat_room_id": chat_room_id
	    },
	    UpdateExpression: "set last_msg_id = last_msg_id + :val",
	    ExpressionAttributeValues:{
	        ":val":1
	    },
	};
	docClient.update(params, function(err, data) {
	    if (err) {
	        console.log("Unable to update item. Error:", JSON.stringify(err, null, 2));
	        return res.json({
				result: false
		    })
	    } else {
	    	return res.json({
					result: true
			    })
	    }
	});

});
router.post('/delete_n_user', function (req,res) {
	var chat_room_id = req.body.chat_room_id;
	var params = {
		TableName : "chat_room",
	    Key: {
	    	"chat_room_id": chat_room_id
	    },
	    UpdateExpression: "set n_active_user = n_active_user - :val",
	    ExpressionAttributeValues:{
	        ":val":1
	    },
	};

	docClient.update(params, function(err, data) {
	    if (err) {
	        console.log("Unable to update item. Error:", JSON.stringify(err, null, 2));
	        return res.json({
				result: false
		    })
	    } else {
	    	return res.json({
					result: true
			    })
	    }
	});

});
module.exports = router;
