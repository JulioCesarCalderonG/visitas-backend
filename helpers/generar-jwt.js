const { response } = require('express');
const jwt = require('jsonwebtoken');
const generarJWT = (id = '') =>{
    return new Promise((resolve, reject)=> {
        const payload = {id};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '7d'
        }, (err, token)=>{
            if (err) {
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token);
            }
        })
    })
}

module.exports = {
    generarJWT
}