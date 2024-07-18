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
}, {timestamps:true});

    UserSchema.post('validate', function(user){
        const notHashedPassword=user.password;
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(notHashedPassword, salt);
    })
export const User= models?.User || model('User', UserSchema);