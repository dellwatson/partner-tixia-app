import React, { useState } from 'react';
import { Star, MessageSquare, Send, ThumbsUp, AlertCircle, CheckCircle } from 'lucide-react';

interface FeedbackCollectionProps {
  hotelId: string;
  hotelName: string;
}

const FeedbackCollection: React.FC<FeedbackCollectionProps> = ({ hotelId, hotelName }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const ratingLabels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !feedback.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1500);
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleRatingHover = (value: number) => {
    setHoveredRating(value);
  };

  const handleRatingLeave = () => {
    setHoveredRating(0);
  };

  if (isSubmitted) {
    return (
      <div id="feedback" className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center py-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you for your feedback!</h2>
          <p className="text-gray-600 mb-4">
            Your review has been submitted and will help other travelers make informed decisions.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <ThumbsUp className="w-4 h-4" />
            <span>Your feedback helps improve {hotelName}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="feedback" className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Share your experience</h2>
        <p className="text-gray-600">Help other travelers by sharing your thoughts about {hotelName}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Overall rating *
          </label>
          <div className="flex items-center gap-2 mb-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleRatingClick(value)}
                onMouseEnter={() => handleRatingHover(value)}
                onMouseLeave={handleRatingLeave}
                className="p-1 transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 transition-colors ${
                    value <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          {(hoveredRating > 0 || rating > 0) && (
            <p className="text-sm text-gray-600">
              {ratingLabels[(hoveredRating || rating) as keyof typeof ratingLabels]}
            </p>
          )}
        </div>

        {/* Feedback Text */}
        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
            Your review *
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Tell us about your experience at this hotel. What did you like? What could be improved?"
            rows={5}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
            maxLength={1000}
          />
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-gray-500">
              Minimum 10 characters required
            </p>
            <p className="text-xs text-gray-500">
              {feedback.length}/1000
            </p>
          </div>
        </div>

        {/* Email (Optional) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email address (optional)
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            We'll only use this to follow up on your feedback if needed
          </p>
        </div>

        {/* Guidelines */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Review Guidelines</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Be honest and constructive in your feedback</li>
                <li>• Focus on your personal experience</li>
                <li>• Avoid inappropriate language or personal attacks</li>
                <li>• Include specific details that might help other travelers</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <AlertCircle className="w-4 h-4" />
            <span>* Required fields</span>
          </div>
          
          <button
            type="submit"
            disabled={rating === 0 || feedback.trim().length < 10 || isSubmitting}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Review</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Privacy Notice */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 leading-relaxed">
          By submitting this review, you agree to our Terms of Service and Privacy Policy. 
          Your review may be published on our website and shared with the hotel management. 
          We reserve the right to moderate reviews before publication.
        </p>
      </div>
    </div>
  );
};

export default FeedbackCollection;
