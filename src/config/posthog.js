// PostHog configuration for GTT Analytics
export const POSTHOG_CONFIG = {
  // Replace with your actual PostHog API key and host
  apiKey: process.env.REACT_APP_POSTHOG_KEY || 'phc_YOUR_PROJECT_API_KEY',
  apiHost: process.env.REACT_APP_POSTHOG_HOST || 'https://app.posthog.com',
  
  // PostHog initialization options
  options: {
    autocapture: false, // We'll manually track events for better control
    capture_pageview: true,
    capture_pageleave: true,
    cross_subdomain_cookie: true,
    disable_session_recording: false,
    enable_recording_console_log: true,
    persistence: 'localStorage',
    loaded: (posthog) => {
      // Set up group analytics for schools
      if (typeof window !== 'undefined' && window.currentSchoolId) {
        posthog.group('school', window.currentSchoolId);
      }
    }
  }
};

// GTT-specific event definitions
export const GTT_EVENTS = {
  // Subscription and Onboarding Events
  SUBSCRIPTION_PURCHASED: 'subscription_purchased',
  SCHOOL_ONBOARDING_COMPLETED: 'school_onboarding_completed',
  USER_SIGNUP: 'user_signup',
  USER_LOGIN: 'user_login',
  ONBOARDING_COMPLETED: 'onboarding_completed',
  
  // Engagement Events
  ACTIVE_ENGAGEMENT: 'active_engagement',
  PAGE_VIEW: '$pageview',
  SESSION: '$session',
  
  // Assessment and Goal Events
  ASSESSMENT_STARTED: 'assessment_started',
  ASSESSMENT_COMPLETED: 'assessment_completed',
  GOAL_CREATED: 'goal_created',
  
  // Resource and Implementation Events
  RESOURCE_ACCESSED: 'resource_accessed',
  TECHNIQUE_IMPLEMENTED: 'technique_implemented',
  REFLECTION_SUBMITTED: 'reflection_submitted',
  
  // Element Exploration Events
  ELEMENT_VIEWED: 'element_viewed',
  
  // Teacher Profile Events
  PROFILE_COMPLETED: 'profile_completed'
};

// GTT-specific properties
export const GTT_PROPERTIES = {
  USER_ROLE: '$user_role',
  SCHOOL_ID: '$school_id',
  SESSION_ID: '$session_id',
  ELEMENT_ID: 'element_id',
  ELEMENT_NAME: 'element_name',
  DIMENSION_ID: 'dimension_id',
  TECHNIQUE_ID: 'technique_id',
  PROBLEM_ID: 'problem_id',
  ENGAGEMENT_TIER: 'engagement_tier',
  PLAN_TYPE: '$plan_type',
  ELIGIBLE_TEACHER_COUNT: '$eligible_teacher_count',
  ASSESSMENT_TYPE: 'assessment_type',
  RESOURCE_TYPE: 'resource_type',
  ACTION_TYPE: 'action_type'
};

// User roles
export const USER_ROLES = {
  TEACHER: 'teacher',
  ADMIN: 'admin',
  SCHOOL_LEADER: 'school_leader'
};

// Engagement tiers
export const ENGAGEMENT_TIERS = {
  POWER_USER: 'Power User',
  REGULAR_USER: 'Regular User',
  OCCASIONAL_USER: 'Occasional User',
  AT_RISK_USER: 'At-Risk User',
  NEW_USER: 'New User'
};