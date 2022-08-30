const mongooseValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let rolesValidos = {
    values:['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} no es un role valido'
};

const userSchema = new Schema({
    nombre:{type:String,required:true},
    apellido:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    img:{type:String,required:false},
    role:{type:String,default:'USER_ROLE',enum:rolesValidos},
    estado:{type:Boolean,default:true},
    google:{type:Boolean,default:false}
});

userSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}
userSchema.plugin(mongooseValidator,{message:'{PATH} debe ser unico'})

module.exports = mongoose.model('User',userSchema);