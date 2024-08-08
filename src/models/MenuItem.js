import mongoose, { Schema, model, models } from "mongoose" ;


const ExtraPriceSchema = new Schema({
    name: String,
    price: Number,
})

const MenuItemSchema = new Schema({
image: {type: String},
name: {type: String},
description: {type: String},
selectCat: {type: mongoose.Types.ObjectId},
basePrice: {type: Number},
sizes: {type:[ExtraPriceSchema]},
toppingsPrice: {type:[ExtraPriceSchema]},
}, {timestamps: true});

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema);