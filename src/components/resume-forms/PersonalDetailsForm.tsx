import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PersonalDetails, ResumeData } from '@/types/resume';
import { User, Mail, Phone, Linkedin, Github, Briefcase } from 'lucide-react';

interface PersonalDetailsFormProps {
  resumeData: ResumeData;
  updatePersonalDetails: (details: PersonalDetails) => void;
}

export const PersonalDetailsForm = ({ resumeData, updatePersonalDetails }: PersonalDetailsFormProps) => {
  const handleChange = (field: keyof PersonalDetails, value: string) => {
    updatePersonalDetails({
      ...resumeData.personalDetails,
      [field]: value
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Personal Details
        </CardTitle>
        <CardDescription>
          Enter your personal information and contact details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="John Doe"
                value={resumeData.personalDetails.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobTitle" className="text-sm font-medium">Job Title *</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="jobTitle"
                placeholder="Software Developer"
                value={resumeData.personalDetails.jobTitle}
                onChange={(e) => handleChange('jobTitle', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={resumeData.personalDetails.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                value={resumeData.personalDetails.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin" className="text-sm font-medium">LinkedIn Profile</Label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="linkedin"
                placeholder="linkedin.com/in/johndoe"
                value={resumeData.personalDetails.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="github" className="text-sm font-medium">GitHub Profile</Label>
            <div className="relative">
              <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="github"
                placeholder="github.com/johndoe"
                value={resumeData.personalDetails.github}
                onChange={(e) => handleChange('github', e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experienceLevel" className="text-sm font-medium">Experience Level</Label>
          <Select
            value={resumeData.personalDetails.experienceLevel}
            onValueChange={(value: 'junior' | 'mid' | 'senior') => handleChange('experienceLevel', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="junior">Junior (0-2 years)</SelectItem>
              <SelectItem value="mid">Mid-level (2-5 years)</SelectItem>
              <SelectItem value="senior">Senior (5+ years)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};