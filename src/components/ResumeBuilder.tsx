import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ResumeData, PersonalDetails, Achievement, Skill, Language, Education } from '@/types/resume';
import { PersonalDetailsForm } from './resume-forms/PersonalDetailsForm';
import { SummaryForm } from './resume-forms/SummaryForm';
import { SkillsForm } from './resume-forms/SkillsForm';
import { EducationForm } from './resume-forms/EducationForm';
import { ResumePreview } from './ResumePreview';

interface ResumeBuilderProps {
  onBack: () => void;
}

export const ResumeBuilder = ({ onBack }: ResumeBuilderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalDetails: {
      name: '',
      jobTitle: '',
      email: '',
      phone: '',
      linkedin: '',
      github: '',
      experienceLevel: 'junior'
    },
    summary: '',
    achievements: [],
    skills: [],
    languages: [],
    education: []
  });

  const steps = [
    { title: 'Personal Details', component: PersonalDetailsForm },
    { title: 'Summary', component: SummaryForm },
    { title: 'Skills & Achievements', component: SkillsForm },
    { title: 'Education', component: EducationForm },
    { title: 'Preview', component: ResumePreview }
  ];

  const updatePersonalDetails = (details: PersonalDetails) => {
    setResumeData(prev => ({ ...prev, personalDetails: details }));
  };

  const updateSummary = (summary: string) => {
    setResumeData(prev => ({ ...prev, summary }));
  };

  const updateSkillsAndAchievements = (skills: Skill[], achievements: Achievement[], languages: Language[]) => {
    setResumeData(prev => ({ ...prev, skills, achievements, languages }));
  };

  const updateEducation = (education: Education[]) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return resumeData.personalDetails.name && resumeData.personalDetails.jobTitle && resumeData.personalDetails.email;
      case 1:
        return resumeData.summary.length > 0;
      case 2:
        return resumeData.skills.length > 0;
      case 3:
        return resumeData.education.length > 0;
      default:
        return true;
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button variant="ghost" onClick={onBack} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Resume Builder</h1>
                <p className="text-muted-foreground">Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      index <= currentStep
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className={`ml-2 text-sm font-medium ${index <= currentStep ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {step.title}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 rounded-full ${index < currentStep ? 'bg-primary' : 'bg-muted'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            <CurrentStepComponent
              resumeData={resumeData}
              updatePersonalDetails={updatePersonalDetails}
              updateSummary={updateSummary}
              updateSkillsAndAchievements={updateSkillsAndAchievements}
              updateEducation={updateEducation}
            />
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!canProceed()}
                variant="hero"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};