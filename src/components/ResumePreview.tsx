import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResumeData } from '@/types/resume';
import { Download, Eye, Mail, Phone, Linkedin, Github } from 'lucide-react';
import { generateResumePDF } from '@/lib/pdf-generator';
import { toast } from 'sonner';

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export const ResumePreview = ({ resumeData }: ResumePreviewProps) => {
  const handleDownloadPDF = async () => {
    try {
      await generateResumePDF(resumeData);
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              Resume Preview
            </CardTitle>
            <CardDescription>
              Review your resume before downloading
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div id="resume-preview" className="bg-white text-black p-12 min-h-[800px] shadow-lg">
              {/* Header */}
              <div className="border-b-2 border-gray-300 pb-8 mb-8">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-6">
                    {resumeData.personalDetails.profilePhoto && (
                      <div className="flex-shrink-0">
                        <img
                          src={resumeData.personalDetails.profilePhoto}
                          alt="Profile"
                          className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                        />
                      </div>
                    )}
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {resumeData.personalDetails.name || 'Your Name'}
                      </h1>
                      <p className="text-lg text-gray-600">
                        {resumeData.personalDetails.jobTitle || 'Your Job Title'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-gray-600 space-y-1">
                    {resumeData.personalDetails.email && (
                      <div className="flex items-center justify-end gap-2">
                        <Mail className="h-4 w-4" />
                        {resumeData.personalDetails.email}
                      </div>
                    )}
                    {resumeData.personalDetails.phone && (
                      <div className="flex items-center justify-end gap-2">
                        <Phone className="h-4 w-4" />
                        {resumeData.personalDetails.phone}
                      </div>
                    )}
                    {resumeData.personalDetails.linkedin && (
                      <div className="flex items-center justify-end gap-2">
                        <Linkedin className="h-4 w-4" />
                        {resumeData.personalDetails.linkedin}
                      </div>
                    )}
                    {resumeData.personalDetails.github && (
                      <div className="flex items-center justify-end gap-2">
                        <Github className="h-4 w-4" />
                        {resumeData.personalDetails.github}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Executive Summary */}
              {resumeData.summary && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
                    Executive Summary
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {resumeData.summary}
                  </p>
                  <hr className="mt-6 border-gray-200" />
                </div>
              )}

              {/* Skills */}
              {resumeData.skills.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
                    Technical Skills
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded text-sm"
                      >
                        {skill.name} ({skill.level})
                      </span>
                    ))}
                  </div>
                  <hr className="mt-6 border-gray-200" />
                </div>
              )}

              {/* Achievements */}
              {resumeData.achievements.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
                    Key Achievements
                  </h2>
                  <ul className="space-y-4">
                    {resumeData.achievements.map((achievement) => (
                      <li key={achievement.id}>
                        <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed mt-1">
                          {achievement.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <hr className="mt-6 border-gray-200" />
                </div>
              )}

              {/* Languages */}
              {resumeData.languages.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
                    Languages
                  </h2>
                  <div className="flex flex-wrap gap-4">
                    {resumeData.languages.map((language) => (
                      <span key={language.id} className="text-gray-700">
                        {language.name} ({language.proficiency})
                      </span>
                    ))}
                  </div>
                  <hr className="mt-6 border-gray-200" />
                </div>
              )}

              {/* Education */}
              {resumeData.education.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4 uppercase tracking-wide border-b-2 border-gray-300 pb-2">
                    Education
                  </h2>
                  <div className="space-y-4">
                    {resumeData.education.map((edu) => (
                      <div key={edu.id}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                            <p className="text-gray-700">{edu.institution}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-600">{edu.year}</p>
                            {edu.gpa && (
                              <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Download Resume</CardTitle>
            <CardDescription>
              Your resume is ready! Download it as a professional PDF.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleDownloadPDF}
              variant="hero"
              className="w-full"
              size="lg"
            >
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            
            <div className="text-sm text-muted-foreground space-y-2">
              <p>✓ Professional format</p>
              <p>✓ ATS-friendly layout</p>
              <p>✓ Ready to submit</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};