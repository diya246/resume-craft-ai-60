import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ResumeData, Skill, Achievement, Language } from '@/types/resume';
import { Plus, Trash2, Target, Globe, Award } from 'lucide-react';
import { toast } from 'sonner';

interface SkillsFormProps {
  resumeData: ResumeData;
  updateSkillsAndAchievements: (skills: Skill[], achievements: Achievement[], languages: Language[]) => void;
}

export const SkillsForm = ({ resumeData, updateSkillsAndAchievements }: SkillsFormProps) => {
  const [newSkill, setNewSkill] = useState({ name: '', level: 'intermediate' as const });
  const [newAchievement, setNewAchievement] = useState({ title: '', description: '' });
  const [newLanguage, setNewLanguage] = useState({ name: '', proficiency: 'conversational' as const });

  const addSkill = () => {
    if (!newSkill.name.trim()) {
      toast.error('Please enter a skill name');
      return;
    }

    const skill: Skill = {
      id: crypto.randomUUID(),
      name: newSkill.name.trim(),
      level: newSkill.level
    };

    updateSkillsAndAchievements(
      [...resumeData.skills, skill],
      resumeData.achievements,
      resumeData.languages
    );

    setNewSkill({ name: '', level: 'intermediate' });
    toast.success('Skill added successfully');
  };

  const removeSkill = (id: string) => {
    updateSkillsAndAchievements(
      resumeData.skills.filter(skill => skill.id !== id),
      resumeData.achievements,
      resumeData.languages
    );
  };

  const addAchievement = () => {
    if (!newAchievement.title.trim() || !newAchievement.description.trim()) {
      toast.error('Please fill in both title and description');
      return;
    }

    const achievement: Achievement = {
      id: crypto.randomUUID(),
      title: newAchievement.title.trim(),
      description: newAchievement.description.trim()
    };

    updateSkillsAndAchievements(
      resumeData.skills,
      [...resumeData.achievements, achievement],
      resumeData.languages
    );

    setNewAchievement({ title: '', description: '' });
    toast.success('Achievement added successfully');
  };

  const removeAchievement = (id: string) => {
    updateSkillsAndAchievements(
      resumeData.skills,
      resumeData.achievements.filter(achievement => achievement.id !== id),
      resumeData.languages
    );
  };

  const addLanguage = () => {
    if (!newLanguage.name.trim()) {
      toast.error('Please enter a language name');
      return;
    }

    const language: Language = {
      id: crypto.randomUUID(),
      name: newLanguage.name.trim(),
      proficiency: newLanguage.proficiency
    };

    updateSkillsAndAchievements(
      resumeData.skills,
      resumeData.achievements,
      [...resumeData.languages, language]
    );

    setNewLanguage({ name: '', proficiency: 'conversational' });
    toast.success('Language added successfully');
  };

  const removeLanguage = (id: string) => {
    updateSkillsAndAchievements(
      resumeData.skills,
      resumeData.achievements,
      resumeData.languages.filter(language => language.id !== id)
    );
  };

  return (
    <div className="space-y-8">
      {/* Skills Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Technical Skills
          </CardTitle>
          <CardDescription>
            Add your technical skills and rate your proficiency level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="skillName">Skill Name</Label>
              <Input
                id="skillName"
                placeholder="e.g., JavaScript, React, Python"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              />
            </div>
            <div className="w-40">
              <Label htmlFor="skillLevel">Proficiency</Label>
              <Select
                value={newSkill.level}
                onValueChange={(value: any) => setNewSkill({ ...newSkill, level: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addSkill}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {resumeData.skills.map((skill) => (
              <Badge key={skill.id} variant="secondary" className="flex items-center gap-2">
                {skill.name} ({skill.level})
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Key Achievements
          </CardTitle>
          <CardDescription>
            Highlight your professional achievements and accomplishments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="achievementTitle">Achievement Title</Label>
              <Input
                id="achievementTitle"
                placeholder="e.g., Led team to increase sales by 25%"
                value={newAchievement.title}
                onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="achievementDescription">Description</Label>
              <Textarea
                id="achievementDescription"
                placeholder="Provide details about this achievement..."
                value={newAchievement.description}
                onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                rows={3}
              />
            </div>
            <Button onClick={addAchievement}>
              <Plus className="h-4 w-4 mr-2" />
              Add Achievement
            </Button>
          </div>

          <div className="space-y-3">
            {resumeData.achievements.map((achievement) => (
              <div key={achievement.id} className="p-3 border rounded-lg bg-gradient-card">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAchievement(achievement.id)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Languages Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Languages
          </CardTitle>
          <CardDescription>
            List the languages you speak and your proficiency level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="languageName">Language</Label>
              <Input
                id="languageName"
                placeholder="e.g., English, Spanish, French"
                value={newLanguage.name}
                onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              />
            </div>
            <div className="w-40">
              <Label htmlFor="languageProficiency">Proficiency</Label>
              <Select
                value={newLanguage.proficiency}
                onValueChange={(value: any) => setNewLanguage({ ...newLanguage, proficiency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="conversational">Conversational</SelectItem>
                  <SelectItem value="fluent">Fluent</SelectItem>
                  <SelectItem value="native">Native</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addLanguage}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {resumeData.languages.map((language) => (
              <Badge key={language.id} variant="secondary" className="flex items-center gap-2">
                {language.name} ({language.proficiency})
                <button
                  onClick={() => removeLanguage(language.id)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};