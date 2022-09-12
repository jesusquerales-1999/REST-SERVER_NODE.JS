const jwt = require('jsonwebtoken');
 
//==============================
//verificar token
//==============================

let verificaToken = (req,res,next) => {

    let token = req.get('token');

    jwt.verify(token,process.env.SEED,(err,decoded) => {

        if(err){
            return res.status(401).json({
                ok:false,
                err
            })
        }
            req.data = decoded.data;
            next();
    });
}
//===============================
//verificaAdmin_ROLE
//===============================

let verificaAdmin_ROLE = (req,res,next) => {

    let usuario = req.data;

    if(usuario.role === 'ADMIN_ROLE'){
        next();
    }else{
        return res.json({
            ok:true,
            err:{
                message : 'El usuario no es un administardor'
            }
        })
    }
    
}

module.exports = {
    verificaToken,
    verificaAdmin_ROLE
    };

/**
 * let token = req.get('token');

jwt.verify(token,process.env.SEED,(err,decode)=>{
    if(err){
       return res.status(401).json({
            ok:false,
            err
        })
    }
    req.usuario = decode.usuario;
    next();
})
 */