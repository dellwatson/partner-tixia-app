import React from 'react';
import { Building, Phone, Mail, Globe, MapPin, Star, Award, Shield } from 'lucide-react';

interface CompanyInfoProps {
  hotelChain?: string;
  managementCompany: string;
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
    address: string;
  };
  certifications: string[];
  awards: Array<{
    name: string;
    year: number;
    organization: string;
  }>;
  description: string;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({
  hotelChain,
  managementCompany,
  contactInfo,
  certifications,
  awards,
  description
}) => {
  return (
    <div id="company-info" className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">About the property</h2>
        <p className="text-gray-600">Property management and company information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Company Details */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building className="w-5 h-5" />
              Management Information
            </h3>
            
            <div className="space-y-3">
              {hotelChain && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Hotel Chain</p>
                  <p className="text-gray-900">{hotelChain}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-gray-700">Managed by</p>
                <p className="text-gray-900">{managementCompany}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:text-blue-800">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:text-blue-800">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              
              {contactInfo.website && (
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Website</p>
                    <a 
                      href={contactInfo.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Visit website
                    </a>
                  </div>
                </div>
              )}
              
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Address</p>
                  <p className="text-gray-900">{contactInfo.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications and Awards */}
        <div className="space-y-6">
          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Certifications
              </h3>
              
              <div className="grid grid-cols-1 gap-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                    <Shield className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-800 font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {awards.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Awards & Recognition
              </h3>
              
              <div className="space-y-3">
                {awards.map((award, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <Star className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-900">{award.name}</p>
                      <p className="text-sm text-yellow-700">{award.organization} • {award.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">About the Management</h3>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>
      )}

      {/* Additional Information */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-start gap-3">
            <Building className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Property Management</h4>
              <p className="text-sm text-blue-700 mb-3">
                This property is professionally managed to ensure the highest standards of service and maintenance.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">24/7 Support</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Professional Staff</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Quality Assurance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
