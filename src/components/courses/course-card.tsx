import type { Course } from '@/types/course';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Tag, BarChart, Clock, Users, Star } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg border border-border/50">
      <div className="relative h-48 w-full">
        <Image
          src={course.imageUrl}
          alt={course.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={course.dataAiHint || 'abstract technology'}
        />
      </div>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-semibold leading-tight hover:text-primary transition-colors">
            <Link href={`/courses/${course.id}`}>{course.title}</Link>
          </CardTitle>
          {course.rating && (
            <Badge variant="secondary" className="flex items-center gap-1 shrink-0">
              <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
              {course.rating.toFixed(1)}
            </Badge>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs"><Tag className="mr-1 h-3 w-3"/>{course.category}</Badge>
          <Badge variant="outline" className="text-xs"><BarChart className="mr-1 h-3 w-3"/>{course.skillLevel}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pb-4">
        <CardDescription className="text-sm line-clamp-3">{course.description}</CardDescription>
        <div className="mt-3 space-y-1 text-xs text-muted-foreground">
            {course.duration && <p className="flex items-center"><Clock className="mr-1.5 h-3 w-3"/> {course.duration}</p>}
            {course.enrollmentCount && <p className="flex items-center"><Users className="mr-1.5 h-3 w-3"/> {course.enrollmentCount.toLocaleString()} enrolled</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="default" size="sm" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={`/courses/${course.id}`}>
            View Course <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
