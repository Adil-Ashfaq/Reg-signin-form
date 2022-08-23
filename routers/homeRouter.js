const express = require('express');
const homeSchema = require('../models/homeSchema');
const Router = express.Router();


Router.get('/', (err, res) => {
    res.render('register', { title: 'fill form', password: '', email: '' })
})

Router.post('/register', async (req, res) => {
    try {
        const {
            name,
            number,
            email,
            password,
            cpassword
        } = req.body;

        if (password === cpassword) {

            const userData = new homeSchema({
                name,
                number,
                email,
                password,
            })
            userData.save(err => {
                if (err) {
                    console.log("err")
                } else {
                    res.render('register', { title: 'Done', password: '', email: '' })
                }
            })

            const userEmail = await homeSchema.findOne({ email: email });
            if (email === userEmail.email) {
                res.render('register', { title: '', password: '', email: 'Email is Already exist' })
            }
        } else {
            res.render('register', { title: '', password: 'Password Not Matching', email: '' })
        }


    } catch (error) {
        res.render('register', { title: '', password: '', email: '' })
    }
})

Router.post('/login', (req, res) => {
    const {
        email,
        password
    } = req.body;

    homeSchema.findOne({ email: email }, (err, result) => {
        if (email === result.email && password === result.password) {
            res.render('Dashboard', { name: result.name })
        } else {
            consoelsle.log(err)
        }
    })
})

module.exports = Router;