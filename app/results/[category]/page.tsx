import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"

const categories = {
  "efficiency-optimizer": {
    title: "Congrats, Efficiency Champion!",
    subtitle: "You're among the top 3% of businesses leveraging automation and AI.",
    description: [
      "Your sophisticated approach to digital transformation positions you perfectly for exponential growth.",
      "But here's what most Efficiency Champions don't realize: There's still untapped potential in your automation strategy that could double your current efficiency gains.",
      "Want to discover these advanced automation strategies? I help companies like yours unlock an additional 30% productivity boost through strategic AI implementation.",
    ],
    sessionType: "Free Strategy Session",
    bulletPoints: [
      "Advanced AI integration opportunities unique to market leaders",
      "Predictive analytics implementation for decision-making",
      "Custom automation solutions for complex workflows",
    ],
    urgencyMessage: "Demand is through the roof these days - Reserve your spot now!",
  },
  "tech-savvy-optimizer": {
    title: "Well Done, Tech-Savvy Optimizer!",
    subtitle: "Impressive!",
    description: [
      "Your business shows strong potential for AI automation excellence. You're already ahead of 72% of businesses in your industry.",
      "Here's the exciting part: You're perfectly positioned to leverage AI automation for exponential growth. The gap between where you are and market leaders is smaller than you think.",
      "I help Tech-Savvy Optimizers like you bridge this gap in just 90 days.",
    ],
    sessionType: "Free Automation Acceleration Session",
    bulletPoints: [
      "Quick-win automation opportunities specific to your score",
      "Strategic implementation roadmap for rapid results",
      "ROI calculation for your next automation project",
    ],
    urgencyMessage: "Only 5 spots available this week - Claim yours now!",
  },
  "growth-seeker": {
    title: "Great Job, Growth Seeker!",
    subtitle: "You're on the right path!",
    description: [
      "You've identified a massive opportunity for transformation. Your business has the perfect foundation for AI automation implementation.",
      "Here's what's interesting: Companies at your automation stage typically see the fastest ROI from AI implementation - often 300% or more in the first year.",
      "I specialize in helping Growth Seekers achieve these results without disrupting their current operations.",
    ],
    sessionType: "Automation Discovery Session",
    bulletPoints: [
      "Low-hanging opportunities specific to your business",
      "The exact first steps to start your automation journey",
      "Risk-free implementation strategy with guaranteed ROI",
    ],
    urgencyMessage: "Next week's sessions are filling up - Secure your spot now!",
  },
  "transformation-aspirant": {
    title: "Welcome, Transformation Aspirant!",
    subtitle: "Congratulations on taking the first step toward business transformation!",
    description: [
      "Your willingness to explore AI automation puts you ahead of 60% of businesses that haven't even started.",
      "Here's something surprising: Businesses at your stage often achieve the most dramatic results from AI automation - we're talking 500%+ ROI in year one.",
      "Why? Because every automation you implement creates compound benefits across your entire operation.",
    ],
    sessionType: "Transformation Strategy Session",
    bulletPoints: [
      "The easiest automation to implement for immediate results",
      "Customized, risk-free roadmap to digital transformation",
      "Guaranteed ROI calculation for your first project",
    ],
    urgencyMessage: "Only 3 transformation sessions available - Reserve yours now!",
  },
}

export default function ResultsPage({ params }: { params: { category: string } }) {
  const category = categories[params.category as keyof typeof categories]

  if (!category) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[#1A2A40] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#FF6B35]">
            {category.title}
          </h1>
          <p className="text-xl text-[#FF6B35]">{category.subtitle}</p>
        </div>

        <div className="space-y-6">
          {category.description.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-lg">
            Book your{" "}
            <span className="text-[#FF6B35] font-semibold">
              {category.sessionType}
            </span>{" "}
            to discover:
          </p>
          <ul className="space-y-3">
            {category.bulletPoints.map((point, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-[#FF6B35] mt-1.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <Link
            href="https://calendly.com/huzaifainspires/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white py-6 text-lg">
              Book Your Session Now
            </Button>
          </Link>
          <p className="text-center text-sm italic">
            ({category.urgencyMessage})
          </p>
        </div>
      </div>
    </main>
  )
}