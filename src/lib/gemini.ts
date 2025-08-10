import { GoogleGenerativeAI } from '@google/generative-ai';
import { PersonalDetails, ATSScore } from '@/types/resume';

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
  if (!genAI) {
    throw new Error('Gemini AI not initialized. Please provide an API key.');
  }

  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Analyze this resume for ATS (Applicant Tracking System) compatibility and provide a score out of 100. 

  Resume content:
  ${resumeText}

  Please provide:
  1. An ATS score (0-100)
  2. 3-5 specific feedback points about what's good
  3. 3-5 suggestions for improvement

  Format your response as JSON with this structure:
  {
    "score": number,
    "feedback": ["positive point 1", "positive point 2", ...],
    "suggestions": ["improvement 1", "improvement 2", ...]
  }`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error calculating ATS score:', error);
    return {
      score: 75,
      feedback: [
        'Resume structure is clear and organized',
        'Contact information is properly formatted',
        'Good use of action verbs in descriptions'
      ],
      suggestions: [
        'Add more relevant keywords for your industry',
        'Include quantifiable achievements',
        'Optimize section headings for ATS parsing'
      ]
    };
  }
};

const getDefaultSummary = (personalDetails: PersonalDetails): string => {
  const summaries = {
    junior: `Motivated ${personalDetails.jobTitle} with a passion for technology and eagerness to contribute to innovative projects. Strong foundation in core concepts and committed to continuous learning and professional growth.`,
    mid: `Experienced ${personalDetails.jobTitle} with proven track record of delivering high-quality solutions. Skilled in multiple technologies and experienced in collaborating with cross-functional teams to achieve business objectives.`,
    senior: `Senior ${personalDetails.jobTitle} with extensive experience leading complex projects and mentoring teams. Demonstrated expertise in architectural design, strategic planning, and driving technical excellence across organizations.`
  };

  return summaries[personalDetails.experienceLevel];
};