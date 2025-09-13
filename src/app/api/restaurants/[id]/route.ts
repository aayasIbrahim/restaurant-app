import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Restaurant from "@/models/restaurant";

export const dynamic = "force-dynamic";

// GET one restaurant
export async function GET(
  req: NextRequest,
  context: { params: { id: string } } // ✅ এখানে Promise নয়
) {
  await connectDB();
  const { id } = context.params;
  const restaurant = await Restaurant.findById(id);
  if (!restaurant) return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
  return NextResponse.json(restaurant);
}

// PUT update restaurant
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await connectDB();
  const { id } = context.params;
  const data = await req.json();
  const updated = await Restaurant.findByIdAndUpdate(id, data, { new: true });
  if (!updated) return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
  return NextResponse.json(updated);
}

// DELETE restaurant
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await connectDB();
  const { id } = context.params;
  const deleted = await Restaurant.findByIdAndDelete(id);
  if (!deleted) return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
  return NextResponse.json({ success: true, id });
}
