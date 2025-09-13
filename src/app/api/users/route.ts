// app/api/users/route.ts
import { NextResponse } from "next/server";
import User from "../../../models/user";
import dbConnect from "../../../lib/db";

export async function GET() {
  await dbConnect();
  const users = await User.find();
  return NextResponse.json(users);
}
