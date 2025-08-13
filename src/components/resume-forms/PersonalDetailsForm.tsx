import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PersonalDetails, ResumeData } from '@/types/resume';
import { User, Mail, Phone, Linkedin, Github, Briefcase } from 'lucide-react';
import { ProfilePhotoUpload } from '@/components/ProfilePhotoUpload';
import { FormFieldIndicator } from '@/components/FormFieldIndicator';

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

  const handlePhotoChange = (photo: string | undefined) => {
    updatePersonalDetails({
      ...resumeData.personalDetails,
      profilePhoto: photo
    });
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-numeric characters
    const phoneNumber = value.replace(/\D/g, '');
    
    // Format as (xxx) xxx-xxxx
    if (phoneNumber.length >= 6) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    } else if (phoneNumber.length >= 3) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return phoneNumber;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    handleChange('phone', formatted);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFieldCompleted = (field: keyof PersonalDetails) => {
    const value = resumeData.personalDetails[field];
    if (field === 'email') {
      return value && validateEmail(value);
    }
    return value && value.trim().length > 0;
  };

  return (
    <Card className="animate-fade-in">
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
        {/* Profile Photo Section */}
        <div className="flex justify-center animate-scale-in">
          <ProfilePhotoUpload
            profilePhoto={resumeData.personalDetails.profilePhoto}
            onPhotoChange={handlePhotoChange}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
              Full Name *
              <FormFieldIndicator isCompleted={isFieldCompleted('name')} />
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                placeholder="John Doe"
                value={resumeData.personalDetails.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="pl-10 transition-all duration-300 focus:shadow-medium"
              />
            </div>
          </div>

          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Label htmlFor="jobTitle" className="text-sm font-medium flex items-center gap-2">
              Job Title *
              <FormFieldIndicator isCompleted={isFieldCompleted('jobTitle')} />
            </Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="jobTitle"
                placeholder="Software Developer"
                value={resumeData.personalDetails.jobTitle}
                onChange={(e) => handleChange('jobTitle', e.target.value)}
                className="pl-10 transition-all duration-300 focus:shadow-medium"
              />
            </div>
          </div>

          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
              Email Address *
              <FormFieldIndicator isCompleted={isFieldCompleted('email')} />
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={resumeData.personalDetails.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className={`pl-10 transition-all duration-300 focus:shadow-medium ${
                  resumeData.personalDetails.email && !validateEmail(resumeData.personalDetails.email) 
                    ? 'border-destructive focus:border-destructive' 
                    : ''
                }`}
              />
            </div>
          </div>

          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
              Phone Number
              <FormFieldIndicator isCompleted={isFieldCompleted('phone')} />
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                placeholder="(555) 123-4567"
                value={resumeData.personalDetails.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className="pl-10 transition-all duration-300 focus:shadow-medium"
                maxLength={14}
              />
            </div>
          </div>

          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <Label htmlFor="linkedin" className="text-sm font-medium flex items-center gap-2">
              LinkedIn Profile
              <FormFieldIndicator isCompleted={isFieldCompleted('linkedin')} />
            </Label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="linkedin"
                placeholder="linkedin.com/in/johndoe"
                value={resumeData.personalDetails.linkedin}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                className="pl-10 transition-all duration-300 focus:shadow-medium"
              />
            </div>
          </div>

          <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Label htmlFor="github" className="text-sm font-medium flex items-center gap-2">
              GitHub Profile
              <FormFieldIndicator isCompleted={isFieldCompleted('github')} />
            </Label>
            <div className="relative">
              <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="github"
                placeholder="github.com/johndoe"
                value={resumeData.personalDetails.github}
                onChange={(e) => handleChange('github', e.target.value)}
                className="pl-10 transition-all duration-300 focus:shadow-medium"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <Label htmlFor="experienceLevel" className="text-sm font-medium flex items-center gap-2">
            Experience Level
            <FormFieldIndicator isCompleted={isFieldCompleted('experienceLevel')} />
          </Label>
          <Select
            value={resumeData.personalDetails.experienceLevel}
            onValueChange={(value: 'junior' | 'mid' | 'senior') => handleChange('experienceLevel', value)}
          >
            <SelectTrigger className="transition-all duration-300 focus:shadow-medium">
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