import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { User, Mail, BookOpen, Edit3, Settings, Gift } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  // Dummy user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatarUrl: "https://placehold.co/100x100.png",
    dataAiHint: "profile person",
    bio: "Passionate learner and aspiring full-stack developer. Currently exploring Next.js and AI, and enjoying the journey with CodeLeap!",
    enrolledCourses: [
      { id: "1", title: "Next.js for Beginners", progress: 75, imageUrl: "https://placehold.co/300x150.png", dataAiHint: "technology abstract" },
      { id: "5", title: "Introduction to Machine Learning", progress: 40, imageUrl: "https://placehold.co/300x150.png", dataAiHint: "AI abstract" },
      { id: "6", title: "Full-Stack Web Development Bootcamp", progress: 15, imageUrl: "https://placehold.co/300x150.png", dataAiHint: "coding screen" },
    ],
  };

  return (
    <div className="space-y-10">
      <section className="bg-primary/5 p-6 md:p-8 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 md:h-28 md:w-28 border-4 border-accent shadow-lg">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint={user.dataAiHint} />
            <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
              {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">{user.name}</h1>
            <p className="text-muted-foreground flex items-center justify-center md:justify-start mt-1">
              <Mail className="mr-2 h-4 w-4" /> {user.email}
            </p>
             <Button variant="outline" size="sm" className="mt-4 shadow-sm">
                <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
        </div>
        {user.bio && <p className="mt-6 text-foreground/80 italic text-center md:text-left">{user.bio}</p>}
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-primary mb-6">My Learning Dashboard</h2>
        {user.enrolledCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.enrolledCourses.map((course) => (
              <Card key={course.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <CardHeader className="flex flex-row items-start gap-4 p-4">
                  <Image src={course.imageUrl} alt={course.title} width={80} height={50} className="h-14 w-20 rounded-md object-cover" data-ai-hint={course.dataAiHint} />
                  <div className="flex-1">
                    <CardTitle className="text-md font-semibold leading-tight hover:text-accent transition-colors">
                        <Link href={`/courses/${course.id}`}>{course.title}</Link>
                    </CardTitle>
                    <CardDescription className="text-xs mt-1">Progress: {course.progress}%</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex-grow">
                  <Progress value={course.progress} className="h-2 [&>div]:bg-accent" aria-label={`${course.title} progress ${course.progress}%`} />
                </CardContent>
                <CardContent className="p-4 pt-2">
                   <Button variant="link" size="sm" asChild className="p-0 text-accent text-xs">
                      <Link href={`/courses/${course.id}`}>Continue Learning &rarr;</Link>
                   </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-10 shadow-md">
            <CardContent>
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No Courses Yet</h3>
              <p className="text-muted-foreground mb-4">Start your learning journey by enrolling in a course.</p>
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      <section className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="flex items-center text-xl"><Settings className="mr-3 h-5 w-5 text-primary"/>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Manage your profile details, notification preferences, and password.</p>
                 <Button variant="outline" className="mt-4" disabled>
                    Go to Settings
                </Button>
            </CardContent>
        </Card>
         <Card className="shadow-md">
            <CardHeader>
                <CardTitle className="flex items-center text-xl"><Gift className="mr-3 h-5 w-5 text-primary"/>Achievements & Badges</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">View your earned badges and certificates. (Feature coming soon)</p>
                 <Button variant="outline" className="mt-4" disabled>
                    View Achievements
                </Button>
            </CardContent>
        </Card>
      </section>
    </div>
  );
}
