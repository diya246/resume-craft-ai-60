import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeData } from '@/types/resume';
import { Brain, FileText, Sparkles } from 'lucide-react';
import { generateExecutiveSummary } from '@/lib/gemini';
import { toast } from 'sonner';

interface SummaryFormProps {
  resumeData: ResumeData;
  updateSummary: (summary: string) => void;
}

export const SummaryForm = ({ resumeData, updateSummary }: SummaryFormProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSummary = async () => {
    if (!resumeData.personalDetails.name || !resumeData.personalDetails.jobTitle) {
      toast.error('Please complete personal details first');
      return;
    }

    setIsGenerating(true);
    try {
      const summary = await generateExecutiveSummary(resumeData.personalDetails);
      updateSummary(summary);
      toast.success('Summary generated successfully!');
    } catch (error) {
      toast.error('Failed to generate summary. Please check your API key.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Executive Summary
          </CardTitle>
          <CardDescription>
            Write or generate a compelling professional summary that highlights your key strengths and career objectives
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <Button
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              variant="hero"
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-spin" />
                  Generating Summary...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate AI Summary
                </>
              )}
            </Button>

            <Textarea
              placeholder="Enter your professional summary here..."
              value={resumeData.summary}
              onChange={(e) => updateSummary(e.target.value)}
              className="min-h-[200px]"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>
            Here's how your summary will appear on your resume
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-gradient-card rounded-lg border">
            <h3 className="font-bold text-lg mb-2">{resumeData.personalDetails.name || 'Your Name'}</h3>
            <p className="text-muted-foreground text-sm mb-4">{resumeData.personalDetails.jobTitle || 'Your Job Title'}</p>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-sm uppercase tracking-wide text-primary">Executive Summary</h4>
              <p className="text-sm leading-relaxed">
                {resumeData.summary || 'Your professional summary will appear here. Use the AI generator or write your own compelling summary that highlights your key strengths and career objectives.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};