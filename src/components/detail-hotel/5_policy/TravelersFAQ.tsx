import React, { useState } from 'react';
import { ChevronDown, MessageCircle, Clock, Users, Car, Utensils, Wifi, Coffee } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'checkin' | 'amenities' | 'policies' | 'location';
  helpful: number;
}

interface TravelersFAQProps {
  faqs: FAQ[];
}

const TravelersFAQ: React.FC<TravelersFAQProps> = ({ faqs }) => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All questions', icon: MessageCircle },
    { value: 'general', label: 'General', icon: MessageCircle },
    { value: 'checkin', label: 'Check-in/out', icon: Clock },
    { value: 'amenities', label: 'Amenities', icon: Coffee },
    { value: 'policies', label: 'Policies', icon: Users },
    { value: 'location', label: 'Location', icon: Car }
  ];

  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(cat => cat.value === category);
    if (!categoryData) return MessageCircle;
    return categoryData.icon;
  };

  return (
    <div id="faq" className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Frequently asked questions</h2>
        <p className="text-gray-600">Get answers to common questions about this property</p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.value;
            
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
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No questions found for this category.</p>
          </div>
        ) : (
          filteredFAQs.map((faq) => {
            const Icon = getCategoryIcon(faq.category);
            const isExpanded = expandedFAQ === faq.id;
            
            return (
              <div
                key={faq.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {isExpanded && (
                  <div className="px-6 pb-4">
                    <div className="pl-8 border-l-2 border-gray-100">
                      <p className="text-gray-700 leading-relaxed mb-4">{faq.answer}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 capitalize">
                          {faq.category} • {faq.helpful} people found this helpful
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

      {/* Contact Section */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <MessageCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900 mb-1">Still have questions?</h3>
            <p className="text-sm text-blue-700 mb-3">
              Can't find what you're looking for? Contact the property directly for more information.
            </p>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Contact property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelersFAQ;
