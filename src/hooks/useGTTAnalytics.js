import { usePostHog } from 'posthog-js/react';
import { GTT_EVENTS, GTT_PROPERTIES } from '../config/posthog';

export const useGTTAnalytics = () => {
  const posthog = usePostHog();
  
  // Track subscription purchase
  const trackSubscriptionPurchase = (schoolId, planType, eligibleTeacherCount) => {
    posthog?.capture(GTT_EVENTS.SUBSCRIPTION_PURCHASED, {
      [GTT_PROPERTIES.SCHOOL_ID]: schoolId,
      [GTT_PROPERTIES.PLAN_TYPE]: planType,
      [GTT_PROPERTIES.ELIGIBLE_TEACHER_COUNT]: eligibleTeacherCount
    });
  };
  
  // Track user signup
  const trackUserSignup = (userRole, schoolId) => {
    posthog?.capture(GTT_EVENTS.USER_SIGNUP, {
      [GTT_PROPERTIES.USER_ROLE]: userRole,
      [GTT_PROPERTIES.SCHOOL_ID]: schoolId
    });
  };
  
  // Track user login
  const trackUserLogin = (userRole, schoolId) => {
    posthog?.capture(GTT_EVENTS.USER_LOGIN, {
      [GTT_PROPERTIES.USER_ROLE]: userRole,
      [GTT_PROPERTIES.SCHOOL_ID]: schoolId
    });
  };
  
  // Track onboarding completion
  const trackOnboardingCompleted = (userRole, schoolId) => {
    posthog?.capture(GTT_EVENTS.ONBOARDING_COMPLETED, {
      [GTT_PROPERTIES.USER_ROLE]: userRole,
      [GTT_PROPERTIES.SCHOOL_ID]: schoolId
    });
  };
  
  // Track active engagement
  const trackActiveEngagement = (actionType, userRole, schoolId) => {
    posthog?.capture(GTT_EVENTS.ACTIVE_ENGAGEMENT, {
      [GTT_PROPERTIES.USER_ROLE]: userRole,
      [GTT_PROPERTIES.SCHOOL_ID]: schoolId,
      [GTT_PROPERTIES.ACTION_TYPE]: actionType
    });
  };
  
  // Track assessment started
  const trackAssessmentStarted = (assessmentType, elementId, userRole, schoolId) => {
    posthog?.capture(GTT_EVENTS.ASSESSMENT_STARTED, {
      [GTT_PROPERTIES.USER_ROLE]: userRole,
      [GTT_PROPERTIES.SCHOOL_ID]: schoolId,
      [GTT_PROPERTIES.ASSESSMENT_TYPE]: assessmentType,
      [GTT_PROPERTIES.ELEMENT_ID]: elementId
    });
  };
  
  // Track assessment completed
  const trackAssessmentCompleted = (assessmentType, elementId, userRole, schoolId) => {
    posthog?.capture(GTT_EVENTS.ASSESSMENT_COMPLETED, {
      [GTT_PROPERTIES.USER_ROLE]: userRole,
      [GTT_PROPERTIES.SCHOOL_ID]: schoolId,
      [GTT_PROPERTIES.ASSESSMENT_TYPE]: assessmentType,
      [GTT_PROPERTIES.ELEMENT_ID]: elementId
    });
  };
  
  // Track goal created
  const trackGoalCreated = (elementId, problemId, userRole, schoolId) => {
    posthog?.capture(GTT_EVENTS.GOAL_CREATED, {
      [GTT_PROPERTIES.USER_ROLE]: userRole,
      [GTT_PROPERTIES.SCHOOL_ID]: schoolId,
      [GTT_PROPERTIES.ELEMENT_ID]: elementId,
      [GTT_PROPERTIES.PROBLEM_ID]: problemId
    });
  };
  
  // Track resource accessed
  const trackResourceAccessed = (resourceType, elementId, techniqueId, userRole, schoolId) => {
    posthog?.capture(GTT_EVENTS.RESOURCE_ACCESSED, {
      [GTT_PROPERTIES.USER_ROLE]: userRole,
      [GTT_PROPERTIES.SCHOOL_ID]: schoolId,
      [GTT_PROPERTIES.RESOURCE_TYPE]: resourceType,
      [GTT_PROPERTIES.ELEMENT_ID]: elementId,
      [GTT_PROPERTIES.TECHNIQUE_ID]: techniqueId
    });
  };
  
  // Track technique implemented
  const trackTechniqueImplemented = (techniqueId, elementId, userRole, schoolId) => {
    posthog?.capture(GTT_EVENTS.TECHNIQUE_IMPLEMENTED, {
      [GTT_PROPERTIES.USER_ROLE]: userRole,
      [GTT_PROPERTIES.SCHOOL_ID]: schoolId,
      [GTT_PROPERTIES.TECHNIQUE_ID]: techniqueId,
      [GTT_PROPERTIES.ELEMENT_ID]: elementId
    });
  };
  
  // Track reflection submitted
  const trackReflectionSubmitted = (techniqueId, elementId, userRole, schoolId) => {
    posthog?.capture(GTT_EVENTS.REFLECTION_SUBMITTED, {
      [GTT_PROPERTIES.USER_ROLE]: userRole,
      [GTT_PROPERTIES.SCHOOL_ID]: schoolId,
      [GTT_PROPERTIES.TECHNIQUE_ID]: techniqueId,
      [GTT_PROPERTIES.ELEMENT_ID]: elementId
    });
  };
  
  // Track element viewed
  const trackElementViewed = (elementName, dimensionId, userRole, schoolId) => {
    posthog?.capture(GTT_EVENTS.ELEMENT_VIEWED, {
      [GTT_PROPERTIES.USER_ROLE]: userRole,
      [GTT_PROPERTIES.SCHOOL_ID]: schoolId,
      [GTT_PROPERTIES.ELEMENT_NAME]: elementName,
      [GTT_PROPERTIES.DIMENSION_ID]: dimensionId
    });
  };
  
  // Set user properties
  const setUserProperties = (properties) => {
    posthog?.identify(posthog.get_distinct_id(), properties);
  };
  
  // Set school group
  const setSchoolGroup = (schoolId, schoolProperties = {}) => {
    posthog?.group('school', schoolId, schoolProperties);
  };
  
  return {
    trackSubscriptionPurchase,
    trackUserSignup,
    trackUserLogin,
    trackOnboardingCompleted,
    trackActiveEngagement,
    trackAssessmentStarted,
    trackAssessmentCompleted,
    trackGoalCreated,
    trackResourceAccessed,
    trackTechniqueImplemented,
    trackReflectionSubmitted,
    trackElementViewed,
    setUserProperties,
    setSchoolGroup
  };
};