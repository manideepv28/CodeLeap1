'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Course, CourseCategory, SkillLevel } from '@/types/course';
import { dummyCourses } from '@/lib/dummy-data';
import { CourseCard } from '@/components/courses/course-card';
import { CourseFilters } from '@/components/courses/course-filters';
import { Input } from '@/components/ui/input';
import { Search, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory | 'all'>('all');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState<SkillLevel | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(dummyCourses);
      setFilteredCourses(dummyCourses);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let tempCourses = courses;

    if (searchTerm) {
      tempCourses = tempCourses.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      tempCourses = tempCourses.filter(course => course.category === selectedCategory);
    }

    if (selectedSkillLevel !== 'all') {
      tempCourses = tempCourses.filter(course => course.skillLevel === selectedSkillLevel);
    }

    setFilteredCourses(tempCourses);
  }, [searchTerm, selectedCategory, selectedSkillLevel, courses]);
  
  const uniqueCategories = useMemo(() => ['all', ...new Set(dummyCourses.map(c => c.category))] as (CourseCategory | 'all')[], []);
  const uniqueSkillLevels = useMemo(() => ['all', ...new Set(dummyCourses.map(c => c.skillLevel))] as (SkillLevel | 'all')[], []);


  return (
    <div className="space-y-8">
      <section className="bg-primary/5 p-8 rounded-lg shadow">
        <h1 className="text-4xl font-bold text-primary mb-4">Explore Our Courses</h1>
        <p className="text-lg text-muted-foreground">
          Find the perfect course to kickstart or advance your coding journey. Filter by category, skill level, or search by keyword.
        </p>
      </section>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Hidden on mobile, shown in Sheet */}
        <aside className="hidden md:block md:w-1/4 lg:w-1/5 space-y-6">
          <h2 className="text-xl font-semibold text-primary border-b pb-2">Filters</h2>
          <CourseFilters
            categories={uniqueCategories}
            skillLevels={uniqueSkillLevels}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedSkillLevel={selectedSkillLevel}
            onSelectSkillLevel={setSelectedSkillLevel}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
            <div className="relative flex-grow w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search courses..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:hidden w-full sm:w-auto">
               <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <ListFilter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-xs bg-background p-6">
                   <h2 className="text-xl font-semibold text-primary border-b pb-2 mb-4">Filters</h2>
                   <CourseFilters
                      categories={uniqueCategories}
                      skillLevels={uniqueSkillLevels}
                      selectedCategory={selectedCategory}
                      onSelectCategory={setSelectedCategory}
                      selectedSkillLevel={selectedSkillLevel}
                      onSelectSkillLevel={setSelectedSkillLevel}
                   />
                </SheetContent>
              </Sheet>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="overflow-hidden shadow-lg">
                  <Skeleton className="h-48 w-full" />
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <Skeleton className="h-10 w-1/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-primary">No Courses Found</h3>
              <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
