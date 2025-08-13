import { Brain, FileText } from 'lucide-react';

export const Header = () => {
  return (
    <header className="border-b bg-card shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-lg shadow-medium">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ResuMate</h1>
              <p className="text-sm text-muted-foreground">Professional AI Resume Builder</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span className="text-sm font-medium">Build • Optimize • Succeed</span>
          </div>
        </div>
      </div>
    </header>
  );
};