import { auth, currentUser } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const VALID_DIFFICULTIES = ["easy", "medium", "hard", "master"] as const;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const difficulty = searchParams.get("difficulty");

  if (!difficulty || !VALID_DIFFICULTIES.includes(difficulty as any)) {
    return NextResponse.json({ error: "Invalid difficulty" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("scores")
    .select("user_name, score")
    .eq("difficulty", difficulty)
    .order("score", { ascending: false })
    .limit(50);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await currentUser();
  const userName =
    user?.firstName ||
    user?.username ||
    user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
    "Anonymous";

  const body = await req.json();
  const { difficulty, score } = body;

  if (!VALID_DIFFICULTIES.includes(difficulty)) {
    return NextResponse.json({ error: "Invalid difficulty" }, { status: 400 });
  }
  if (typeof score !== "number" || score <= 0) {
    return NextResponse.json({ error: "Invalid score" }, { status: 400 });
  }

  // Only upsert if new score beats the existing record
  const { data: existing } = await supabase
    .from("scores")
    .select("score")
    .eq("user_id", userId)
    .eq("difficulty", difficulty)
    .single();

  if (existing && existing.score >= score) {
    return NextResponse.json({ success: true, updated: false });
  }

  const { error } = await supabase.from("scores").upsert(
    {
      user_id: userId,
      user_name: userName,
      difficulty,
      score,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,difficulty" }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true, updated: true });
}

