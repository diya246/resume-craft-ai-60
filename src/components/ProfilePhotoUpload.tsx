import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Upload, User, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProfilePhotoUploadProps {
  profilePhoto?: string;
  onPhotoChange: (photo: string | undefined) => void;
  className?: string;
}

export const ProfilePhotoUpload = ({ profilePhoto, onPhotoChange, className }: ProfilePhotoUploadProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onPhotoChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    onPhotoChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className={cn("w-fit", className)}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center space-y-4">
          <div
            className="relative group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Avatar className="h-24 w-24 border-2 border-border transition-all duration-300 hover:shadow-medium">
              <AvatarImage src={profilePhoto} alt="Profile" className="object-cover" />
              <AvatarFallback className="bg-muted">
                <User className="h-8 w-8 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            
            {/* Edit overlay */}
            <div className={cn(
              "absolute inset-0 bg-black/50 rounded-full flex items-center justify-center transition-opacity duration-200",
              isHovering || !profilePhoto ? "opacity-100" : "opacity-0"
            )}>
              <Camera className="h-6 w-6 text-white" />
            </div>

            {/* Remove button */}
            {profilePhoto && (
              <Button
                variant="outline"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 border-2 bg-background"
                onClick={handleRemovePhoto}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleUploadClick}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {profilePhoto ? 'Change' : 'Upload'}
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </CardContent>
    </Card>
  );
};