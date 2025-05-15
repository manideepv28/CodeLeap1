import type { CourseCategory, SkillLevel } from '@/types/course';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CourseFiltersProps {
  categories: (CourseCategory | 'all')[];
  skillLevels: (SkillLevel | 'all')[];
  selectedCategory: CourseCategory | 'all';
  onSelectCategory: (category: CourseCategory | 'all') => void;
  selectedSkillLevel: SkillLevel | 'all';
  onSelectSkillLevel: (skillLevel: SkillLevel | 'all') => void;
}

export function CourseFilters({
  categories,
  skillLevels,
  selectedCategory,
  onSelectCategory,
  selectedSkillLevel,
  onSelectSkillLevel,
}: CourseFiltersProps) {
  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Filter Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="category-filter" className="text-sm font-medium mb-2 block">Category</Label>
          <Select
            value={selectedCategory}
            onValueChange={(value) => onSelectCategory(value as CourseCategory | 'all')}
          >
            <SelectTrigger id="category-filter" className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="skill-level-filter" className="text-sm font-medium mb-2 block">Skill Level</Label>
          <Select
            value={selectedSkillLevel}
            onValueChange={(value) => onSelectSkillLevel(value as SkillLevel | 'all')}
          >
            <SelectTrigger id="skill-level-filter" className="w-full">
              <SelectValue placeholder="Select skill level" />
            </SelectTrigger>
            <SelectContent>
              {skillLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level === 'all' ? 'All Skill Levels' : level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
