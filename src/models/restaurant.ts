import mongoose from "mongoose";

const dishSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  image: String
});

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  priceLabel: String,
  price: Number,
  offer: String,
  rating: Number,
  distance: Number,
  deliveryTime: Number,
  isSuper: Boolean,
  image: String,
  menu: [dishSchema]
});

export default mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
