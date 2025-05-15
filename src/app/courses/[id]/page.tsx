'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import type { Course, Lesson } from '@/types/course';
import { dummyCourses } from '@/lib/dummy-data';
import { VideoPlayer } from '@/components/courses/video-player';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, PlayCircle, Clock, Users, Star, BookOpen, BarChart, Tag, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function CourseDetailPage() {
  const params = useParams();
  const courseId = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      // Simulate API call
      setTimeout(() => {
        const foundCourse = dummyCourses.find((c) => c.id === courseId);
        if (foundCourse) {
          setCourse(foundCourse);
          if (foundCourse.lessons && foundCourse.lessons.length > 0) {
            setSelectedLesson(foundCourse.lessons[0]);
          }
        } else {
          // When course not found, set course to null and stop loading
          setCourse(null);
        }
        setIsLoading(false);
      }, 500);
    } else {
      setIsLoading(false); // No courseId, stop loading
    }
  }, [courseId]);

  useEffect(() => {
    // If course is loaded and becomes null (not found), then trigger notFound()
    if (!isLoading && !course && courseId) {
      notFound();
    }
  }, [isLoading, course, courseId]);


  if (isLoading) {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-40 mb-6" /> {/* Back button */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="aspect-video w-full rounded-lg" /> {/* Video Player */}
            <Card className="shadow-lg">
              <CardHeader>
                <Skeleton className="h-10 w-3/4" /> {/* Course Title */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <Skeleton className="h-6 w-24 rounded-md" />
                  <Skeleton className="h-6 w-24 rounded-md" />
                  <Skeleton className="h-6 w-20 rounded-md" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-5 w-full mb-2" /> {/* Description line 1 */}
                <Skeleton className="h-5 w-full mb-2" /> {/* Description line 2 */}
                <Skeleton className="h-5 w-3/4 mb-4" /> {/* Description line 3 */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-5 w-40" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Skeleton className="h-12 w-full rounded-md" /> {/* Enroll Button */}
            <Card className="shadow-lg">
                <CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader>
                <CardContent className="space-y-3">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }
  
  // If after loading, course is still null (and notFound hasn't been triggered yet), show notFound.
  // This handles cases where courseId might be invalid from the start.
  if (!course) {
     notFound();
  }


  return (
    <div className="space-y-8">
      <Button variant="outline" asChild className="mb-6 shadow">
        <Link href="/courses">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
        </Link>
      </Button>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content: Video Player and Course Details */}
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-xl overflow-hidden border-border/50">
            {selectedLesson ? (
              <VideoPlayer videoId={selectedLesson.videoId} title={selectedLesson.title} />
            ) : course?.lessons && course.lessons.length > 0 && course.lessons[0] ? (
                 // Fallback to first lesson if selectedLesson is null but lessons exist
                <VideoPlayer videoId={course.lessons[0].videoId} title={course.lessons[0].title} />
            ) : (
              <div className="aspect-video bg-muted flex items-center justify-center rounded-lg">
                <div className="text-center text-muted-foreground">
                    <PlayCircle className="mx-auto h-16 w-16 mb-2" />
                    <p>Select a lesson to start watching.</p>
                </div>
              </div>
            )}
          </Card>

          <Card className="shadow-xl border-border/50">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary">{course.title}</CardTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="secondary"><Tag className="mr-1 h-3 w-3"/>{course.category}</Badge>
                <Badge variant="secondary"><BarChart className="mr-1 h-3 w-3"/>{course.skillLevel}</Badge>
                {course.instructor && <Badge variant="secondary"><User className="mr-1 h-3 w-3"/>By {course.instructor}</Badge>}
                 {course.rating && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    {course.rating.toFixed(1)}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{course.longDescription || course.description}</p>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-foreground">
                {course.duration && <p className="flex items-center"><Clock className="mr-2 h-4 w-4 text-accent"/> Duration: {course.duration}</p>}
                {course.lessons && <p className="flex items-center"><BookOpen className="mr-2 h-4 w-4 text-accent"/> Lessons: {course.lessons.length}</p>}
                {course.enrollmentCount && <p className="flex items-center"><Users className="mr-2 h-4 w-4 text-accent"/> {course.enrollmentCount.toLocaleString()} students</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Enroll Button and Lesson List */}
        <div className="space-y-6">
          <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-md">
            Enroll in Course
          </Button>

          {course.lessons && course.lessons.length > 0 && (
            <Card className="shadow-xl border-border/50">
              <CardHeader>
                <CardTitle className="text-xl">Course Content</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible defaultValue={selectedLesson?.id || (course.lessons[0]?.id) } className="w-full">
                  {course.lessons.map((lesson, index) => (
                    <AccordionItem value={lesson.id} key={lesson.id}>
                      <AccordionTrigger
                        className={`py-3 px-2 rounded-md text-left hover:bg-muted/50 data-[state=open]:bg-accent/10 ${selectedLesson?.id === lesson.id ? 'bg-accent/10 text-accent font-semibold' : ''}`}
                        onClick={() => setSelectedLesson(lesson)}
                      >
                        <div className="flex items-center w-full">
                           {selectedLesson?.id === lesson.id ? <CheckCircle className="h-5 w-5 mr-3 text-accent shrink-0"/> : <PlayCircle className="h-5 w-5 mr-3 text-muted-foreground shrink-0"/>}
                          <span className="flex-1 truncate">
                            {index + 1}. {lesson.title}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-10 pr-2 pb-2 text-sm text-muted-foreground">
                        <p className="flex items-center mb-1"><Clock size={14} className="mr-1.5" /> {lesson.duration}</p>
                        {lesson.description && <p className="mb-2">{lesson.description}</p>}
                         <Button variant="link" size="sm" className="p-0 h-auto text-accent" onClick={() => setSelectedLesson(lesson)}>
                           Watch Now
                         </Button>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
