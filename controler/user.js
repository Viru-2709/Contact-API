const USER = require('../model/User')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.SECURE = async function (req, res, next) {
    try {
        let token = req.headers.token
        // console.log(token);
        if(!token){
            throw new Error("Please attach token")
        }
        var decoded = jwt.verify(token, 'CDMI');

        const checkUser = await USER.findById(decoded.id)
        console.log(decoded.id);
        if(!checkUser){
            throw new Error("USER not found")
        }
        req.userId = decoded.id
        next()
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.Usersignup = async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const user = await USER.create(req.body)
        res.status(201).json({
            status: "Success",
            message: "user Created",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.Userlogin = async function (req, res, next) {
    try {
        const checkuser = await USER.findOne({ email: req.body.email })
        if (!checkuser) {
            throw new Error("Please Enter Valid Email")
        }
        const checkpass = await bcrypt.compare(req.body.password, checkuser.password)
        if (!checkpass) {
            throw new Error("Please Enter Valid Password")
        }
        var token = jwt.sign({ id: checkuser._id }, 'CDMI');

        res.status(200).json({
            status: "Success",
            message: "User Login",
            data: checkuser,
            token
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.Alluser = async function (req, res, next) {
    try {
        const user = await USER.find()
        res.status(200).json({
            status: "Success",
            message: "All Users",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.Oneuser = async function (req, res, next) {
    try {
        const user = await USER.findById(req.params.id, req.body)
        res.status(200).json({
            status: "Success",
            message: "User",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.Updateuser = async function (req, res, next) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 10)
        const user = await USER.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({
            status: "Success",
            message: "User Updeted",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.Deleteuser = async function (req, res, next) {
    try {
        const user = await USER.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "Success",
            message: "User deleted",
            // data: user
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}