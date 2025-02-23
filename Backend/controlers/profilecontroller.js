import Profile from "../models/profilemodel.js";

export const addProfile = async (req, res) => {
    try {
        const { email, name, phonenumber, instagramlink, youtubechannel } = req.body;

        if (!email || !name || !phonenumber) {
            return res.status(400).json({ message: "Email, name, and phone number are required" });
        }
        const existingProfile = await Profile.findOne({ email: email });
        if (existingProfile) {
            return res.status(409).json({ message: "Profile already exists" });
        }
        const newProfile = new Profile({ email: email, name: name, phonenumber: phonenumber, instagramlink: instagramlink, youtubechannel: youtubechannel });

        await newProfile.save();

        console.log("Profile added successfully");
        res.status(201).json({ message: "Profile added successfully" });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ message: err.message });
    }
};


export const getallprofiles = async (req, res) => {
    try {
        const profiles = await Profile.find();
        console.log("Profiles found successfully");
        res.status(200).json({ message: "Profiles found successfully", profiles });
    }
    catch (err) {
        console.log("Error:", err);
        res.status(500).json({ message: err.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { email, name, phonenumber, instagramlink, youtubechannel } = req.body;

        if (!email || !name || !phonenumber) {
            return res.status(400).json({ message: "Email, name, and phone number are required" });
        }
        const existingProfile = await Profile.findOne({ email: email });
        if (!existingProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        existingProfile.name = name;
        existingProfile.phonenumber = phonenumber;
        existingProfile.instagramlink = instagramlink;
        existingProfile.youtubechannel = youtubechannel;

        await existingProfile.save();

        console.log("Profile updated successfully");
        res.status(200).json({ message: "Profile updated successfully" });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ message: err.message });
    }
};

export const getprofile=async(req,res)=>{
    try{
        const email=req.params.email;
        if(!email){
            return res.status(400).json({message:"Email is required"});
        }
        const profile=await Profile.findOne({email:email});
        if(!profile){
            return res.status(404).json({message:"Profile not found"});
        }
        console.log("Profile found successfully");
        res.status(200).json({message:"Profile found successfully",profile});
    }
    catch(err){
        console.log("Error:",err);
        res.status(500).json({message:err.message});
    }

};


export const deleteProfile=async(req,res)=>{
    try{
        const email=req.params.email;
        if(!email){
            return res.status(400).json({message:"Email is required"});
        }
        const profile=await Profile.findOne({email:email});
        if(!profile){
            return res.status(404).json({message:"Profile not found"});
        }
        await Profile.deleteOne({email:email});
        console.log("Profile deleted successfully");
        res.status(200).json({message:"Profile deleted successfully"});
    }
    catch(err){
        console.log("Error:",err);
        res.status(500).json({message:err.message});
    }

};
