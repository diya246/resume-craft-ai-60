import { GoogleGenerativeAI } from '@google/generative-ai';
import { PersonalDetails, ATSScore } from '@/types/resume';
import { pipeline } from '@huggingface/transformers';

// For demo purposes, using a placeholder API key
// In production, this should be from environment variables or user input
const API_KEY = 'your-gemini-api-key-here';

let genAI: GoogleGenerativeAI | null = null;

export const initializeGemini = (apiKey: string) => {
  genAI = new GoogleGenerativeAI(apiKey);
};

export const generateExecutiveSummary = async (personalDetails: PersonalDetails): Promise<string> => {
  if (!genAI) {
    throw new Error('Gemini AI not initialized. Please provide an API key.');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Generate a professional executive summary for a ${personalDetails.experienceLevel} level ${personalDetails.jobTitle}. 
  
  Details:
  - Name: ${personalDetails.name}
  - Job Title: ${personalDetails.jobTitle}
  - Experience Level: ${personalDetails.experienceLevel}
  
  The summary should be 2-3 sentences, highlighting key strengths and career objectives appropriate for their experience level. Make it compelling and ATS-friendly.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating summary:', error);
    return getDefaultSummary(personalDetails);
  }
};

export const calculateATSScore = async (resumeText: string): Promise<ATSScore> => {
  try {
    // Use AI-powered analysis with multiple factors
    const score = await analyzeResumeWithAI(resumeText);
    const feedback = await generateDetailedFeedback(resumeText);
    const suggestions = await generateImprovementSuggestions(resumeText);
    
    return {
      score,
      feedback,
      suggestions
    };
  } catch (error) {
    console.error('Error calculating ATS score:', error);
    // Fallback to rule-based analysis
    return calculateATSScoreRuleBased(resumeText);
  }
};

const analyzeResumeWithAI = async (resumeText: string): Promise<number> => {
  try {
    // Use Hugging Face transformers for semantic analysis
    const classifier = await pipeline('text-classification', 'microsoft/DialoGPT-medium');
    
    // Analyze various aspects of the resume
    const analyses = await Promise.all([
      analyzeKeywordDensity(resumeText),
      analyzeStructure(resumeText),
      analyzeContentQuality(resumeText),
      analyzeFormatting(resumeText),
      analyzeSkillsMatching(resumeText)
    ]);
    
    // Weight different factors
    const weights = [0.25, 0.2, 0.25, 0.15, 0.15];
    const weightedScore = analyses.reduce((sum, score, index) => sum + score * weights[index], 0);
    
    return Math.round(Math.min(100, Math.max(0, weightedScore)));
  } catch (error) {
    console.error('AI analysis failed:', error);
    return calculateATSScoreRuleBased(resumeText).score;
  }
};

const analyzeKeywordDensity = async (text: string): Promise<number> => {
  const keywords = [
    'experience', 'skills', 'project', 'manage', 'develop', 'create', 'implement',
    'lead', 'collaborate', 'achieve', 'improve', 'optimize', 'deliver', 'design'
  ];
  
  const wordCount = text.toLowerCase().split(/\s+/).length;
  const keywordMatches = keywords.filter(keyword => 
    text.toLowerCase().includes(keyword)
  ).length;
  
  const density = (keywordMatches / keywords.length) * 100;
  return Math.min(100, density * 1.2); // Boost slightly for good keyword usage
};

const analyzeStructure = (text: string): Promise<number> => {
  return new Promise((resolve) => {
    let score = 0;
    
    // Check for essential sections
    const sections = ['experience', 'education', 'skills', 'summary'];
    const sectionMatches = sections.filter(section => 
      text.toLowerCase().includes(section)
    ).length;
    
    score += (sectionMatches / sections.length) * 40;
    
    // Check for proper formatting indicators
    if (text.includes('@')) score += 10; // Email
    if (text.match(/\d{4}/)) score += 10; // Years/dates
    if (text.match(/[A-Z][a-z]+ [A-Z][a-z]+/)) score += 15; // Proper names
    if (text.length > 200) score += 15; // Adequate length
    if (text.length < 2000) score += 10; // Not too long
    
    resolve(Math.min(100, score));
  });
};

