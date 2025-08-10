import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Upload, Brain, CheckCircle, AlertTriangle } from 'lucide-react';
import { calculateATSScore } from '@/lib/gemini';
import { ATSScore } from '@/types/resume';
import { toast } from 'sonner';

interface ATSCheckerProps {
  onBack: () => void;
}

export const ATSChecker = ({ onBack }: ATSCheckerProps) => {
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      toast.error('Please paste your resume content');
      return;
    }

    setIsAnalyzing(true);
    try {
      const score = await calculateATSScore(resumeText);
      setAtsScore(score);
      toast.success('ATS analysis completed!');
    } catch (error) {
      toast.error('Failed to analyze resume. Please check your API key.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-yellow-600';
    return 'text-destructive';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" onClick={onBack} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">ATS Score Checker</h1>
              <p className="text-muted-foreground">Analyze your resume's compatibility with Applicant Tracking Systems</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload Resume Content
                </CardTitle>
                <CardDescription>
                  Copy and paste your resume content below for analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your resume content here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
                />
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !resumeText.trim()}
                  className="w-full"
                  variant="hero"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Analyze ATS Score
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
                <CardDescription>
                  {atsScore ? 'Your ATS compatibility score and recommendations' : 'Results will appear here after analysis'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {atsScore ? (
                  <div className="space-y-6">
                    {/* Score Display */}
                    <div className="text-center">
                      <div className={`text-4xl font-bold ${getScoreColor(atsScore.score)} mb-2`}>
                        {atsScore.score}/100
                      </div>
                      <div className="text-lg font-medium text-muted-foreground mb-4">
                        {getScoreLabel(atsScore.score)}
                      </div>
                      <Progress value={atsScore.score} className="w-full" />
                    </div>

                    {/* Feedback */}
                    <div>
                      <h4 className="font-semibold text-success mb-3 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        What's Working Well
                      </h4>
                      <ul className="space-y-2">
                        {atsScore.feedback.map((item, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-success rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Suggestions */}
                    <div>
                      <h4 className="font-semibold text-orange-600 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Improvement Suggestions
                      </h4>
                      <ul className="space-y-2">
                        {atsScore.suggestions.map((item, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Paste your resume content and click analyze to get started</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};