import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function POST(request: Request) {
  try {
    const { answers, email, score, category } = await request.json()

    // Store the response in Vercel Postgres
    await sql`
      INSERT INTO survey_responses (email, answers, score, category)
      VALUES (${email}, ${JSON.stringify(answers)}, ${score}, ${category})
    `

    return NextResponse.json(
      { success: true, message: "Survey submitted successfully" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Database Error:", error)
    return NextResponse.json(
      { success: false, message: "Failed to submit survey" },
      { status: 500 }
    )
  }
}

