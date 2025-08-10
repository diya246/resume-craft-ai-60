import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, FileText, Target, TrendingUp, Sparkles, CheckCircle } from 'lucide-react';

interface HomePageProps {
  onModeSelect: (mode: 'ats' | 'builder') => void;
}

export const HomePage = ({ onModeSelect }: HomePageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/30 to-background">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-hero rounded-2xl shadow-strong mb-6 animate-pulse">
            <Brain className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
            Build Your Perfect Resume
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Leverage the power of AI to create professional, ATS-optimized resumes that get you noticed by recruiters and land your dream job.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-3">
                <Target className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">ATS Optimized</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                AI-powered optimization ensures your resume passes through Applicant Tracking Systems
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-3">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">AI-Generated Content</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get professionally written summaries and content tailored to your experience level
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-lg">Professional Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Clean, modern resume formats that look great and are easy to read
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Main Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="group hover:shadow-strong transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-card rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-primary">Check ATS Score</CardTitle>
              <CardDescription className="text-base">
                Upload your existing resume and get instant ATS compatibility analysis with actionable feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {['Instant ATS score analysis', 'Detailed improvement suggestions', 'Keyword optimization tips'].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <Button 
                variant="outline" 
                className="w-full mt-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                onClick={() => onModeSelect('ats')}
              >
                Analyze My Resume
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-strong transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-card rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-primary">Build New Resume</CardTitle>
              <CardDescription className="text-base">
                Create a professional resume from scratch with AI assistance and smart content generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {['AI-generated executive summary', 'Smart content suggestions', 'Professional PDF export'].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
              <Button 
                variant="hero" 
                className="w-full mt-6"
                onClick={() => onModeSelect('builder')}
              >
                Start Building
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">Trusted by job seekers worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <span className="text-sm font-medium">✓ ATS Compliant</span>
            <span className="text-sm font-medium">✓ AI Powered</span>
            <span className="text-sm font-medium">✓ Professional Format</span>
            <span className="text-sm font-medium">✓ Instant Download</span>
          </div>
        </div>
      </div>
    </div>
  );
};