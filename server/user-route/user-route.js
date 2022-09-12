const express = require('express');
let {verificaToken,verificaAdmin_ROLE} = require('../middlewars/autenticacion');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const userModel = require('../user-model/user-model');

const app = express();

app.get('/user',verificaToken,(req,res) => {

    /**
     * Esto es para obtener informacio del paylod
     * return res.json({
        usuario : req.data,
        nombre : req.data.nombre,
        email: req.data.email
    })
     */
 
let desde = req.query.desde || 0;
desde = Number(desde);

let limite = req.query.limite || 5;
limite = Number(limite);

    userModel.find({estado:true},'nombre apellido email img role estado google')
    .skip(desde)
    .limit(limite)
    .exec( (err,user) => {
        if(err){
            res.status(400).json({
                ok:true,
                err,
                message:'Hubo un error de redes rectifique e intentelo nuevamente'
            })
        }else{
            userModel.count({estado:true},(err,conteo)=>{
                res.status(200).json({
                    ok:true,
                    user,
                    numeroDeUser:conteo,
                    message:'Todo ha funcionado correctamente'
                })
            });
            
        }
    })

});

app.post('/user',[verificaToken,verificaAdmin_ROLE],(req,res) => {
    
    let body = req.body
    let usuario = new userModel({
        nombre:body.nombre,
        apellido:body.apellido,
        email:body.email,
        password:bcrypt.hashSync(body.password,10),
        img:body.img,
        role: body.role,
        estado:body.estado,
        google:body.google
    });

    usuario.save((err,userDB) => {

        if(err){
            res.status(400).json({
                ok:false,
                err,
                message:'hubo un error con el servidor'
            });
        }else{
            res.status(200).json({
                ok:true,
                usuario: userDB,
                message:'Usuario creado correctamente'
            })
        }
    });
});

app.put('/user/:id',[verificaToken,verificaAdmin_ROLE],(req,res) => {
    let id = req.params.id
    let body = _.pick(req.body,['nombre','apellido','role','password','img','email']);

    userModel.findByIdAndUpdate( id,body,{new:true,runValidators:true},(err,userdb) => {
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }else{
            res.status(200).json({
                ok:true,
                usuario:userdb
            })
        }
    });

});

    app.delete('/user/:id',[verificaToken,verificaAdmin_ROLE],(req,res) => {

        //Eliminacion logica de un usuario de la base de datos.
        let id = req.params.id;
        let dataUser = {estado:false};
        userModel.findByIdAndUpdate(id,dataUser,{new : true},(err,usereliminado) => {
                
             if(err){
                     res.status(400).json({
                         ok:false,
                         err
                     });
            }if(!usereliminado){
                        res.status(400).json({
                            ok:false,
                            err:{message:'El usuario ya no se encuentra en la base de datos'}
                        });
                    }
            else{
                    res.status(200).json({
                        ok:true,
                        user:usereliminado,
                        message:'El usuario ha sido eliminado correctamente'
                    })
                }            
    });
        
        /**
        Este codigo busca un usuario y elimina por id de manera fisica y permanete de la abse de datos.

    let id = req.params.id;
    userModel.findByIdAndRemove(id,(err,usereliminado) => {
                
                 if(err){
                     res.status(400).json({
                         ok:false,
                         err
                     });
                    }if(!usereliminado){
                        res.status(400).json({
                            ok:false,
                            err:{message:'El usuario ya no se encuentra en la base de datos'}
                        });
                    }
                    else{
                    res.status(200).json({
                        ok:true,
                        user:usereliminado,
                        message:'El usuario ha sido eliminado correctamente'
                    })
                }
            
    });
         */

});

module.exports = app;