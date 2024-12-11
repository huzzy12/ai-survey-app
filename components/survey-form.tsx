"use client";
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const questions = [
  {
    id: 1,
    text: "How would you rate the speed of your current business processes?",
    options: [
      { text: "Very fast, No delays", score: 5 },
      { text: "Fast, Minor delays", score: 3 },
      { text: "Moderate, Noticeable delays", score: 1 },
      { text: "Slow, Significant delays", score: 0 },
    ],
  },
  {
    id: 2,
    text: "How much time do your employees spend on repetitive, manual tasks each week?",
    options: [
      { text: "Less than 5 hours", score: 5 },
      { text: "5-10 hours", score: 3 },
      { text: "10-20 hours", score: 1 },
      { text: "20+ hours", score: 0 },
    ],
  },
  {
    id: 3,
    text: "Which of these areas do you find most challenging in your operations?",
    options: [
      { text: "Data management and analysis", score: 3 },
      { text: "Customer support and communication", score: 3 },
      { text: "Inventory management and order fulfillment", score: 3 },
      { text: "Workflow automation and task management", score: 3 },
    ],
  },
  {
    id: 4,
    text: "How comfortable are you with implementing new technologies in your business?",
    options: [
      { text: "Very comfortable, we regularly adopt new technologies", score: 5 },
      { text: "Open to new technologies but proceed with caution", score: 3 },
      { text: "Neutral, we only adopt if it's absolutely necessary", score: 1 },
      { text: "Uncomfortable, we prefer to stick with our current systems", score: 0 },
    ],
  },
  {
    id: 5,
    text: "Do you currently use any AI-powered tools in your business?",
    options: [
      { text: "Yes, we use multiple AI tools", score: 5 },
      { text: "Yes, we use one or two AI tools", score: 3 },
      { text: "We are exploring AI tools", score: 1 },
      { text: "No, we don't use any AI tools currently", score: 0 },
    ],
  },
  {
    id: 6,
    text: "What is your biggest concern regarding AI adoption?",
    options: [
      { text: "Implementation complexity and disruption of current operations", score: 3 },
      { text: "Cost justification and return on investment", score: 3 },
      { text: "Employee resistance and training requirements", score: 3 },
      { text: "Data security and privacy concerns", score: 3 },
    ],
  },
  {
    id: 7,
    text: "Do you find it difficult to maintain quality and customer satisfaction as your business grows?",
    options: [
      { text: "Not at all, we have scalable systems in place", score: 5 },
      { text: "Occasionally, we face challenges in some areas", score: 3 },
      { text: "Frequently, we struggle to keep up with demand", score: 1 },
      { text: "Significantly, growth heavily impacts quality and satisfaction", score: 0 },
    ],
  },
  {
    id: 8,
    text: "How do you currently track and measure key performance indicators (KPIs)?",
    options: [
      { text: "We use advanced analytics tools and dashboards", score: 5 },
      { text: "We have a basic system for tracking main KPIs", score: 3 },
      { text: "We track KPIs manually or sporadically", score: 1 },
      { text: "We don't consistently track KPIs", score: 0 },
    ],
  },
  {
    id: 9,
    text: "What are your primary growth objectives for the next 12 months?",
    options: [
      { text: "Increase revenue", score: 3 },
      { text: "Reduce costs", score: 3 },
      { text: "Build systems/Automate workflows", score: 3 },
      { text: "Improve customer/client retention", score: 3 },
    ],
    multiSelect: true,
  },
  {
    id: 10,
    text: "How would you describe your current approach to business process automation?",
    options: [
      { text: "We have fully automated most of our core processes", score: 5 },
      { text: "We have automated some processes and are working on more", score: 3 },
      { text: "We are just starting to explore automation options", score: 1 },
      { text: "We haven't started automating our processes yet", score: 0 },
    ],
  },
]

