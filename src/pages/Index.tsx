import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { HomePage } from '@/components/HomePage';
import { ATSChecker } from '@/components/ATSChecker';
import { ResumeBuilder } from '@/components/ResumeBuilder';
import { ApiKeyDialog } from '@/components/ApiKeyDialog';
import { initializeGemini } from '@/lib/gemini';

type AppMode = 'home' | 'ats' | 'builder';

const Index = () => {
  const [currentMode, setCurrentMode] = useState<AppMode>('home');
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini-api-key');
    if (savedApiKey) {
      initializeGemini(savedApiKey);
    }
  }, []);

  const handleModeSelect = (mode: AppMode) => {
    const savedApiKey = localStorage.getItem('gemini-api-key');
    if (!savedApiKey) {
      setShowApiKeyDialog(true);
      setCurrentMode(mode);
    } else {
      setCurrentMode(mode);
    }
  };

  const handleApiKeySet = () => {
    // API key is already set in the dialog component
    // Just proceed with the selected mode
  };

  const renderCurrentMode = () => {
    switch (currentMode) {
      case 'ats':
        return <ATSChecker onBack={() => setCurrentMode('home')} />;
      case 'builder':
        return <ResumeBuilder onBack={() => setCurrentMode('home')} />;
      default:
        return <HomePage onModeSelect={handleModeSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {renderCurrentMode()}
      <ApiKeyDialog
        open={showApiKeyDialog}
        onClose={() => setShowApiKeyDialog(false)}
        onApiKeySet={handleApiKeySet}
      />
    </div>
  );
};

export default Index;
