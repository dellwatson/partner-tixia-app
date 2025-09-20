import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { CheckCircle, Loader2 } from 'lucide-react';

interface ProcessingDialogProps {
  isOpen: boolean;
  currentStep: number;
  steps: string[];
}

export function ProcessingDialog({ isOpen, currentStep, steps }: ProcessingDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Processing Payment</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-6">
          <div className="flex items-center space-x-4">
            {steps.map((_, stepIndex) => (
              <div key={stepIndex} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= stepIndex 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > stepIndex ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : currentStep === stepIndex ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    stepIndex + 1
                  )}
                </div>
                {stepIndex < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    currentStep > stepIndex ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-lg font-medium">
              {steps[currentStep] || 'Processing...'}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Please don't close this window
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
