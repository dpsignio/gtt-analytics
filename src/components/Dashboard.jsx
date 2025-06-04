import React from 'react';
import AdoptionMetrics from './metrics/AdoptionMetrics';
import EngagementMetrics from './metrics/EngagementMetrics';
import FeatureUsage from './metrics/FeatureUsage';
import TrendsInsights from './metrics/TrendsInsights';

const Dashboard = ({ view, mockData, currentUser }) => {
  const renderView = () => {
    switch (view) {
      case 'adoption':
        return <AdoptionMetrics data={mockData} currentUser={currentUser} />;
      case 'engagement':
        return <EngagementMetrics data={mockData} currentUser={currentUser} />;
      case 'features':
        return <FeatureUsage data={mockData} currentUser={currentUser} />;
      case 'trends':
        return <TrendsInsights data={mockData} currentUser={currentUser} />;
      default:
        return <AdoptionMetrics data={mockData} currentUser={currentUser} />;
    }
  };
  
  return (
    <div className="space-y-6">
      {renderView()}
    </div>
  );
};

export default Dashboard;