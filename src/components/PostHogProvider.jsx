import React, { useEffect } from 'react';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { POSTHOG_CONFIG } from '../config/posthog';

// Initialize PostHog
if (typeof window !== 'undefined') {
  posthog.init(POSTHOG_CONFIG.apiKey, {
    api_host: POSTHOG_CONFIG.apiHost,
    ...POSTHOG_CONFIG.options
  });
}

export const PostHogProvider = ({ children }) => {
  useEffect(() => {
    // Set up any initial properties or groups
    const setupPostHog = () => {
      // Example: Set user properties if available
      const userRole = localStorage.getItem('userRole');
      const schoolId = localStorage.getItem('schoolId');
      
      if (userRole || schoolId) {
        posthog.identify(posthog.get_distinct_id(), {
          $user_role: userRole,
          $school_id: schoolId
        });
      }
      
      // Set up school group if available
      if (schoolId) {
        posthog.group('school', schoolId);
      }
    };
    
    setupPostHog();
  }, []);
  
  return <PHProvider client={posthog}>{children}</PHProvider>;
};