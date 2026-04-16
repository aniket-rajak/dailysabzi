import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile: string;
  role: "user" | "deliveryboy" | "admin";
  image?: string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
    mobile: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "deliveryboy", "admin"],
      default: "user",
    },
    image:{
      type: String
    },
  },
  { timestamps: true },
);

userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password || "");
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
