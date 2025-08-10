# AI Resume Builder 🚀

An intelligent resume builder powered by AI that creates professional resumes and provides accurate ATS (Applicant Tracking System) scoring using advanced machine learning models.

## ✨ Features

### 🤖 AI-Powered Resume Generation
- **Smart Content Generation**: Uses Google Gemini AI to generate professional summaries based on experience level
- **Intelligent ATS Scoring**: Advanced ML-based analysis using Hugging Face transformers
- **Multi-Factor Analysis**: Evaluates keyword density, structure, content quality, formatting, and skills matching

### 📊 Advanced ATS Analysis
- **Real-time Score Calculation**: Accurate ATS compatibility scoring (0-100)
- **Detailed Feedback**: Specific insights on what's working well
- **Improvement Suggestions**: Actionable recommendations to boost ATS score
- **ML-Powered Insights**: Uses semantic analysis for deeper understanding

### 🎨 Professional Design
- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Responsive Design**: Works perfectly on all devices
- **Professional Templates**: Industry-standard resume formatting
- **PDF Export**: High-quality PDF generation for download

### 🔧 Smart Features
- **Multi-Step Form**: Intuitive step-by-step resume building process
- **Real-time Preview**: See your resume as you build it
- **Experience Level Adaptation**: Tailored content for Junior, Mid, and Senior levels
- **Comprehensive Sections**: Personal details, summary, skills, education, and achievements

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- A Google Gemini API key

### Installation

1. **Clone the repository**:
   ```bash
   git clone <YOUR_GIT_URL>
   cd ai-resume-builder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173`

### 🔑 API Key Setup

When you first use the app, you'll be prompted to enter your Google Gemini API key:

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Enter it in the app when prompted
3. The key is stored locally in your browser for future use

## 🎯 How to Use

### Building a Resume
1. **Choose "New Resume Builder"** from the homepage
2. **Fill Personal Details**: Name, email, phone, job title, experience level
3. **Generate AI Summary**: Let AI create a professional summary or write your own
4. **Add Skills**: Include technical and soft skills relevant to your field
5. **Add Education**: Include your educational background
6. **Preview & Download**: Review your resume and download as PDF

### Checking ATS Score
1. **Choose "ATS Score Checker"** from the homepage
2. **Paste Resume Content**: Copy and paste your existing resume text
3. **Get Analysis**: Receive detailed ATS score with feedback and suggestions
4. **Improve**: Use the suggestions to optimize your resume

## 🧠 AI Technology Stack

### Machine Learning Models
- **Hugging Face Transformers**: For advanced text analysis and semantic understanding
- **Google Gemini AI**: For intelligent content generation
- **Multi-factor Analysis**: Combines rule-based and AI-powered scoring

### Analysis Factors
- **Keyword Density**: Relevant industry keywords
- **Content Structure**: Proper resume formatting and sections
- **Content Quality**: Action verbs, quantifiable achievements
- **Skills Matching**: Technical and soft skills alignment
- **Formatting**: ATS-friendly formatting and readability

## 🔧 Technical Implementation

### Frontend
- **React + TypeScript**: Modern, type-safe development
- **Tailwind CSS**: Utility-first styling with custom design system
- **Vite**: Fast build tool and development server
- **PDF Generation**: Client-side PDF creation using jsPDF and html2canvas

### AI Integration
- **@huggingface/transformers**: Browser-based ML models
- **@google/generative-ai**: Gemini AI integration
- **WebGPU Support**: Hardware-accelerated AI processing when available

### Key Components
- `ATSChecker`: Advanced ATS analysis with ML models
- `ResumeBuilder`: Multi-step resume creation process
- `AIGenerator`: Intelligent content generation
- `PDFExporter`: Professional PDF generation

## 📱 Browser Compatibility

- ✅ Chrome (recommended for WebGPU support)
- ✅ Firefox
- ✅ Safari
- ✅ Edge

## 🎓 Educational Use

This project is perfect for:
- **Computer Science Students**: Demonstrates AI integration, React development, and modern web technologies
- **Machine Learning Education**: Shows practical implementation of transformer models in web applications
- **Software Engineering Courses**: Example of full-stack development with AI features
- **Portfolio Projects**: Professional-quality application showcasing multiple technologies

## 🔬 Technical Highlights

### AI-Powered ATS Scoring Algorithm
```typescript
// Multi-factor analysis combining:
1. Keyword Density Analysis (25% weight)
2. Structure Analysis (20% weight)  
3. Content Quality (25% weight)
4. Formatting Analysis (15% weight)
5. Skills Matching (15% weight)
```

### Performance Optimizations
- Lazy loading of AI models
- Efficient text processing
- Optimized rendering with React best practices
- WebGPU acceleration when available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Google Gemini AI for intelligent content generation
- Hugging Face for transformer models and community
- Tailwind CSS for the excellent utility-first framework
- React community for the amazing ecosystem

---

**Built with ❤️ using cutting-edge AI and modern web technologies**

For questions or support, please open an issue or contact the development team.

## 🚀 Deployment

### Using Lovable (Recommended)
Simply open [Lovable](https://lovable.dev/projects/1b3065fd-36ce-4936-8ef2-63913aca16e9) and click on Share → Publish.

### Custom Domain
To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.
Read more: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
