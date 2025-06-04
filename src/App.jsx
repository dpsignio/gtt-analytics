import React, { useState, useEffect } from 'react';
import { PostHogProvider } from './components/PostHogProvider';
import Dashboard from './components/Dashboard';
import SimulationPanel from './components/SimulationPanel';
import Header from './components/Header';
import { usePostHog } from 'posthog-js/react';

// Mock data store
const mockDataStore = {
  schools: [],
  teachers: [],
  activities: []
};

function AppContent() {
  const [activeView, setActiveView] = useState('adoption');
  const [mockData, setMockData] = useState(mockDataStore);
  const [currentUser, setCurrentUser] = useState({
    role: 'admin',
    schoolId: 'school_001'
  });
  
  const posthog = usePostHog();
  
  useEffect(() => {
    // Set initial user properties
    if (posthog) {
      posthog.identify('demo_user', {
        $user_role: currentUser.role,
        $school_id: currentUser.schoolId
      });
      
      if (currentUser.schoolId) {
        posthog.group('school', currentUser.schoolId);
      }
    }
  }, [posthog, currentUser]);
  
  const handleDataUpdate = (newData) => {
    setMockData(prev => ({ ...prev, ...newData }));
  };
  
  const handleUserChange = (newUser) => {
    setCurrentUser(newUser);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeView={activeView} 
        onViewChange={setActiveView}
        currentUser={currentUser}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Dashboard 
              view={activeView} 
              mockData={mockData}
              currentUser={currentUser}
            />
          </div>
          
          <div className="lg:col-span-1">
            <SimulationPanel 
              onDataUpdate={handleDataUpdate}
              onUserChange={handleUserChange}
              currentUser={currentUser}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <PostHogProvider>
      <AppContent />
    </PostHogProvider>
  );
}

export default App;