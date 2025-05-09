const validator = require('validator');

const mongoose = require("mongoose");

const { Schema } = mongoose;

const clothingItemSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 30 },
    weather: { type: String, required: true, enum: ['hot', 'warm', 'cold'], },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Link is not Valid",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, 
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }, 
  },
  {
    timestamps: true, 
  }
);


const ClothingItem = mongoose.model("ClothingItem", clothingItemSchema);

module.exports = ClothingItem;

const userSchema = new Schema({
    name: { type: String, required: true },
    avatar: { type: String },
  });
  
  const User = mongoose.model('User', userSchema);
  
  module.exports = User;