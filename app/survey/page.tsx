import { Card } from "@/components/ui/card"
import SurveyForm from "@/components/survey-form"

export default function SurveyPage() {
  return (
    <main className="min-h-screen bg-[#1A2A40] flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl">
        <SurveyForm />
      </Card>
    </main>
  )
}