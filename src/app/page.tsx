import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BookOpen, CalendarCheck, Rocket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 bg-gradient-to-br from-primary/10 via-background to-background rounded-lg shadow-lg">
        <div className="container mx-auto px-4">
          <Rocket className="mx-auto h-16 w-16 text-accent mb-6 animate-bounce" />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-primary">
            Welcome to CodeLeap!
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Your ultimate platform to learn coding, track your progress, and create personalized study plans. Start your journey to code mastery today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-md transition-transform hover:scale-105">
              <Link href="/courses">
                Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="shadow-md transition-transform hover:scale-105">
              <Link href="/scheduler">
                Create Study Plan <CalendarCheck className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-10 text-primary">Why CodeLeap?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="p-3 bg-accent/10 rounded-md w-fit mb-3">
                <BookOpen className="h-8 w-8 text-accent" />
              </div>
              <CardTitle className="text-xl">Diverse Course Catalog</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Explore a wide range of courses in web development, data science, AI, and more. Filter by category and skill level to find the perfect match for you.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="p-3 bg-primary/10 rounded-md w-fit mb-3">
                <CalendarCheck className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl">AI-Powered Scheduler</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our intelligent Study Scheduler helps you create personalized study plans based on your enrolled courses and available time, powered by generative AI.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
               <div className="p-3 bg-green-500/10 rounded-md w-fit mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
               </div>
              <CardTitle className="text-xl">Track Your Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Stay motivated by monitoring your learning advancement. See how far you've come and what's next on your coding journey. (Coming Soon!)
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Placeholder image section */}
       <section className="py-12 text-center">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">Learn Visually</h2>
          <Image 
            src="https://placehold.co/800x400.png" 
            alt="Visual learning placeholder" 
            width={800} 
            height={400} 
            className="rounded-lg shadow-lg mx-auto"
            data-ai-hint="education coding"
          />
          <p className="text-muted-foreground mt-4">Engage with high-quality video content integrated seamlessly into your lessons.</p>
       </section>
    </div>
  );
}
