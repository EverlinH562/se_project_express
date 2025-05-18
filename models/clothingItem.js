const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const clothingItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    weather: {
      type: String,
      required: true,
      enum: ['hot', 'warm', 'cold'],
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
        message: "Link is not valid",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ClothingItem", clothingItemSchema);