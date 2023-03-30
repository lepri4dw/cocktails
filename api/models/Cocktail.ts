import {model, Schema, Types} from "mongoose";
import User from "./User";

const CocktailSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist',
    },
  },
  name: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  ingredients: {
    type: [{
      name: { type: String, required: true},
      amount: { type: String, required: true},
    }],
    required: true,
  },
});

const Cocktail = model('Cocktail', CocktailSchema);
export default Cocktail;