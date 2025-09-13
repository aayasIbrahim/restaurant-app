
import { NextResponse } from "next/server";
import User from "../../../../../models/user";
import dbConnect from "../../../../../lib/db";

export async function PUT(req, { params }) {
  await dbConnect();
  const { role } = await req.json();

  const user = await User.findByIdAndUpdate(params.id, { role }, { new: true });
  return NextResponse.json(user);
}
