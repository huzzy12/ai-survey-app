import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from 'next';

type Category = {
  title: string;
  subtitle: string;
  description: string[];
  bulletPoints: string[];
  urgencyMessage: string;
  sessionType: string;
  ctaText: string;
};

type Categories = {
  [key: string]: Category;
};

type Props = {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const localCategories: Categories = {
  "efficiency-champion": {
    title: "Congrats, Efficiency Champion!",
    subtitle: "You're among the top 3% of businesses leveraging automation and AI.",
    description: [
      "Your sophisticated approach to digital transformation positions you perfectly for exponential growth.",
      "But here's what most Efficiency Champions don't realize: There's still untapped potential in your automation strategy that could double your current efficiency gains.",
      "Want to discover these advanced automation strategies? I help companies like yours unlock an additional 30% productivity boost through strategic AI implementation.",
    ],
    bulletPoints: [
      "Advanced AI integration opportunities unique to market leaders",
      "AI agents for specialized tasks trained on your proprietary data",
      "Custom automation solutions for complex workflows",
    ],
    urgencyMessage: "Demand is through the roof these days - Reserve your spot now!",
    sessionType: "Free Strategy Session",
    ctaText: "Book your",
  },
  "tech-savvy-optimizer": {
    title: "Well Done, Tech-Savvy Optimizer!",
    subtitle: "Impressive!",
    description: [
      "Your business shows strong potential for AI automation excellence. You're already ahead of 72% of businesses in your industry.",
      "Here's the exciting part: You're perfectly positioned to leverage AI automation for exponential growth. The gap between where you are and market leaders is smaller than you think.",
      "I help Tech-Savvy Optimizers like you bridge this gap in just 90 days.",
    ],
    bulletPoints: [
      "Quick-win automation opportunities specific to your score",
      "Strategic implementation roadmap for rapid results",
      "ROI calculation for your next automation project",
    ],
    urgencyMessage: "Don't wait! Take action now to secure your future success.",
    sessionType: "Free Automation Acceleration Session",
    ctaText: "Book your",
  },
  "growth-seeker": {
    title: "Great Job, Growth Seeker!",
    subtitle: "You're on the right path!",
    description: [
      "You've identified a massive opportunity for transformation. Your business has the perfect foundation for AI automation implementation.",
      "Here's what's interesting: Companies at your automation stage typically see the fastest ROI from AI implementation - often 300% or more in the first year.",
      "I specialize in helping Growth Seekers like you implement the right automation solutions for maximum impact.",
    ],
    bulletPoints: [
      "Identify your highest-impact automation opportunities",
      "Custom implementation plan for your business",
      "Expected ROI calculation for each solution",
    ],
    urgencyMessage: "Limited availability this week - Book now!",
    sessionType: "Free Growth Strategy Session",
    ctaText: "Book your",
  },
  "transformation-aspirant": {
    title: "Excellent First Step, Transformation Aspirant!",
    subtitle: "You're Ready for Transformation",
    description: [
      "You've just taken the most important step: Recognizing the power of AI automation for your business.",
      "Here's something fascinating: Businesses at your stage often see the most dramatic improvements - we're talking 5x efficiency gains in year one.",
      "I specialize in helping businesses like yours implement the right automation solutions without disrupting your current operations.",
    ],
    bulletPoints: [
      "Risk-free automation implementation strategy",
      "Quick-win opportunities for immediate results",
      "Step-by-step transformation roadmap",
    ],
    urgencyMessage: "Limited spots for new clients - Reserve yours now!",
    sessionType: "Free Transformation Strategy Session",
    ctaText: "Book your",
  },
};

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryData = localCategories[resolvedParams.category];
  
  if (!categoryData) {
    return { title: "Not Found" };
  }
  
  return { title: categoryData.title };
}

export default async function ResultsPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const categoryData = localCategories[resolvedParams.category];
  const score = typeof resolvedSearchParams.score === 'string' 
    ? parseInt(resolvedSearchParams.score) 
    : 0;

  if (!categoryData) {
    return <div>Category not found</div>;
  }

  return (
    <main className="min-h-screen bg-[#1A2A40] text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#FF6B35]">
            {categoryData.title}
          </h1>
          <h2 className="text-2xl font-semibold text-white">{categoryData.subtitle}</h2>
          
          {/* Score Display */}
          <div className="bg-white/10 rounded-lg p-6 my-8">
            <h2 className="text-3xl font-bold text-white mb-4">Your Automation Readiness Score</h2>
            <div className="relative h-4 bg-gray-300 rounded-full">
              <div 
                className="absolute h-4 bg-[#FF6B35] rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${score}%` }}
              />
            </div>
            <div className="mt-2 text-center">
              <span className="text-4xl font-bold text-[#FF6B35]">{score}</span>
              <span className="text-2xl text-white">/100</span>
            </div>
          </div>

          {categoryData.description.map((desc, index) => (
            <p key={index} className="text-gray-300">{desc}</p>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-4">What we&apos;ll explore:</h3>
          <ul className="space-y-2">
            {categoryData.bulletPoints.map((point, index) => (
              <li key={index} className="flex items-start text-gray-300">
                <span className="mr-2 mt-1.5">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8">
          <Link
            href="https://calendly.com/huzaifainspires/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white py-6 text-lg">
              Book Your FREE Session Now!
            </Button>
          </Link>
          <p className="text-[#FF6B35] text-center italic mt-4">
            ({categoryData.urgencyMessage})
          </p>
        </div>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  return Object.keys(localCategories).map((category) => ({
    category,
  }));
}