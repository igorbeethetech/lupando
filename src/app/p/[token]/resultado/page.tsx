import { notFound } from 'next/navigation';
import Image from 'next/image';

interface PersonResultPageProps {
  params: {
    token: string;
  };
}

// This would normally come from an API call using the token
const mockResultData = {
  companyName: 'SoftLab',
  matchScore: 82,
  mainStrength: 'Adaptability',
  traits: [
    { name: 'Adaptability', person: 85, company: 80 },
    { name: 'Innovation', person: 70, company: 90 },
    { name: 'Collaboration', person: 75, company: 65 },
    { name: 'Accountability', person: 90, company: 85 },
    { name: 'Customer Focus', person: 80, company: 90 },
    { name: 'Work-Life Balance', person: 95, company: 75 },
  ],
  insights: [
    'You show exceptional adaptability to changing circumstances, which aligns well with SoftLab's dynamic environment.',
    'Your strong sense of accountability exceeds the company's already high standards.',
    'There's a potential gap in innovation focus, where the company places higher emphasis than your natural tendencies.',
    'Your preference for work-life balance is higher than the company average, which could be a point of friction.',
  ]
};

export default function PersonResultPage({ params }: PersonResultPageProps) {
  const { token } = params;
  
  // In a real application, you would fetch the results from an API using the token
  // For demo purposes, we'll use mock data
  if (!token) {
    return notFound();
  }

  const { companyName, matchScore, mainStrength, traits, insights } = mockResultData;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 sm:px-10">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <h1 className="text-2xl font-bold text-white mb-4 sm:mb-0">Your Cultural Alignment Results</h1>
              <span className="text-indigo-100 text-sm bg-indigo-700 bg-opacity-50 px-3 py-1 rounded-full">
                Token: {token}
              </span>
            </div>
          </div>
          
          {/* Main content */}
          <div className="p-6 sm:p-10">
            {/* Match score card */}
            <div className="mb-10 bg-indigo-50 rounded-lg p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Overall Match</h2>
              <div className="text-5xl font-bold text-indigo-600 mb-2">{matchScore}%</div>
              <p className="text-gray-600">You match {matchScore}% with {companyName}'s culture</p>
              <div className="mt-4 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full">
                Your main strength: {mainStrength}
              </div>
            </div>
            
            {/* Hexagonal graph */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Cultural Trait Comparison</h2>
              <div className="aspect-w-4 aspect-h-3 bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-center">
                {/* This would be a real chart in production */}
                <div className="relative w-full max-w-md mx-auto">
                  <div className="text-center text-sm text-gray-500 mb-2">
                    (Hexagonal radar chart visualization comparing person vs company traits)
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                    <svg viewBox="0 0 400 400" className="w-full h-full">
                      {/* Hexagon base */}
                      <polygon 
                        points="200,50 350,125 350,275 200,350 50,275 50,125" 
                        fill="none" 
                        stroke="#e5e7eb" 
                        strokeWidth="2"
                      />
                      <polygon 
                        points="200,100 300,150 300,250 200,300 100,250 100,150" 
                        fill="none" 
                        stroke="#e5e7eb" 
                        strokeWidth="2"
                      />
                      <polygon 
                        points="200,150 250,175 250,225 200,250 150,225 150,175" 
                        fill="none" 
                        stroke="#e5e7eb" 
                        strokeWidth="2"
                      />
                      
                      {/* Company polygon */}
                      <polygon 
                        points="200,75 315,138 315,262 200,325 85,262 85,138" 
                        fill="rgba(79, 70, 229, 0.2)" 
                        stroke="#4f46e5" 
                        strokeWidth="2"
                      />
                      
                      {/* Person polygon */}
                      <polygon 
                        points="200,65 325,130 325,270 200,335 75,270 75,130" 
                        fill="rgba(16, 185, 129, 0.2)" 
                        stroke="#10b981" 
                        strokeWidth="2"
                      />
                      
                      {/* Trait labels */}
                      <text x="200" y="30" textAnchor="middle" fill="#4b5563" fontSize="14">Adaptability</text>
                      <text x="370" y="125" textAnchor="start" fill="#4b5563" fontSize="14">Innovation</text>
                      <text x="370" y="275" textAnchor="start" fill="#4b5563" fontSize="14">Collaboration</text>
                      <text x="200" y="370" textAnchor="middle" fill="#4b5563" fontSize="14">Accountability</text>
                      <text x="30" y="275" textAnchor="end" fill="#4b5563" fontSize="14">Customer Focus</text>
                      <text x="30" y="125" textAnchor="end" fill="#4b5563" fontSize="14">Work-Life Balance</text>
                      
                      {/* Legend */}
                      <rect x="150" y="380" width="15" height="15" fill="rgba(79, 70, 229, 0.2)" stroke="#4f46e5" strokeWidth="2" />
                      <text x="175" y="392" textAnchor="start" fill="#4b5563" fontSize="14">Company</text>
                      
                      <rect x="250" y="380" width="15" height="15" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2" />
                      <text x="275" y="392" textAnchor="start" fill="#4b5563" fontSize="14">You</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trait breakdown */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Trait Breakdown</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {traits.map((trait) => (
                  <div key={trait.name} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium text-gray-800 mb-2">{trait.name}</h3>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">You</span>
                      <span className="text-sm font-medium text-gray-700">{trait.person}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        style={{ width: `${trait.person}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500">{companyName}</span>
                      <span className="text-sm font-medium text-gray-700">{trait.company}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-500 h-2.5 rounded-full" 
                        style={{ width: `${trait.company}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Insights */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Key Insights</h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <ul className="space-y-4">
                  {insights.map((insight, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-3 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700">{insight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