export default function SurveyForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{[key: number]: string | string[]}>({})
  const [showEmail, setShowEmail] = useState(false)
  const [email, setEmail] = useState("")
  const router = useRouter()

  const handleAnswerChange = (answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: answer }))
    if (!questions[currentQuestion].multiSelect && currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (showEmail) {
      setShowEmail(false)
    } else if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowEmail(true)
    }
  }

  const calculateScore = () => {
    const rawScore = Object.entries(answers).reduce((score, [questionIndex, answer]) => {
      const question = questions[Number(questionIndex)]
      if (Array.isArray(answer)) {
        // For multi-select questions, sum the scores of selected options
        const selectedOptions = question.options.filter(option => answer.includes(option.text))
        return score + selectedOptions.reduce((sum, option) => sum + option.score, 0)
      } else {
        const selectedOption = question.options.find(option => option.text === answer)
        return score + (selectedOption?.score || 0)
      }
    }, 0)

    // Calculate maximum possible score
    const maxScore = questions.reduce((total, question) => {
      if (question.multiSelect) {
        // For multi-select, max is sum of all option scores
        return total + question.options.reduce((sum, option) => sum + option.score, 0)
      } else {
        // For single select, max is highest option score
        return total + Math.max(...question.options.map(option => option.score))
      }
    }, 0)

    // Convert to percentage
    return Math.round((rawScore / maxScore) * 100)
  }

  const getCategory = (score: number) => {
    if (score <= 25) return "transformation-aspirant"
    if (score <= 50) return "growth-seeker"
    if (score <= 75) return "tech-savvy-optimizer"
    return "efficiency-champion"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const score = calculateScore()
    const category = getCategory(score)

    try {
      const response = await fetch("/api/submit-survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, answers, score, category }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.details || 'Failed to submit survey')
      }

      // Pass score as URL parameter
      router.push(`/results/${category}?score=${score}`)
    } catch (error) {
      const err = error as Error
      console.error("Error submitting survey:", err.message)
      throw error
    }
  }

  const calculateProgress = () => {
    return showEmail ? 100 : ((currentQuestion + 1) / questions.length) * 100
  }

  if (showEmail) {
    return (
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <Progress value={calculateProgress()} className="h-2" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
              >
                Previous
              </Button>
              <Button
                type="submit"
                className="bg-[#FF6B35] hover:bg-[#FF6B35]/90"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </CardContent>
    )
  }

  const currentQuestionData = questions[currentQuestion]

  return (
    <CardContent className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Progress value={calculateProgress()} className="h-2" />
          <p className="text-sm text-right text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-[#1A2A40]">
            {currentQuestionData.text}
          </h2>
          
          {currentQuestionData.multiSelect ? (
            <div className="space-y-2">
              {currentQuestionData.options.map((option) => (
                <button
                  key={option.text}
                  type="button"
                  onClick={() => {
                    const newAnswers = [...(answers[currentQuestion] as string[] || [])]
                    const index = newAnswers.indexOf(option.text)
                    if (index > -1) {
                      newAnswers.splice(index, 1)
                    } else {
                      newAnswers.push(option.text)
                    }
                    handleAnswerChange(newAnswers)
                  }}
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                    (answers[currentQuestion] as string[] || []).includes(option.text)
                      ? 'bg-[#FF6B35] text-white border-[#FF6B35]'
                      : 'bg-white text-gray-900 border-gray-200 hover:border-[#FF6B35]'
                  }`}
                >
                  {option.text}
                </button>
              ))}
              <div className="flex justify-between mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </Button>
                {currentQuestion === questions.length - 1 ? (
                  <Button
                    type="button"
                    onClick={() => setShowEmail(true)}
                    className="bg-[#FF6B35] hover:bg-[#FF6B35]/90"
                  >
                    Submit
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#FF6B35] hover:bg-[#FF6B35]/90"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {currentQuestionData.options.map((option) => (
                <button
                  key={option.text}
                  type="button"
                  onClick={() => handleAnswerChange(option.text)}
                  className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                    answers[currentQuestion] === option.text
                      ? 'bg-[#FF6B35] text-white border-[#FF6B35]'
                      : 'bg-white text-gray-900 border-gray-200 hover:border-[#FF6B35]'
                  }`}
                >
                  {option.text}
                </button>
              ))}
              <div className="flex justify-between mt-4">
                {currentQuestion > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                  >
                    Previous
                  </Button>
                )}
                {currentQuestion === questions.length - 1 && (
                  <Button
                    type="button"
                    onClick={() => setShowEmail(true)}
                    className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 ml-auto"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </CardContent>
  )
}