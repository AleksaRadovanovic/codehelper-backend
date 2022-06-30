const express =require('express');
const router = express.Router();
const pool = require('../database/database')
const jwt = require('jsonwebtoken');
const config = require('../config/config');

router.post('/loginUser', async (req, res)=>{
    let returnResult = { isSuccess: false, message: '', idToken: null};
    try {
        const { username, password } = req.body;
        const { rows } = await pool.query('SELECT user_id, username, password FROM users WHERE username=$1 AND role=$2', [username, 'regular-user']);

        if(rows.length > 0){
            let user = rows[0];
            let macth = (password === user.password); // inace ce biti biblioteka bcrypt koja ce porediti

            if(macth){
                const token = jwt.sign({ id: user.user_id, username : req.body.username}, config.serverSecretKey, { expiresIn: '2d' });

                returnResult.isSuccess = true;
                returnResult.message = "EVO GA TOKEN";
                returnResult.idToken = token;

                return res.status(200).send(returnResult);
            }
            else {
                returnResult.message = "WRONG PASSWORD";
                return res.status(200).send(returnResult);
            }
        }
        else {
            returnResult.message = "WRONG USERNAME";
            return res.status(200).send(returnResult);
        }
    } catch (error) {
        console.log({ error : error.message});
        //response
        returnResult.message = error.message;
        return res.status(200).send(returnResult);
    }
})

router.post('/registerUser', async (req, res) => {
    let returnResult = { isSuccess: false, message: ''};

    try {
        const { username, password, email } = req.body;
        const { rows } = await pool.query('SELECT username, email FROM users WHERE username=$1 OR email=$2',[username, email]);
        if(rows.length > 0){
            if(username === rows[0].username || (rows.length > 1 && username === rows[1].username)){
                returnResult.message = "Username Exist";
                return res.status(200).send(returnResult);

            }else {
                returnResult.message = "Email Exist";
                return res.status(200).send(returnResult);
            }
        }
        const {rows:idRows} = await pool.query('INSERT INTO users(username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING user_id',[username, password, email, 'regular-user']);
        
        const new_user_id = idRows[0].user_id; //sta se ovde desava
        
        returnResult.isSuccess = true;
        returnResult.message = "ALL GOOD new user inserted with id= " + new_user_id;
        return res.status(200).send(returnResult);
    } catch (error) {
        console.log({ error : error.message});
        returnResult.message = error.message;
        return res.status(200).send(returnResult);
    }
})



module.exports = router