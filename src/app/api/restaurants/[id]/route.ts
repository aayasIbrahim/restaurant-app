import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Restaurant from "@/models/restaurant";

export const dynamic = "force-dynamic"; // disable caching

// GET one restaurant by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const restaurant = await Restaurant.findById(params.id);
  if (!restaurant)
    return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });

  return NextResponse.json(restaurant);
}

// PUT update restaurant
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const data = await req.json();

  const updated = await Restaurant.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  if (!updated)
    return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });

  return NextResponse.json(updated);
}

// DELETE restaurant
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const deleted = await Restaurant.findByIdAndDelete(params.id);
  if (!deleted)
    return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });

  return NextResponse.json({ success: true, id: params.id });
}
