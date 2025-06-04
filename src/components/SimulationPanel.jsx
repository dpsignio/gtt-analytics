import React, { useState } from 'react';
import { Play, Plus, School, User, Activity, Target, BookOpen, MessageSquare } from 'lucide-react';
import { useGTTAnalytics } from '../hooks/useGTTAnalytics';
import { USER_ROLES } from '../config/posthog';

const SimulationPanel = ({ onDataUpdate, onUserChange, currentUser }) => {
  const analytics = useGTTAnalytics();
  const [simulating, setSimulating] = useState(false);
  
  // Simulate school subscription
  const simulateSchoolSubscription = () => {
    const schoolId = `school_${Date.now()}`;
    const teacherCount = Math.floor(Math.random() * 20) + 5;
    
    analytics.trackSubscriptionPurchase(schoolId, 'premium', teacherCount);
    
    onDataUpdate({
      schools: [{
        id: schoolId,
        name: `Demo School ${schoolId.slice(-4)}`,
        planType: 'premium',
        eligibleTeachers: teacherCount,
        activeTeachers: 0,
        createdAt: new Date()
      }]
    });
  };
  
  // Simulate teacher signup
  const simulateTeacherSignup = () => {
    const teacherId = `teacher_${Date.now()}`;
    const schoolId = currentUser.schoolId;
    
    analytics.trackUserSignup(USER_ROLES.TEACHER, schoolId);
    
    onDataUpdate({
      teachers: [{
        id: teacherId,
        schoolId: schoolId,
        role: USER_ROLES.TEACHER,
        status: 'signed_up',
        createdAt: new Date()
      }]
    });
  };
  
  // Simulate teacher login
  const simulateTeacherLogin = () => {
    analytics.trackUserLogin(USER_ROLES.TEACHER, currentUser.schoolId);
    analytics.trackActiveEngagement('login', USER_ROLES.TEACHER, currentUser.schoolId);
  };
  
  // Simulate onboarding completion
  const simulateOnboardingComplete = () => {
    analytics.trackOnboardingCompleted(USER_ROLES.TEACHER, currentUser.schoolId);
    analytics.setUserProperties({
      onboarding_completed: true,
      onboarding_date: new Date().toISOString()
    });
  };
  
  // Simulate assessment activity
  const simulateAssessment = () => {
    const elementId = `element_${Math.floor(Math.random() * 17) + 1}`;
    
    analytics.trackAssessmentStarted('self-assessment', elementId, USER_ROLES.TEACHER, currentUser.schoolId);
    
    setTimeout(() => {
      analytics.trackAssessmentCompleted('self-assessment', elementId, USER_ROLES.TEACHER, currentUser.schoolId);
      analytics.trackActiveEngagement('assessment_complete', USER_ROLES.TEACHER, currentUser.schoolId);
    }, 2000);
  };
  
  // Simulate goal creation
  const simulateGoalCreation = () => {
    const elementId = `element_${Math.floor(Math.random() * 17) + 1}`;
    const problemId = `problem_${Math.floor(Math.random() * 5) + 1}`;
    
    analytics.trackGoalCreated(elementId, problemId, USER_ROLES.TEACHER, currentUser.schoolId);
    analytics.trackActiveEngagement('goal_set', USER_ROLES.TEACHER, currentUser.schoolId);
  };
  
  // Simulate resource access
  const simulateResourceAccess = () => {
    const elementId = `element_${Math.floor(Math.random() * 17) + 1}`;
    const techniqueId = `technique_${Math.floor(Math.random() * 10) + 1}`;
    const resourceTypes = ['video', 'article', 'template', 'example'];
    const resourceType = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];
    
    analytics.trackResourceAccessed(resourceType, elementId, techniqueId, USER_ROLES.TEACHER, currentUser.schoolId);
    analytics.trackActiveEngagement('resource_view', USER_ROLES.TEACHER, currentUser.schoolId);
  };
  
  // Simulate technique implementation
  const simulateTechniqueImplementation = () => {
    const elementId = `element_${Math.floor(Math.random() * 17) + 1}`;
    const techniqueId = `technique_${Math.floor(Math.random() * 10) + 1}`;
    
    analytics.trackTechniqueImplemented(techniqueId, elementId, USER_ROLES.TEACHER, currentUser.schoolId);
    analytics.trackActiveEngagement('technique_apply', USER_ROLES.TEACHER, currentUser.schoolId);
  };
  
  // Simulate reflection submission
  const simulateReflection = () => {
    const elementId = `element_${Math.floor(Math.random() * 17) + 1}`;
    const techniqueId = `technique_${Math.floor(Math.random() * 10) + 1}`;
    
    analytics.trackReflectionSubmitted(techniqueId, elementId, USER_ROLES.TEACHER, currentUser.schoolId);
    analytics.trackActiveEngagement('reflection_complete', USER_ROLES.TEACHER, currentUser.schoolId);
  };
  
  // Simulate element exploration
  const simulateElementView = () => {
    const elements = [
      { name: 'Explaining', dimension: 'dimension_1' },
      { name: 'Modelling', dimension: 'dimension_1' },
      { name: 'Questioning', dimension: 'dimension_3' },
      { name: 'Feedback', dimension: 'dimension_4' },
      { name: 'Practice', dimension: 'dimension_4' }
    ];
    
    const element = elements[Math.floor(Math.random() * elements.length)];
    
    analytics.trackElementViewed(element.name, element.dimension, USER_ROLES.TEACHER, currentUser.schoolId);
  };
  
  // Run full simulation
  const runFullSimulation = async () => {
    setSimulating(true);
    
    // Simulate a typical teacher journey
    simulateTeacherSignup();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    simulateTeacherLogin();
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    simulateOnboardingComplete();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    simulateElementView();
    await new Promise(resolve => setTimeout(resolve, 800));
    
    simulateAssessment();
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    simulateGoalCreation();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    simulateResourceAccess();
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    simulateTechniqueImplementation();
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    simulateReflection();
    
    setSimulating(false);
  };
  
  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">Event Simulator</h3>
      <p className="text-sm text-gray-600 mb-6">
        Simulate GTT events to see real-time analytics updates in PostHog
      </p>
      
      <div className="space-y-3">
        <button
          onClick={simulateSchoolSubscription}
          className="w-full flex items-center justify-between btn-secondary"
          disabled={simulating}
        >
          <span className="flex items-center space-x-2">
            <School size={16} />
            <span>School Subscription</span>
          </span>
          <Plus size={16} />
        </button>
        
        <button
          onClick={simulateTeacherSignup}
          className="w-full flex items-center justify-between btn-secondary"
          disabled={simulating}
        >
          <span className="flex items-center space-x-2">
            <User size={16} />
            <span>Teacher Signup</span>
          </span>
          <Plus size={16} />
        </button>
        
        <button
          onClick={simulateTeacherLogin}
          className="w-full flex items-center justify-between btn-secondary"
          disabled={simulating}
        >
          <span className="flex items-center space-x-2">
            <Activity size={16} />
            <span>Teacher Login</span>
          </span>
          <Plus size={16} />
        </button>
        
        <button
          onClick={simulateOnboardingComplete}
          className="w-full flex items-center justify-between btn-secondary"
          disabled={simulating}
        >
          <span className="flex items-center space-x-2">
            <Target size={16} />
            <span>Complete Onboarding</span>
          </span>
          <Plus size={16} />
        </button>
        
        <button
          onClick={simulateAssessment}
          className="w-full flex items-center justify-between btn-secondary"
          disabled={simulating}
        >
          <span className="flex items-center space-x-2">
            <Target size={16} />
            <span>Self-Assessment</span>
          </span>
          <Plus size={16} />
        </button>
        
        <button
          onClick={simulateGoalCreation}
          className="w-full flex items-center justify-between btn-secondary"
          disabled={simulating}
        >
          <span className="flex items-center space-x-2">
            <Target size={16} />
            <span>Create Goal</span>
          </span>
          <Plus size={16} />
        </button>
        
        <button
          onClick={simulateResourceAccess}
          className="w-full flex items-center justify-between btn-secondary"
          disabled={simulating}
        >
          <span className="flex items-center space-x-2">
            <BookOpen size={16} />
            <span>Access Resource</span>
          </span>
          <Plus size={16} />
        </button>
        
        <button
          onClick={simulateTechniqueImplementation}
          className="w-full flex items-center justify-between btn-secondary"
          disabled={simulating}
        >
          <span className="flex items-center space-x-2">
            <Activity size={16} />
            <span>Implement Technique</span>
          </span>
          <Plus size={16} />
        </button>
        
        <button
          onClick={simulateReflection}
          className="w-full flex items-center justify-between btn-secondary"
          disabled={simulating}
        >
          <span className="flex items-center space-x-2">
            <MessageSquare size={16} />
            <span>Submit Reflection</span>
          </span>
          <Plus size={16} />
        </button>
        
        <hr className="my-4" />
        
        <button
          onClick={runFullSimulation}
          className="w-full btn-primary flex items-center justify-center space-x-2"
          disabled={simulating}
        >
          <Play size={16} />
          <span>{simulating ? 'Simulating...' : 'Run Full Journey'}</span>
        </button>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Current Context</h4>
        <div className="space-y-1 text-sm text-gray-600">
          <div>Role: <span className="font-medium capitalize">{currentUser.role}</span></div>
          <div>School: <span className="font-medium">{currentUser.schoolId}</span></div>
        </div>
      </div>
    </div>
  );
};

export default SimulationPanel;
