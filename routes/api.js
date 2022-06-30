const express =require('express');
const expressJwt = require('express-jwt');
const config = require('../config/config');
const router = express.Router();
const pool = require('../database/database')

router.post('/getTasksForUser', expressjwt({ secret: config.serverSecretKey }),  async (req, res)=>{
    let returnResult = { isSuccess: false, message: '', tasks: []};
    try {
        returnResult.tasks = [{
            id: 1,
            taskName: 'React task',
        }]
        return res.status(200).send(returnResult);
    } catch (error) {
        console.log({ error : error.message});
        returnResult.message = error.message;
        return res.status(200).send(returnResult);
    }
})

router.post('/createTaskForUser',  expressJwt({ secret: config.serverSecretKey }), async (req, res)=>{
    let returnResult = { isSuccess: false, message: ''};
    try {
        
        return res.status(200).send(returnResult);
    } catch (error) {
        console.log({ error : error.message});
        returnResult.message = error.message;
        return res.status(200).send(returnResult);
    }
})

module.exports = router