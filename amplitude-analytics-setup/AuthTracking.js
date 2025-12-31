import AmplitudeService from '../services/AmplitudeService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthTracking = {
  async trackPhoneEntry(phoneNumber) {
    await AmplitudeService.trackEvent('phone_number_entered', {
      page_source: 'auth',
      entry_point: 'app_launch',
    });
  },

  async trackOTPRequest(phoneNumber) {
    await AmplitudeService.trackEvent('otp_requested', {
      phone_number_masked: phoneNumber.substring(0, 6) + '****',
      request_time: Date.now(),
    });
  },

  async trackOTPVerified(phoneNumber, attempts = 1) {
    await AmplitudeService.trackEvent('otp_verified', {
      phone_number_masked: phoneNumber.substring(0, 6) + '****',
      attempts,
      verification_time: Date.now(),
    });
    
    await AmplitudeService.setUserId(phoneNumber);
    await AsyncStorage.setItem('user_phone', phoneNumber);
  },

  async trackPANSubmitted(panMasked) {
    await AmplitudeService.trackEvent('pan_submitted', {
      pan_masked: panMasked,
    });
  },

  async trackPANVerified(panMasked, isExistingInvestor) {
    await AmplitudeService.trackEvent('pan_verified', {
      pan_masked: panMasked,
      existing_investor: isExistingInvestor,
    });
    
    await AmplitudeService.setUserProperties({
      pan_verified: true,
      user_type: isExistingInvestor ? 'existing' : 'new',
    });
  },

  async trackKYCCompleted() {
    await AmplitudeService.trackEvent('kyc_completed', {
      completion_time: Date.now(),
    });
    
    await AmplitudeService.setUserProperties({
      kyc_status: 'completed',
      kyc_completion_date: new Date().toISOString(),
    });
  },
};
