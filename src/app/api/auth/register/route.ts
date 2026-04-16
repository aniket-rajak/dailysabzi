import connectDb from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectDb();
    const { name, email, password } = await req.json();
    const existUser = await User.findOne({ email });
    // Check User Exist or Not
    if (existUser) {
      return NextResponse.json(
        { message: "User Already Exist" },
        { status: 400 },
      );
    }
    // Check Password 6 Character or Not
    if (password.length < 6) {
      return NextResponse.json(
        { message: "Password must be 6 character long" },
        { status: 400 },
      );
    }
    // Password Hashing with salt 10 Rounds
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return NextResponse.json({ message: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error creating user: ${error}` },
      { status: 500 },
    );
  }
}

// APi Create wordflow

// connectDb
// name, email, password from Frontent
// email check
// Password 6 Character
// Password Hash
// User Create
