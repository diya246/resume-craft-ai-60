import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ResumeData, Education } from '@/types/resume';
import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { toast } from 'sonner';

interface EducationFormProps {
  resumeData: ResumeData;
  updateEducation: (education: Education[]) => void;
}

export const EducationForm = ({ resumeData, updateEducation }: EducationFormProps) => {
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    year: '',
    gpa: ''
  });

  const addEducation = () => {
    if (!newEducation.degree.trim() || !newEducation.institution.trim() || !newEducation.year.trim()) {
      toast.error('Please fill in degree, institution, and year');
      return;
    }

    const education: Education = {
      id: crypto.randomUUID(),
      degree: newEducation.degree.trim(),
      institution: newEducation.institution.trim(),
      year: newEducation.year.trim(),
      gpa: newEducation.gpa.trim() || undefined
    };

    updateEducation([...resumeData.education, education]);
    setNewEducation({ degree: '', institution: '', year: '', gpa: '' });
    toast.success('Education added successfully');
  };

  const removeEducation = (id: string) => {
    updateEducation(resumeData.education.filter(edu => edu.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-primary" />
          Education
        </CardTitle>
        <CardDescription>
          Add your educational background, degrees, and certifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="degree">Degree / Certification *</Label>
              <Input
                id="degree"
                placeholder="e.g., Bachelor of Science in Computer Science"
                value={newEducation.degree}
                onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="institution">Institution *</Label>
              <Input
                id="institution"
                placeholder="e.g., University of Technology"
                value={newEducation.institution}
                onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="year">Year of Graduation *</Label>
              <Input
                id="year"
                placeholder="e.g., 2020 or 2018-2022"
                value={newEducation.year}
                onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="gpa">GPA (Optional)</Label>
              <Input
                id="gpa"
                placeholder="e.g., 3.8/4.0"
                value={newEducation.gpa}
                onChange={(e) => setNewEducation({ ...newEducation, gpa: e.target.value })}
              />
            </div>
          </div>
          
          <Button onClick={addEducation} className="w-full md:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </div>

        {resumeData.education.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Education Entries</h4>
            <div className="space-y-3">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="p-4 border rounded-lg bg-gradient-card">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground">{edu.degree}</h5>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-sm text-muted-foreground">{edu.year}</span>
                        {edu.gpa && (
                          <span className="text-sm text-primary font-medium">GPA: {edu.gpa}</span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(edu.id)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {resumeData.education.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No education entries yet. Add your first degree or certification above.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};