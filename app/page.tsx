import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1A2A40] flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-white/5 backdrop-blur border-none">
        <CardContent className="p-12 text-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-[#FF6B35] text-white rounded-full text-sm mb-4 font-medium tracking-wide">
              EVERY BUSINESS NEEDS THIS
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-white animate-fade-in font-serif italic">
              The AI Automation
              <br />
              <span className="text-[#FF6B35]">Readiness Quiz™</span>
            </h1>

            <h2 className="text-2xl sm:text-3xl font-bold text-white animate-fade-in">
              How AI-ready are you?
            </h2>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              In just 10 questions, uncover:
            </p>

            <div className="space-y-3">
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed flex items-center justify-center">
                <span className="text-[#FF6B35] mr-2">•</span>
                Your unique automation opportunities worth 6-7 figures
              </p>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed flex items-center justify-center">
                <span className="text-[#FF6B35] mr-2">•</span>
                Which processes are bleeding money through inefficiency
              </p>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed flex items-center justify-center">
                <span className="text-[#FF6B35] mr-2">•</span>
                Where your business stands on the Digital Evolution Scale
              </p>
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed flex items-center justify-center">
                <span className="text-[#FF6B35] mr-2">•</span>
                A personalized roadmap to implement AI without disrupting operations
              </p>
            </div>

            <div className="mt-8">
              <Link href="/survey">
                <Button 
                  className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white px-12 py-8 text-lg rounded-full transition-all hover:scale-105 shadow-lg"
                >
                  Start The Quiz
                </Button>
              </Link>
            </div>

            <p className="text-sm text-gray-300 italic mt-6">
              25% of enterprises utilizing generative AI plan to deploy AI agents by 2025,
              <br />
              with this figure expected to rise to 50% by 2027 - ZDNet
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}