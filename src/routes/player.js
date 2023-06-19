const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { createPlayer, createPayerDataByCOE, getPlayer, updatePlayer, deletePlayer } = require('../controllers/playerControllers/playerController')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')



//------------------------------------------> (This is test api ) <--------------------------------------------//

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


 

// ===================================================( All admin api)======================================================///

//-------------------------> (When admin creat, call this api) <----------------------------------//

router.post("/cratePayer", createPlayer)


router.post("/uploadPayers", upload.single('file'), createPayerDataByCOE)



//-------------------------> (When admin get, call this api) <----------------------------------//

router.get("/getPayers", authentication, getPlayer)



//-------------------------> (When admin update, call this api) <----------------------------------//

router.put("/payersUpdate", authentication, authorization,  updatePlayer)



//-------------------------> (When admin update, call this api) <----------------------------------//

router.delete("/payersDelete", authentication, authorization,  deletePlayer)


// 
module.exports = router;