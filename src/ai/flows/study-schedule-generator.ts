// study-schedule-generator.ts
'use server';

/**
 * @fileOverview Generates a personalized study schedule based on enrolled courses and available time.
 *
 * - generateStudySchedule - A function that generates the study schedule.
 * - StudyScheduleInput - The input type for the generateStudySchedule function.
 * - StudyScheduleOutput - The return type for the generateStudySchedule function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const StudyScheduleInputSchema = z.object({
  courses: z
    .array(
      z.string().describe('The name of the course the user is enrolled in.')
    )
    .describe('A list of courses the user is enrolled in.'),
  availableTime: z
    .number()
    .describe(
      'The amount of time the user can dedicate to studying each week, in hours.'
    ),
});
export type StudyScheduleInput = z.infer<typeof StudyScheduleInputSchema>;

const StudyScheduleOutputSchema = z.object({
  schedule: z.string().describe('The generated study schedule.'),
});
export type StudyScheduleOutput = z.infer<typeof StudyScheduleOutputSchema>;

export async function generateStudySchedule(
  input: StudyScheduleInput
): Promise<StudyScheduleOutput> {
  return studyScheduleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'studySchedulePrompt',
  input: {schema: StudyScheduleInputSchema},
  output: {schema: StudyScheduleOutputSchema},
  prompt: `You are a study schedule generator. You will receive a list of courses a user is enrolled in and the amount of time they can dedicate to studying each week. You will generate a personalized study schedule that optimizes their learning.

Courses: {{{courses}}}
Available Time: {{{availableTime}}} hours per week

Here is the study schedule:
`,
});

const studyScheduleFlow = ai.defineFlow(
  {
    name: 'studyScheduleFlow',
    inputSchema: StudyScheduleInputSchema,
    outputSchema: StudyScheduleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
