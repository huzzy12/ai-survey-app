import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { email, answers, score, category } = await request.json()

    // Store the response in Vercel Postgres using the connection pool
    await pool.sql`
      INSERT INTO survey_responses (email, answers, score, category)
      VALUES (${email}, ${JSON.stringify(answers)}, ${score}, ${category})
    `

    return NextResponse.json(
      { success: true },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error submitting survey:", error)
    return NextResponse.json(
      { error: "Failed to submit survey" },
      { status: 500 }
    )
  }
}
