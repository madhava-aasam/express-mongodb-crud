import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  phone: String,
  ssn: String,
  address: {
    address1: String,
    address2: String,
    city: String,
    state: String,
    country: String,
  },
});

const model = mongoose.model("User", userSchema);

export default model;
