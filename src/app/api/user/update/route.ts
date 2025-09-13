import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import bcrypt from "bcryptjs";
import connectDB from "../../../../lib/db";
import User from "../../../../models/user";
import { authOptions } from "../../../../lib/authOptions";

export async function PUT(req: Request) { 
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { firstName, lastName, email, mobile, oldPassword, newPassword } = body;

    await connectDB();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Update normal profile fields (always send required fields)
    if (firstName !== undefined) user.firstName = firstName;
    if (lastName !== undefined) user.lastName = lastName;
    if (email !== undefined) user.email = email;
    if (mobile !== undefined) user.mobile = mobile;

    // Password change logic
    if (oldPassword && newPassword) {
      const isValid = await bcrypt.compare(oldPassword, user.password);
      if (!isValid) {
        return NextResponse.json(
          { message: "Old password is incorrect" },
          { status: 400 }
        );
      }

      if (newPassword.trim().length < 6) {
        return NextResponse.json(
          { message: "New password must be at least 6 characters" },
          { status: 400 }
        );
      }

      const hashed = await bcrypt.hash(newPassword, 10);
      user.password = hashed;
    }

    await user.save();

    return NextResponse.json({ message: "Profile updated successfully ✅" });
  } catch (error: any) {
    console.error("Profile update error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
