var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/createRoom', function(req,res){
    var params = {
        TableName : "chat_room",
        Item : {
            chat_room_id:'TH02',
            chat_room_name:'Intermediate Thai Conversation',
            language:'Thai',
            n_active_user: 3
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
            return res.json(params.Item)
        }
    });

})

router.get('/getAllRoom', function(req, res,) {
    var params = { TableName : "chat_room"};
    docClient.scan(params,function(err,data){
        if (err) {
	        console.error("Unable to get item. Error JSON:", JSON.stringify(err, null, 2));
			return res.json({
				result: false
		    })
        }
        else{
            console.log("Get item succeeded:", JSON.stringify(data, null, 2));
            return res.json(data.Items);
            
        }
    })

    //   res.send([{
//     chat_room_id:'TH01',
//     chat_room_name:'thailanddd',
//     language:'Thai',
//     n_active_user: 8
//   },
//   {
//     chat_room_id:'TH02',
//     chat_room_name:'thailanddd 2',
//     language:'Thai',
//     n_active_user: 6
//   },
//   {
//     chat_room_id:'KR01',
//     chat_room_name:'All I wanna do, Wanna one',
//     language:'Korean',
//     n_active_user: 11
//   },
//   {
//     chat_room_id:'KR02',
//     chat_room_name:'Saranghaeee',
//     language:'Korean',
//     n_active_user: 8
//   },
//   {
//     chat_room_id:'JP01',
//     chat_room_name:'Japan Today',
//     language:'Japan',
//     n_active_user: 6
//   },
//   {
//     chat_room_id:'end',
//     chat_room_name:'end',
//     language:'end'
//   }]);
});

router.post('/getUserProfile', function(req,res){
    var username = req.body.username;
    console.log(username);
    var params =  {
		TableName : "chat_user",
		Key : {
			"username": username
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
            userProfile = data['Item'];
            if(userProfile == null){
                return res.json({
                    result: null
                })
            }
            return res.json({
                username: userProfile.username,
                displayname: userProfile.displayname,
                native_language: userProfile.native_language,
                profile_pic: userProfile.profile_pic
            });
	    }
	});

})

router.post('/EnterChatRoom', function(req,res){
    var username = req.body.username;
    var chat_room_id = req.body.chat_room_id;
    var params =  {
		TableName : "chat_session",
		Key : {
            "username": username,
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
            if(data.Item==null){
                console.log("enter new room");
                var params = {
                    TableName : "chat_room",
                    Key: {
                        "chat_room_id": chat_room_id
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
                            last_msg_id =  item.last_msg_id;
                            var params = {
                                TableName : "chat_session",
                                Item : {
                                    "chat_room_id": chat_room_id,
                                    "username": username,
                                    "last_seen_msg_id": last_msg_id
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
                                    return res.json(params.Item)
                                }
                            });
                        }
                        else{

                            return res.json({
                                result: false
                            })
                        }
                    }
                });   
            }
            else{
                console.log("enter previous room")
                return res.json(data.Item)
            }
	    }
	});

})




module.exports = router;
