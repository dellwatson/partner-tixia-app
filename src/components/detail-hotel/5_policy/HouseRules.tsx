import React from 'react';
import { Clock, Users, Ban, Check, AlertTriangle, Baby, Dog, Cigarette, Car, CreditCard } from 'lucide-react';

interface Rule {
  id: string;
  category: 'checkin' | 'pets' | 'smoking' | 'parties' | 'children' | 'payment' | 'general';
  title: string;
  description: string;
  allowed: boolean;
  details?: string[];
  additionalInfo?: string;
}

interface CheckInOutTimes {
  checkIn: {
    from: string;
    to: string;
  };
  checkOut: {
    from: string;
    to: string;
  };
}

interface HouseRulesProps {
  checkInOut: CheckInOutTimes;
  rules: Rule[];
  cancellationPolicy: string;
  damagePolicy: string;
}

const HouseRules: React.FC<HouseRulesProps> = ({
  checkInOut,
  rules,
  cancellationPolicy,
  damagePolicy
}) => {
  const getRuleIcon = (category: string) => {
    switch (category) {
      case 'checkin':
        return <Clock className="w-5 h-5" />;
      case 'pets':
        return <Dog className="w-5 h-5" />;
      case 'smoking':
        return <Cigarette className="w-5 h-5" />;
      case 'parties':
        return <Users className="w-5 h-5" />;
      case 'children':
        return <Baby className="w-5 h-5" />;
      case 'payment':
        return <CreditCard className="w-5 h-5" />;
      default:
        return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getRuleColor = (allowed: boolean) => {
    return allowed 
      ? 'bg-green-50 border-green-200 text-green-800'
      : 'bg-red-50 border-red-200 text-red-800';
  };

  const getRuleIconColor = (allowed: boolean) => {
    return allowed ? 'text-green-600' : 'text-red-600';
  };

  const groupedRules = rules.reduce((acc, rule) => {
    if (!acc[rule.category]) {
      acc[rule.category] = [];
    }
    acc[rule.category].push(rule);
    return acc;
  }, {} as Record<string, Rule[]>);

  const categoryLabels = {
    checkin: 'Check-in & Check-out',
    pets: 'Pets',
    smoking: 'Smoking',
    parties: 'Events & Parties',
    children: 'Children & Extra Beds',
    payment: 'Payment',
    general: 'General Rules'
  };

  return (
    <div id="house-rules" className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">House rules</h2>
        <p className="text-gray-600">Important policies and guidelines for your stay</p>
      </div>

      {/* Check-in/Check-out Times */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Check-in & Check-out
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Check-in</h4>
            <p className="text-blue-700">
              {checkInOut.checkIn.from} - {checkInOut.checkIn.to}
            </p>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Check-out</h4>
            <p className="text-blue-700">
              {checkInOut.checkOut.from} - {checkInOut.checkOut.to}
            </p>
          </div>
        </div>
      </div>

      {/* Rules by Category */}
      <div className="space-y-6">
        {Object.entries(groupedRules).map(([category, categoryRules]) => (
          <div key={category} className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              {getRuleIcon(category)}
              {categoryLabels[category as keyof typeof categoryLabels] || category}
            </h3>
            
            <div className="space-y-3">
              {categoryRules.map((rule) => (
                <div key={rule.id} className={`p-4 rounded-lg border ${getRuleColor(rule.allowed)}`}>
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 ${getRuleIconColor(rule.allowed)}`}>
                      {rule.allowed ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <Ban className="w-5 h-5" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{rule.title}</h4>
                      <p className="text-sm mb-2">{rule.description}</p>
                      
                      {rule.details && rule.details.length > 0 && (
                        <ul className="text-sm space-y-1 mb-2">
                          {rule.details.map((detail, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-xs mt-1">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {rule.additionalInfo && (
                        <p className="text-xs italic">{rule.additionalInfo}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Cancellation Policy */}
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-900 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Cancellation Policy
        </h3>
        <p className="text-yellow-800 text-sm leading-relaxed">{cancellationPolicy}</p>
      </div>

      {/* Damage Policy */}
      <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
        <h3 className="text-lg font-semibold text-orange-900 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Damage Policy
        </h3>
        <p className="text-orange-800 text-sm leading-relaxed">{damagePolicy}</p>
      </div>

      {/* Important Notice */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-gray-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-gray-900 mb-1">Important Notice</h4>
            <p className="text-sm text-gray-700 mb-3">
              Please review all house rules carefully before booking. Failure to comply with these rules may result in additional charges or termination of your stay.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded">Valid ID Required</span>
              <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded">Age Restrictions Apply</span>
              <span className="px-2 py-1 bg-gray-200 text-gray-800 text-xs rounded">Security Deposit May Apply</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HouseRules;