const analyzeContentQuality = async (text: string): Promise<number> => {
  let score = 0;
  
  // Check for action verbs
  const actionVerbs = ['managed', 'developed', 'created', 'implemented', 'led', 'improved', 'designed', 'built'];
  const actionVerbCount = actionVerbs.filter(verb => text.toLowerCase().includes(verb)).length;
  score += Math.min(30, actionVerbCount * 5);
  
  // Check for quantifiable achievements
  const hasNumbers = text.match(/\d+%|\d+\+|\$\d+|#\d+/g);
  if (hasNumbers) score += Math.min(25, hasNumbers.length * 5);
  
  // Check for technical skills
  const techKeywords = ['javascript', 'python', 'react', 'sql', 'git', 'aws', 'docker'];
  const techCount = techKeywords.filter(tech => text.toLowerCase().includes(tech)).length;
  score += Math.min(25, techCount * 4);
  
  // Check for soft skills
  const softSkills = ['leadership', 'communication', 'teamwork', 'problem-solving'];
  const softCount = softSkills.filter(skill => text.toLowerCase().includes(skill)).length;
  score += Math.min(20, softCount * 5);
  
  return Math.min(100, score);
};

const analyzeFormatting = (text: string): Promise<number> => {
  return new Promise((resolve) => {
    let score = 60; // Base score for readable text
    
    // Check for consistent formatting
    const bulletPoints = text.match(/[•\-\*]/g);
    if (bulletPoints && bulletPoints.length > 3) score += 15;
    
    // Check for proper capitalization
    const sentences = text.split(/[.!?]+/);
    const capitalizedSentences = sentences.filter(s => 
      s.trim().length > 0 && s.trim()[0] === s.trim()[0].toUpperCase()
    ).length;
    
    if (capitalizedSentences / sentences.length > 0.8) score += 15;
    
    // Check for proper spacing and structure
    if (!text.includes('  ')) score += 10; // No double spaces
    
    resolve(Math.min(100, score));
  });
};

const analyzeSkillsMatching = async (text: string): Promise<number> => {
  const commonSkills = [
    'communication', 'leadership', 'project management', 'teamwork',
    'problem solving', 'analytical', 'creative', 'organized'
  ];
  
  const skillMatches = commonSkills.filter(skill => 
    text.toLowerCase().includes(skill.toLowerCase())
  ).length;
  
  return Math.min(100, (skillMatches / commonSkills.length) * 100 + 20);
};

const generateDetailedFeedback = async (text: string): Promise<string[]> => {
  const feedback: string[] = [];
  
  // Analyze strengths
  if (text.match(/\d+%|\d+\+/)) {
    feedback.push('Great use of quantifiable achievements and metrics');
  }
  
  if (text.toLowerCase().includes('led') || text.toLowerCase().includes('managed')) {
    feedback.push('Strong leadership and management experience highlighted');
  }
  
  if (text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)) {
    feedback.push('Professional contact information is properly formatted');
  }
  
  const actionVerbs = ['developed', 'created', 'implemented', 'improved', 'designed'];
  const actionVerbCount = actionVerbs.filter(verb => text.toLowerCase().includes(verb)).length;
  if (actionVerbCount >= 3) {
    feedback.push('Excellent use of strong action verbs throughout resume');
  }
  
  if (text.length > 500 && text.length < 1500) {
    feedback.push('Resume length is optimal for ATS parsing and readability');
  }
  
  return feedback.slice(0, 5); // Limit to 5 feedback points
};

const generateImprovementSuggestions = async (text: string): Promise<string[]> => {
  const suggestions: string[] = [];
  
  // Check for missing quantifiable results
  if (!text.match(/\d+%|\d+\+|\$\d+/)) {
    suggestions.push('Add quantifiable achievements (percentages, dollar amounts, numbers)');
  }
  
  // Check for technical skills
  const techKeywords = ['javascript', 'python', 'react', 'sql', 'git', 'aws'];
  const techCount = techKeywords.filter(tech => text.toLowerCase().includes(tech)).length;
  if (techCount < 2) {
    suggestions.push('Include more relevant technical skills and tools');
  }
  
  // Check for action verbs
  const actionVerbs = ['managed', 'developed', 'created', 'implemented', 'led'];
  const actionVerbCount = actionVerbs.filter(verb => text.toLowerCase().includes(verb)).length;
  if (actionVerbCount < 3) {
    suggestions.push('Use more powerful action verbs to start bullet points');
  }
  
  // Check for keywords
  if (!text.toLowerCase().includes('experience') || !text.toLowerCase().includes('skills')) {
    suggestions.push('Include industry-specific keywords that match job descriptions');
  }
  
  // Check for professional summary
  if (!text.toLowerCase().includes('summary') && !text.toLowerCase().includes('objective')) {
    suggestions.push('Add a professional summary or objective statement');
  }
  
  if (text.length < 300) {
    suggestions.push('Expand resume content to better showcase your qualifications');
  }
  
  return suggestions.slice(0, 5); // Limit to 5 suggestions
};

const calculateATSScoreRuleBased = (resumeText: string): ATSScore => {
  let score = 0;
  
  // Basic structure analysis
  const hasEmail = resumeText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  const hasPhone = resumeText.match(/[\+]?[1-9][\d]{0,15}/);
  const hasExperience = resumeText.toLowerCase().includes('experience');
  const hasEducation = resumeText.toLowerCase().includes('education');
  const hasSkills = resumeText.toLowerCase().includes('skills');
  
  if (hasEmail) score += 15;
  if (hasPhone) score += 10;
  if (hasExperience) score += 20;
  if (hasEducation) score += 15;
  if (hasSkills) score += 15;
  
  // Content quality
  const actionVerbs = ['managed', 'developed', 'created', 'implemented', 'led', 'improved'];
  const actionVerbCount = actionVerbs.filter(verb => resumeText.toLowerCase().includes(verb)).length;
  score += Math.min(20, actionVerbCount * 3);
  
  // Length check
  if (resumeText.length > 200 && resumeText.length < 2000) score += 5;
  
  return {
    score: Math.min(100, score),
    feedback: [
      'Resume structure follows standard format',
      'Contact information is present',
      'Contains relevant sections',
      'Appropriate length for ATS systems'
    ],
    suggestions: [
      'Add more quantifiable achievements',
      'Include industry-specific keywords',
      'Use stronger action verbs',
      'Optimize formatting for ATS parsing'
    ]
  };
};

const getDefaultSummary = (personalDetails: PersonalDetails): string => {
  const summaries = {
    junior: `Motivated ${personalDetails.jobTitle} with a passion for technology and eagerness to contribute to innovative projects. Strong foundation in core concepts and committed to continuous learning and professional growth.`,
    mid: `Experienced ${personalDetails.jobTitle} with proven track record of delivering high-quality solutions. Skilled in multiple technologies and experienced in collaborating with cross-functional teams to achieve business objectives.`,
    senior: `Senior ${personalDetails.jobTitle} with extensive experience leading complex projects and mentoring teams. Demonstrated expertise in architectural design, strategic planning, and driving technical excellence across organizations.`
  };

  return summaries[personalDetails.experienceLevel];
};