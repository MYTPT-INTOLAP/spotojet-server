const playerModel = require("../../models/Players_Model/playerModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
require('dotenv').config();
const xlsx = require('xlsx');
const multer = require('multer');
const csvtojson = require('csvtojson');
const { getFileType } = require('../../filesImports/eocToJson')
const { BASE_URL, SERVER_URI, privateKey } = require('../../Config/keys')
const { isValidePlayer, isValideUpdatePlayer } = require('../../dataValidation/dataValidation')



// METHOD : CREATE

const createPlayer = async (req, res) => {
    try {
        // console.log("ok")
        // using destructuring of body data.
        let data = req.body
        const { fname, lname, DOB, address, phone, BloodGroup } = req.body;

        //Input data validation
        let msgUserData = isValidePlayer(data)
        if (msgUserData) {
            return res.status(400).send({ status: true, message: msgUserData });
        }

        //Create user data 

        const playerData = {
            fname: fname ? fname.trim() : '',
            lname: lname ? lname.trim() : '',
            DOB: DOB ? DOB : null,
            address: address ? address.trim() : '',
            phone: phone ? phone : null,
            BloodGroup: BloodGroup ? BloodGroup : null,
        };
        // console.log(userData)

        const newPlayer = await playerModel.create(playerData);

        return res.status(201).send({ status: true, message: "new Player registered successfully", data: newPlayer });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}




// EXCEL AND CSV Files to json convert and create data.


const createPayerDataByCOE = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = req.file.path;
    const fileType = getFileType(req.file.originalname);

    if (fileType === 'csv') {
        csvtojson()
            .fromFile(filePath)
            .then( async (jsonObj) => {
                await adminModel.insertMany(jsonObj)
                return res.status(201).send({ status: true, message: 'User data import successfully' });
            })
            .catch((err) => {
                console.error(err);
                return res.status(500).send({status: false, message: 'Internal server error' });
            });
    } else if (fileType === 'excel') {
        try {
            const workbook = xlsx.readFile(filePath);
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = xlsx.utils.sheet_to_json(worksheet);

            await adminModel.insertMany(jsonData)
            return res.status(201).send({ status: true, message: 'User data import successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ status: false, message: 'Internal server error' });
        }
    } else {
        return res.status(400).send({ status: false, message: 'Invalid file type' });
    }
}






// METHOD : GET

const getPlayer = async (req, res) => {
    try {
        let data = await playerModel.find({});
        // console.log(data)
        // let datas = data.filter(e => e.role !== 'Admin')
        return res.status(200).send({ status: true, message: "user data get successfully", data: data })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}





// METHOD : UPDATE

const updatePlayer = async (req, res) => {
    try {
        // using destructuring of body data.
        let data = req.body
        let adminId = req.admin
        let { fname, lname, DOB, address, phone, BloodGroup, playerId } = data;

        const oldata = await playerModel.findOne({ _id: playerId, adminId: adminId })
        if (!oldata) {
            return res.status(400).send({ status: false, message: "Data Not Found" })
        }

        let msgUserData = isValideUpdatePlayer(data)
        if (msgUserData) {
            return res.status(400).send({ status: false, message: msgUserData })
        }

        let resData = await playerModel.findOneAndUpdate({ _id: playerId }, data, { new: true });
        return res.status(200).send({ status: true, message: "user update successfully", data: resData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


// METHOD : DELETE

const deletePlayer = async (req, res) => {
    try {
        // using destructuring of body data.
        let { playerid } = req.headers
        let adminId = req.admin

        //Input data validation
        const isUnique = await playerModel.findOne({ _id: playerid });
        if (!isUnique) {
            return res.status(404).send({ status: true, message: "User profile not found" });
        }

        let resData = await playerModel.findOneAndDelete({ _id: playerid })
        return res.status(200).send({ status: true, message: "User profile is Deleted", data: resData });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}





module.exports = { createPlayer, createPayerDataByCOE, getPlayer, updatePlayer, deletePlayer }