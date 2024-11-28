import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#1A2A40] flex flex-col items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-white/5 backdrop-blur border-none">
        <CardContent className="p-12 text-center">
          <div className="space-y-8 mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-white animate-fade-in">
              Unlock Your Business Potential with AI Automation
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Discover how AI can transform your operations, boost efficiency, and drive growth. Take our quick assessment to see where you stand.
            </p>
          </div>
          <Link href="/survey">
            <Button 
              className="bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white px-8 py-6 text-lg rounded-full transition-transform hover:scale-105"
            >
              Start Your Assessment
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  )
}