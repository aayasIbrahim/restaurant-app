
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Restaurant from "@/models/restaurant";

export const dynamic = "force-dynamic"; // disable caching

// GET all restaurants
export async function GET() {
  await connectDB();
  const list = await Restaurant.find({}).lean();
  return NextResponse.json(list);
}

// POST new restaurant
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const created = await Restaurant.create(body);
  return NextResponse.json(created, { status: 201 });
}
