import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Restaurant from "@/models/restaurant";

export const dynamic = "force-dynamic"; // disable caching

// =====================
// GET (with pagination)
// =====================
export async function GET(req: Request) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const pageParam = searchParams.get("page");
  const limitParam = searchParams.get("limit");

  // যদি query না থাকে → সব data return করবে
  if (!pageParam || !limitParam) {
    const list = await Restaurant.find({}).lean();
    return NextResponse.json({
      restaurants: list,
      pagination: null,
    });
  }

  // যদি query থাকে → paginate করে return করবে
  const page = parseInt(pageParam || "1", 10);
  const limit = parseInt(limitParam || "10", 10);
  const skip = (page - 1) * limit;

  const [list, total] = await Promise.all([
    Restaurant.find({}).skip(skip).limit(limit).lean(),
    Restaurant.countDocuments(),
  ]);

  return NextResponse.json({
    restaurants: list, // ✅ শুধু array
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}

// =====================
// POST new restaurant
// =====================
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const created = await Restaurant.create(body);
  return NextResponse.json(created, { status: 201 });
}
