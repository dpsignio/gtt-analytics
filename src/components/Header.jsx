import React from 'react';
import { Activity, Users, TrendingUp, BarChart3, User } from 'lucide-react';

const Header = ({ activeView, onViewChange, currentUser }) => {
  const views = [
    { id: 'adoption', label: 'Adoption Metrics', icon: Users },
    { id: 'engagement', label: 'Engagement Metrics', icon: Activity },
    { id: 'features', label: 'Feature Usage', icon: BarChart3 },
    { id: 'trends', label: 'Trends & Insights', icon: TrendingUp }
  ];
  
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold text-gray-900">GTT Analytics</h1>
            
            <nav className="flex space-x-1">
              {views.map(view => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => onViewChange(view.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors
                      ${activeView === view.id 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon size={16} />
                    <span>{view.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <User size={16} />
              <span className="capitalize">{currentUser.role}</span>
              <span className="text-gray-400">|</span>
              <span>{currentUser.schoolId}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;