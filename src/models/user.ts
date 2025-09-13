import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  password: string;
  role: "user" | "admin" | "super-admin"; 
}

const UserSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ["user", "admin", "super-admin"], 
    default: "user"  //normal signup এ সবসময় "user"
  },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
