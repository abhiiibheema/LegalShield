import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Scale, 
  FileText, 
  Calendar,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Plus,
  X
} from 'lucide-react';

interface LawyerData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    barCouncilNumber: string;
    lawFirmName: string;
  };
  practiceDetails: {
    areasOfLaw: string[];
    courts: Array<{
      type: string;
      location: string;
    }>;
  };
  existingCases: Array<{
    clientName: string;
    caseNumber: string;
    court: string;
    type: string;
    status: string;
    filingDate: string;
    nextHearing: string;
  }>;
}

const LawyerOnboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [lawyerData, setLawyerData] = useState<LawyerData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      barCouncilNumber: '',
      lawFirmName: ''
    },
    practiceDetails: {
      areasOfLaw: [],
      courts: []
    },
    existingCases: []
  });

  const lawAreas = [
    'Criminal Law', 'Civil Law', 'Family Law', 'Corporate Law', 
    'Property Law', 'Labour Law', 'Constitutional Law', 'Tax Law',
    'Consumer Law', 'Environmental Law', 'Intellectual Property', 'Banking Law'
  ];

  const courtTypes = [
    'District Court', 'High Court', 'Supreme Court', 'Family Court',
    'Consumer Court', 'Labour Tribunal', 'Tax Tribunal'
  ];

  const locations = [
    'Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad',
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Chandigarh', 'Guwahati'
  ];

  const handlePersonalInfoChange = (field: string, value: string) => {
    setLawyerData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleLawAreaToggle = (area: string) => {
    setLawyerData(prev => ({
      ...prev,
      practiceDetails: {
        ...prev.practiceDetails,
        areasOfLaw: prev.practiceDetails.areasOfLaw.includes(area)
          ? prev.practiceDetails.areasOfLaw.filter(a => a !== area)
          : [...prev.practiceDetails.areasOfLaw, area]
      }
    }));
  };

  const addCourt = () => {
    setLawyerData(prev => ({
      ...prev,
      practiceDetails: {
        ...prev.practiceDetails,
        courts: [...prev.practiceDetails.courts, { type: '', location: '' }]
      }
    }));
  };

  const updateCourt = (index: number, field: string, value: string) => {
    setLawyerData(prev => ({
      ...prev,
      practiceDetails: {
        ...prev.practiceDetails,
        courts: prev.practiceDetails.courts.map((court, i) => 
          i === index ? { ...court, [field]: value } : court
        )
      }
    }));
  };

  const removeCourt = (index: number) => {
    setLawyerData(prev => ({
      ...prev,
      practiceDetails: {
        ...prev.practiceDetails,
        courts: prev.practiceDetails.courts.filter((_, i) => i !== index)
      }
    }));
  };

  const addExistingCase = () => {
    setLawyerData(prev => ({
      ...prev,
      existingCases: [...prev.existingCases, {
        clientName: '',
        caseNumber: '',
        court: '',
        type: '',
        status: '',
        filingDate: '',
        nextHearing: ''
      }]
    }));
  };

  const updateExistingCase = (index: number, field: string, value: string) => {
    setLawyerData(prev => ({
      ...prev,
      existingCases: prev.existingCases.map((case_, i) => 
        i === index ? { ...case_, [field]: value } : case_
      )
    }));
  };

  const removeExistingCase = (index: number) => {
    setLawyerData(prev => ({
      ...prev,
      existingCases: prev.existingCases.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Lawyer onboarding data:', lawyerData);
    // Here you would submit to your backend
    alert('Lawyer profile created successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indian-cream via-white to-indian-cream py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indian-maroon rounded-full mb-4">
            <Scale className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-indian-maroon mb-2">
            Welcome to Nyaaya Sahayak
          </h1>
          <p className="text-gray-600">
            Complete your lawyer profile to start managing cases efficiently
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step <= currentStep 
                    ? 'bg-indian-maroon text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step < currentStep ? <CheckCircle className="h-6 w-6" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-indian-maroon' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <span className="text-sm text-gray-600">
              Step {currentStep} of 4: {
                currentStep === 1 ? 'Personal Information' :
                currentStep === 2 ? 'Practice Details' :
                currentStep === 3 ? 'Existing Cases (Optional)' :
                'Review & Submit'
              }
            </span>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-indian-gold/20 overflow-hidden">
          <div className="p-8">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-indian-maroon mb-6">
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={lawyerData.personalInfo.fullName}
                        onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={lawyerData.personalInfo.email}
                        onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={lawyerData.personalInfo.phone}
                        onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bar Council Registration Number *
                    </label>
                    <div className="relative">
                      <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={lawyerData.personalInfo.barCouncilNumber}
                        onChange={(e) => handlePersonalInfoChange('barCouncilNumber', e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                        placeholder="Enter bar council number"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      value={lawyerData.personalInfo.address}
                      onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                      placeholder="Enter your complete address"
                      rows={3}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Law Firm Name (Optional)
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={lawyerData.personalInfo.lawFirmName}
                      onChange={(e) => handlePersonalInfoChange('lawFirmName', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                      placeholder="Enter law firm name (if applicable)"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Practice Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-indian-maroon mb-6">
                  Practice Details
                </h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Areas of Law (Select all that apply) *
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {lawAreas.map((area) => (
                      <button
                        key={area}
                        type="button"
                        onClick={() => handleLawAreaToggle(area)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          lawyerData.practiceDetails.areasOfLaw.includes(area)
                            ? 'bg-indian-maroon text-white border-indian-maroon'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-indian-gold'
                        }`}
                      >
                        {area}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Courts You Practice In *
                    </label>
                    <button
                      type="button"
                      onClick={addCourt}
                      className="flex items-center text-indian-maroon hover:text-indian-navy text-sm font-medium"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Court
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {lawyerData.practiceDetails.courts.map((court, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <select
                          value={court.type}
                          onChange={(e) => updateCourt(index, 'type', e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                        >
                          <option value="">Select Court Type</option>
                          {courtTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                        <select
                          value={court.location}
                          onChange={(e) => updateCourt(index, 'location', e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                        >
                          <option value="">Select Location</option>
                          {locations.map((location) => (
                            <option key={location} value={location}>{location}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => removeCourt(index)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                    ))}
                    
                    {lawyerData.practiceDetails.courts.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <Scale className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>No courts added yet. Click "Add Court" to get started.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Existing Cases */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-serif font-bold text-indian-maroon">
                    Existing Cases (Optional)
                  </h2>
                  <button
                    type="button"
                    onClick={addExistingCase}
                    className="flex items-center bg-indian-maroon text-white px-4 py-2 rounded-lg hover:bg-indian-navy transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Case
                  </button>
                </div>

                <p className="text-gray-600">
                  Add your existing cases to import them into the system. This step is optional and can be done later.
                </p>

                <div className="space-y-6">
                  {lawyerData.existingCases.map((case_, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-indian-maroon">
                          Case #{index + 1}
                        </h3>
                        <button
                          type="button"
                          onClick={() => removeExistingCase(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={case_.clientName}
                          onChange={(e) => updateExistingCase(index, 'clientName', e.target.value)}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                          placeholder="Client Name"
                        />
                        <input
                          type="text"
                          value={case_.caseNumber}
                          onChange={(e) => updateExistingCase(index, 'caseNumber', e.target.value)}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                          placeholder="Case Number"
                        />
                        <input
                          type="text"
                          value={case_.court}
                          onChange={(e) => updateExistingCase(index, 'court', e.target.value)}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                          placeholder="Court Name"
                        />
                        <select
                          value={case_.type}
                          onChange={(e) => updateExistingCase(index, 'type', e.target.value)}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                        >
                          <option value="">Select Case Type</option>
                          {lawAreas.map((area) => (
                            <option key={area} value={area}>{area}</option>
                          ))}
                        </select>
                        <select
                          value={case_.status}
                          onChange={(e) => updateExistingCase(index, 'status', e.target.value)}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                        >
                          <option value="">Select Status</option>
                          <option value="filed">Filed</option>
                          <option value="pending">Pending</option>
                          <option value="adjourned">Adjourned</option>
                          <option value="closed">Closed</option>
                        </select>
                        <input
                          type="date"
                          value={case_.filingDate}
                          onChange={(e) => updateExistingCase(index, 'filingDate', e.target.value)}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                          placeholder="Filing Date"
                        />
                        <input
                          type="date"
                          value={case_.nextHearing}
                          onChange={(e) => updateExistingCase(index, 'nextHearing', e.target.value)}
                          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indian-gold focus:border-indian-gold"
                          placeholder="Next Hearing Date"
                        />
                      </div>
                    </div>
                  ))}
                  
                  {lawyerData.existingCases.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">No existing cases added</p>
                      <p className="text-sm">You can add your existing cases here or skip this step and add them later.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif font-bold text-indian-maroon mb-6">
                  Review Your Information
                </h2>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-indian-maroon mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div><strong>Name:</strong> {lawyerData.personalInfo.fullName}</div>
                      <div><strong>Email:</strong> {lawyerData.personalInfo.email}</div>
                      <div><strong>Phone:</strong> {lawyerData.personalInfo.phone}</div>
                      <div><strong>Bar Council No:</strong> {lawyerData.personalInfo.barCouncilNumber}</div>
                      <div className="md:col-span-2"><strong>Address:</strong> {lawyerData.personalInfo.address}</div>
                      {lawyerData.personalInfo.lawFirmName && (
                        <div className="md:col-span-2"><strong>Law Firm:</strong> {lawyerData.personalInfo.lawFirmName}</div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-indian-maroon mb-4">Practice Details</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong>Areas of Law:</strong>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {lawyerData.practiceDetails.areasOfLaw.map((area) => (
                            <span key={area} className="bg-indian-maroon text-white px-2 py-1 rounded text-xs">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <strong>Courts:</strong>
                        <div className="mt-2 space-y-1">
                          {lawyerData.practiceDetails.courts.map((court, index) => (
                            <div key={index} className="text-gray-700">
                              {court.type} - {court.location}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {lawyerData.existingCases.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-indian-maroon mb-4">
                        Existing Cases ({lawyerData.existingCases.length})
                      </h3>
                      <div className="space-y-2 text-sm">
                        {lawyerData.existingCases.map((case_, index) => (
                          <div key={index} className="text-gray-700">
                            {case_.clientName} - {case_.caseNumber} ({case_.type})
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="bg-gray-50 px-8 py-6 flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center px-6 py-3 text-gray-600 hover:text-indian-maroon transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="flex items-center bg-indian-maroon hover:bg-indian-navy text-white px-6 py-3 rounded-lg transition-colors"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex items-center bg-indian-maroon hover:bg-indian-navy text-white px-6 py-3 rounded-lg transition-colors"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Registration
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerOnboarding;