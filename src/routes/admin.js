const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { createUser, createDataByCOE, loginUser, getUser, updateUser, deleteUser} = require('../controllers/adminController/adminController')
const { authentication } = require('../middlewares/authentication')
const { authorization } = require('../middlewares/authorization')



//------------------------------------------> (This is test api ) <--------------------------------------------//

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


 

// ===================================================( All admin api)======================================================///

//-------------------------> (When admin creat, call this api) <----------------------------------//

router.post("/signup", createUser)


router.post("/upload", upload.single('file'), createDataByCOE)


//-------------------------> (When admin login, call this api) <----------------------------------//

router.post("/loginUser", loginUser)

//-------------------------> (When admin get, call this api) <----------------------------------//

router.get("/getUser", getUser)



//-------------------------> (When admin update, call this api) <----------------------------------//

router.put("/userUpdate", authentication, authorization,  updateUser)



//-------------------------> (When admin update, call this api) <----------------------------------//

router.delete("/userDelete", authentication, authorization,  deleteUser)


// 
module.exports = router;