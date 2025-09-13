
import { NextResponse } from "next/server";
import User from "../../../../models/user";
import dbConnect from "../../../../lib/db";

export async function DELETE(req, { params }) {
  await dbConnect();
  await User.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "User deleted" });
}
