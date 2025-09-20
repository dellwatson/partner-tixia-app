import React, { useState } from 'react';
import { ChevronDown, Bed, Bath, Wifi, Coffee, Tv, Wind, Car, Users, Home } from 'lucide-react';

interface SpaceQuestion {
  id: string;
  question: string;
  answer: string;
  category: 'rooms' | 'amenities' | 'services' | 'location' | 'policies';
  helpful: number;
}

interface SpaceFAQProps {
  propertyName: string;
  questions: SpaceQuestion[];
}

const SpaceFAQ: React.FC<SpaceFAQProps> = ({ propertyName, questions }) => {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All questions', icon: Home },
    { value: 'rooms', label: 'Rooms & Beds', icon: Bed },
    { value: 'amenities', label: 'Amenities', icon: Coffee },
    { value: 'services', label: 'Services', icon: Users },
    { value: 'location', label: 'Location', icon: Car },
    { value: 'policies', label: 'Policies', icon: Bath }
  ];

  const filteredQuestions = selectedCategory === 'all' 
    ? questions 
    : questions.filter(q => q.category === selectedCategory);

  const toggleQuestion = (questionId: string) => {
    setExpandedQuestion(expandedQuestion === questionId ? null : questionId);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'rooms':
        return <Bed className="w-4 h-4" />;
      case 'amenities':
        return <Coffee className="w-4 h-4" />;
      case 'services':
        return <Users className="w-4 h-4" />;
      case 'location':
        return <Car className="w-4 h-4" />;
      case 'policies':
        return <Bath className="w-4 h-4" />;
      default:
        return <Home className="w-4 h-4" />;
    }
  };

  // Common questions that might be asked about any property
  const commonQuestions = [
    {
      id: 'common-1',
      question: 'What are the most popular room types?',
      answer: 'Our most popular rooms are the Deluxe King rooms and Family Suites, offering spacious accommodations with modern amenities.',
      category: 'rooms' as const,
      helpful: 45
    },
    {
      id: 'common-2',
      question: 'Is WiFi available throughout the property?',
      answer: 'Yes, complimentary high-speed WiFi is available in all rooms and public areas throughout the property.',
      category: 'amenities' as const,
      helpful: 38
    },
    {
      id: 'common-3',
      question: 'What dining options are available?',
      answer: 'We offer multiple dining options including our main restaurant, lobby bar, and 24-hour room service.',
      category: 'services' as const,
      helpful: 32
    }
  ];

  const allQuestions = [...questions, ...commonQuestions];
  const displayQuestions = selectedCategory === 'all' 
    ? allQuestions 
    : allQuestions.filter(q => q.category === selectedCategory);

  return (
    <div id="space-faq" className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Property-specific questions</h2>
        <p className="text-gray-600">
          Common questions about {propertyName} answered by the property team
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.value;
            const categoryCount = category.value === 'all' 
              ? allQuestions.length
              : allQuestions.filter(q => q.category === category.value).length;
            
            return (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  isActive
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.label}</span>
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                  {categoryCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {displayQuestions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Home className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No questions found for this category.</p>
          </div>
        ) : (
          displayQuestions.map((question) => {
            const isExpanded = expandedQuestion === question.id;
            const CategoryIcon = getCategoryIcon(question.category);
            
            return (
              <div
                key={question.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(question.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex-shrink-0 text-gray-500">
                      {CategoryIcon}
                    </div>
                    <span className="font-medium text-gray-900 text-left">
                      {question.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ml-3 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {isExpanded && (
                  <div className="px-6 pb-4 border-t border-gray-100">
                    <div className="pt-4 pl-7">
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {question.answer}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 capitalize">
                          {question.category} • {question.helpful} people found this helpful
                        </span>
                        <button className="text-sm text-blue-600 hover:text-blue-800">
                          Was this helpful?
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Ask a Question Section */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <Home className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-medium text-blue-900 mb-1">Have a specific question?</h3>
            <p className="text-sm text-blue-700 mb-3">
              Can't find the answer you're looking for? Ask the property directly and get personalized assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Ask the property
              </button>
              <button className="px-4 py-2 border border-blue-300 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                View all FAQs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-3">Popular topics guests ask about:</h4>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border">Room amenities</span>
          <span className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border">Check-in process</span>
          <span className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border">Parking availability</span>
          <span className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border">Breakfast options</span>
          <span className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border">Pet policy</span>
          <span className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border">Nearby attractions</span>
        </div>
      </div>
    </div>
  );
};

export default SpaceFAQ;
