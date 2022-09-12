const express = require('express');

const app = express();

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const userModel = require('../user-model/user-model');

app.post('/login',(req,res)=>{

    let body = req.body;

    userModel.findOne({email:body.email},(err,userdb)=>{

        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        if(!userdb){
            return res.status(400).json({
                ok:false,
                err:{
                    message:'El (usuario) o la contarseña son incorrectos'
                }
            })
        }
        if(!bcrypt.compareSync(body.password,userdb.password)){

            return res.status(400).json({
                ok:false,
                err:{
                    message:'El usuario o la (contarseña) son incorrectos'
                }
            });
        }

        let token = jwt.sign({
            data: userdb,
          }, process.env.SEED , { expiresIn: process.env.CADUCIDAD_TOKEN});

        res.json({
            ok:true,
            usuario:userdb,
            token
        });

    });

});


module.exports = app;

/**
 * 
    switch (body.email) {
        case err:
             res.status(500).json({
            ok:false,
            err
        });
        break;
        
        case !userdb: 
         res.status(400).json({
            ok:false,
            err:{
                message:'El (usuario) o la contraseña son incorrectos'
            }
        });
        break;

        case !bcrypt.compareSync(body.password,userdb.password):
             res.status(400).json({
                ok:false,
                err:{
                    message:'El usuario o la (contraseña) son incorrectos'
                }
            })

        break;

        default: res.status(200).json({
            ok:true,
            usuario:userdb,
            token:'123'
        })
            break;
    }
 */


 