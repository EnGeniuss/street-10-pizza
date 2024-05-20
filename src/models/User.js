import bcrypt from 'bcrypt';
import { Schema, models, model } from "mongoose";

const UserSchema = new Schema({
    name:{type: String},
    email:{type: String, 
            required: true,
            unique: true},
    password: {
        type:String,
        required: true,
        validate: pass=>{
            if (!pass?.length || pass.length < 5){
                new Error('Password must be at least 5 characters.')
            }
        },
    },
    image: {type: String},
    phone: {type: String},
    streetAddress: {type: String},
    postalCode: {type: String},
    city: {type: String},
    country: {type: String},

}, {timestamps:true});

    UserSchema.post('validate', function(user){
        const notHashedPassword=user.password;
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(notHashedPassword, salt);
    })
export const User= models?.User || model('User', UserSchema);