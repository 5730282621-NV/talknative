var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/getAllRoom', function(req, res) {
  res.send([{
    chat_room_id:'TH01',
    chat_room_name:'thailanddd',
    language:'Thai',
    n_active_user: 8
  },
  {
    chat_room_id:'TH02',
    chat_room_name:'thailanddd 2',
    language:'Thai',
    n_active_user: 6
  },
  {
    chat_room_id:'KR01',
    chat_room_name:'All I wanna do, Wanna one',
    language:'Korean',
    n_active_user: 11
  },
  {
    chat_room_id:'KR02',
    chat_room_name:'Saranghaeee',
    language:'Korean',
    n_active_user: 8
  },
  {
    chat_room_id:'JP01',
    chat_room_name:'Japan Today',
    language:'Japan',
    n_active_user: 6
  },
  {
    chat_room_id:'end',
    chat_room_name:'end',
    language:'end'
  }]);
});

module.exports = router;
