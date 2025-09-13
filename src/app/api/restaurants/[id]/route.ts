import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Restaurant from "@/models/restaurant";

export const dynamic = "force-dynamic";

type Params = {
  params: Promise<{ id: string }>;
};

// GET one restaurant
export async function GET(req: NextRequest, context: Params) {
  try {
    await connectDB();
    const { id } = await context.params; // ✅ await because it's a Promise
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });
    return NextResponse.json(restaurant);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT update restaurant
export async function PUT(req: NextRequest, context: Params) {
  try {
    await connectDB();
    const { id } = await context.params;
    const data: Partial<{ name: string; location: string; cuisine: string }> = await req.json();

    const updated = await Restaurant.findByIdAndUpdate(id, data, { new: true });
    if (!updated) return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE restaurant
export async function DELETE(req: NextRequest, context: Params) {
  try {
    await connectDB();
    const { id } = await context.params;

    const deleted = await Restaurant.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Restaurant not found" }, { status: 404 });

    return NextResponse.json({ success: true, id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
 