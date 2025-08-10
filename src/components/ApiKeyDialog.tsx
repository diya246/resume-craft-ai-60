import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { AlertTriangle, Key } from 'lucide-react';
import { initializeGemini } from '@/lib/gemini';
import { toast } from 'sonner';

interface ApiKeyDialogProps {
  open: boolean;
  onClose: () => void;
  onApiKeySet: () => void;
}

export const ApiKeyDialog = ({ open, onClose, onApiKeySet }: ApiKeyDialogProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }

    setIsLoading(true);
    try {
      initializeGemini(apiKey);
      localStorage.setItem('gemini-api-key', apiKey);
      toast.success('API key set successfully!');
      onApiKeySet();
      onClose();
    } catch (error) {
      toast.error('Failed to initialize Gemini AI. Please check your API key.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="h-5 w-5 text-primary" />
            Gemini API Key Required
          </DialogTitle>
          <DialogDescription>
            To use AI features, please enter your Google Gemini API key. You can get one from the{' '}
            <a 
              href="https://makersuite.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google AI Studio
            </a>
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center space-x-2 rounded-md border border-orange-200 bg-orange-50 p-3">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <p className="text-sm text-orange-700">
            Your API key is stored locally and never sent to our servers.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Gemini API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="font-mono"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !apiKey.trim()}>
              {isLoading ? 'Setting up...' : 'Set API Key'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};