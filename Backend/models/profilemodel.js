import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  instagramlink:{
    type: String,
    
  },
  youtubechannel:{
    type: String,
    
  }
  // You can add additional fields here as needed.
});

const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile;