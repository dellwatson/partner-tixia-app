import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { TextureButton } from '~/components/ui/texture-button';
import { CheckCircle } from 'lucide-react';

interface SuccessDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  submessage?: string;
  children?: React.ReactNode;
}

export function SuccessDialog({ 
  isOpen, 
  title, 
  message, 
  submessage,
  children 
}: SuccessDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-green-600">{title}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-6">
          <CheckCircle className="w-16 h-16 text-green-600" />
          <div className="text-center">
            <p className="text-lg font-medium mb-2">
              {message}
            </p>
            {submessage && (
              <p className="text-sm text-gray-600 mb-4">
                {submessage}
              </p>
            )}
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
