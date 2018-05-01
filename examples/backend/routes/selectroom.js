var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/createRoom', function(req,res){
    
    for(i=0;i<4;i++){
        let chat_room_id='EN0'+(i+1);
        let chat_room_name='';
        let language = 'English';
        switch(i){
            case 0: 
                chat_room_name = 'Beginner';
                break;
            case 1: 
                chat_room_name = 'Intermediate';
                break;
            case 2: 
                chat_room_name = 'Upper Intermediate';
                break;
            case 3: 
                chat_room_name = 'Advanced';
                break;
        }
        chat_room_name = chat_room_name.concat(' English Conversation');
        
        var params = {
            TableName : "chat_room",
            Item : {
                chat_room_id: chat_room_id,
                chat_room_name: chat_room_name,
                language:language,
                n_active_user: 0
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
                
            }
        });
    }
    return res.json({
        result: true
    })
});

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
            return res.json(data.Items.sort((function(a,b){return(a.chat_room_id.localeCompare(b.chat_room_id))})));
        }
    })
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
