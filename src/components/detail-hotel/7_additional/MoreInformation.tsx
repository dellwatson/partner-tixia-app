import React, { useState } from 'react';
import { Info, Shield, CreditCard, Users, AlertTriangle, FileText, Globe, Phone } from 'lucide-react';

interface LegalInfo {
  propertyId: string;
  businessLicense: string;
  taxId: string;
  registrationNumber: string;
}

interface ContactInfo {
  emergencyContact: string;
  localAuthorities: string;
  touristBoard: string;
}

interface MoreInformationProps {
  legalInfo: LegalInfo;
  contactInfo: ContactInfo;
  termsAndConditions: string[];
  privacyPolicy: string;
  accessibilityInfo: string[];
  sustainabilityInfo: string[];
  localRegulations: string[];
}

const MoreInformation: React.FC<MoreInformationProps> = ({
  legalInfo,
  contactInfo,
  termsAndConditions,
  privacyPolicy,
  accessibilityInfo,
  sustainabilityInfo,
  localRegulations
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sections = [
    {
      id: 'legal',
      title: 'Legal Information',
      icon: FileText,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Property Registration</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Property ID:</span>
                  <span className="ml-2 font-mono">{legalInfo.propertyId}</span>
                </div>
                <div>
                  <span className="text-gray-600">Business License:</span>
                  <span className="ml-2 font-mono">{legalInfo.businessLicense}</span>
                </div>
                <div>
                  <span className="text-gray-600">Tax ID:</span>
                  <span className="ml-2 font-mono">{legalInfo.taxId}</span>
                </div>
                <div>
                  <span className="text-gray-600">Registration Number:</span>
                  <span className="ml-2 font-mono">{legalInfo.registrationNumber}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Emergency Contacts</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Emergency Services:</span>
                  <span className="ml-2">{contactInfo.emergencyContact}</span>
                </div>
                <div>
                  <span className="text-gray-600">Local Authorities:</span>
                  <span className="ml-2">{contactInfo.localAuthorities}</span>
                </div>
                <div>
                  <span className="text-gray-600">Tourist Board:</span>
                  <span className="ml-2">{contactInfo.touristBoard}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'terms',
      title: 'Terms & Conditions',
      icon: Shield,
      content: (
        <div className="space-y-3">
          {termsAndConditions.map((term, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-blue-600 mt-1 text-sm">{index + 1}.</span>
              <p className="text-gray-700 text-sm leading-relaxed">{term}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'privacy',
      title: 'Privacy Policy',
      icon: Shield,
      content: (
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed">{privacyPolicy}</p>
        </div>
      )
    },
    {
      id: 'accessibility',
      title: 'Accessibility Information',
      icon: Users,
      content: (
        <div className="space-y-3">
          {accessibilityInfo.map((info, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <Users className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-blue-800 text-sm">{info}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'sustainability',
      title: 'Sustainability Practices',
      icon: Globe,
      content: (
        <div className="space-y-3">
          {sustainabilityInfo.map((practice, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <Globe className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-green-800 text-sm">{practice}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'regulations',
      title: 'Local Regulations',
      icon: AlertTriangle,
      content: (
        <div className="space-y-3">
          {localRegulations.map((regulation, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-yellow-800 text-sm">{regulation}</p>
            </div>
          ))}
        </div>
      )
    }
  ];

  return (
    <div id="more-info" className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">More information</h2>
        <p className="text-gray-600">Additional details, policies, and legal information</p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => {
          const Icon = section.icon;
          const isExpanded = expandedSection === section.id;
          
          return (
            <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-gray-500" />
                  <span className="font-medium text-gray-900">{section.title}</span>
                </div>
                <div className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="pt-4">
                    {section.content}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Important Disclaimers */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-gray-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Important Disclaimers</h4>
              <div className="text-sm text-gray-700 space-y-2">
                <p>
                  • All information provided is subject to change without notice. Please verify details directly with the property.
                </p>
                <p>
                  • Local laws and regulations may apply. Guests are responsible for compliance with all applicable laws.
                </p>
                <p>
                  • This property operates under the jurisdiction of local authorities and tourism boards.
                </p>
                <p>
                  • For the most current information, please contact the property directly or consult official sources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact for More Information */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Need More Information?</h4>
            <p className="text-sm text-blue-700 mb-3">
              For additional details about policies, regulations, or accessibility features, please contact the property directly.
            </p>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
              Contact Property
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInformation;
