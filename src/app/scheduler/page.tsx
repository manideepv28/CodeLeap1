'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { generateStudySchedule, type StudyScheduleInput, type StudyScheduleOutput } from '@/ai/flows/study-schedule-generator';
import { Loader2, AlertTriangle, CheckCircle, CalendarDays } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const scheduleFormSchema = z.object({
  courses: z.string().min(1, "Please list at least one course."),
  availableTime: z.coerce.number().min(1, "Please enter a valid number of hours (at least 1).").max(100, "Available time cannot exceed 100 hours."),
});

type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;

export default function SchedulerPage() {
  const [generatedSchedule, setGeneratedSchedule] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      courses: '',
      availableTime: 10,
    },
  });

  const onSubmit: SubmitHandler<ScheduleFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setGeneratedSchedule(null);

    const courseList = data.courses.split(',').map(course => course.trim()).filter(course => course.length > 0);
    if (courseList.length === 0) {
      form.setError("courses", { type: "manual", message: "Please provide a comma-separated list of courses." });
      setIsLoading(false);
      return;
    }

    const input: StudyScheduleInput = {
      courses: courseList,
      availableTime: data.availableTime,
    };

    try {
      const result: StudyScheduleOutput = await generateStudySchedule(input);
      setGeneratedSchedule(result.schedule);
    } catch (e) {
      console.error("Error generating schedule:", e);
      setError("Failed to generate study schedule. The AI model might be temporarily unavailable or there was an issue with the input. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="text-center">
        <CalendarDays className="mx-auto h-16 w-16 text-accent mb-4" />
        <h1 className="text-4xl font-bold text-primary mb-3">AI Study Scheduler</h1>
        <p className="text-lg text-muted-foreground">
          Let our AI craft a personalized study schedule based on your courses and available time.
        </p>
      </section>

      <Card className="shadow-xl border-border/60">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle>Create Your Study Plan</CardTitle>
              <CardDescription>Enter your courses and weekly study hours to get a custom schedule.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="courses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="courses">Courses (comma-separated)</FormLabel>
                    <FormControl>
                      <Textarea
                        id="courses"
                        placeholder="e.g., Introduction to Python, Web Development Basics, Data Structures"
                        rows={3}
                        {...field}
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="availableTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="availableTime">Weekly Study Hours</FormLabel>
                    <FormControl>
                      <Input
                        id="availableTime"
                        type="number"
                        placeholder="e.g., 15"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Schedule...
                  </>
                ) : (
                  'Generate Schedule'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {error && (
        <Alert variant="destructive" className="shadow-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {generatedSchedule && (
        <Card className="shadow-xl border-accent/50 bg-gradient-to-br from-accent/5 via-background to-background">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-8 w-8 text-accent" />
              <CardTitle className="text-2xl text-accent">Your Personalized Study Schedule</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap p-4 bg-muted/50 rounded-md border border-border/50">
              {generatedSchedule}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
