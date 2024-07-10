var jwt = require('jsonwebtoken');
const CONTACT = require('../model/Contact');
const USER = require('../model/User')

exports.SECURE = async function (req, res, next) {
    try {
        let token = req.headers.token
        // console.log(token);
        if (!token) {
            throw new Error("Please attach token")
        }
        var decoded = jwt.verify(token, 'CDMI');

        const checkUser = await USER.findById(decoded.id)
        // console.log(decoded.id);
        if (!checkUser) {
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

exports.AllContact = async function (req, res, next) {
    try {
        const contact = await CONTACT.find({ username: req.userId }).populate('username')
        res.status(200).json({
            status: "Success",
            message: "All Contact found",
            data: contact
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.Addcontact = async function (req, res, next) {
    try {
        let token = req.headers.token
        let decoded = jwt.verify(token, 'CDMI')
        req.body.username = decoded.id
        const contact = await CONTACT.create(req.body)
        res.status(201).json({
            status: "Success",
            message: "Contact Created",
            data: contact
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.Upedatecontact = async function (req, res, next) {
    try {
        const contact = await CONTACT.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({
            status: "Success",
            message: "Contact Updated",
            data: contact
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.Deletecontact = async function (req, res, next) {
    try {
        const contact = await CONTACT.findByIdAndDelete(req.params.id)
        res.status(201).json({
            status: "Success",
            message: "Contact Deleted"
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}