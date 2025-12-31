import AmplitudeService from '../services/AmplitudeService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const InvestmentTracking = {
  async trackFundViewed(fundName, fundCategory, returns) {
    await AmplitudeService.trackEvent('fund_viewed', {
      fund_name: fundName,
      fund_category: fundCategory,
      fund_returns: returns,
      view_source: 'browse',
    });
  },

  async trackFundSelected(fundName, fundCategory, expectedReturns) {
    await AmplitudeService.trackEvent('fund_selected', {
      fund_name: fundName,
      fund_category: fundCategory,
      expected_returns: expectedReturns,
    });
  },

  async trackInvestmentAmount(amount, investmentType, fundName) {
    await AmplitudeService.trackEvent('investment_amount_entered', {
      amount,
      investment_type: investmentType,
      fund_name: fundName,
    });
  },

  async trackPaymentMethod(method, fundName, amount) {
    await AmplitudeService.trackEvent('payment_method_selected', {
      payment_method: method,
      fund_name: fundName,
      amount,
    });
  },

  async trackInvestmentCompleted(fundName, amount, type, paymentMethod) {
    await AmplitudeService.trackEvent('investment_completed', {
      fund_name: fundName,
      amount,
      investment_type: type,
      payment_method: paymentMethod,
    });
    
    // Track revenue
    await AmplitudeService.trackRevenue(amount, type, {
      fund_name: fundName,
      payment_method: paymentMethod,
    });
    
    // Update user properties
    const totalInvested = await AsyncStorage.getItem('total_invested') || '0';
    const newTotal = parseFloat(totalInvested) + amount;
    await AsyncStorage.setItem('total_invested', newTotal.toString());
    
    await AmplitudeService.setUserProperties({
      total_invested: newTotal,
      last_investment_date: new Date().toISOString(),
    });
  },

  async trackSIPActivated(fundName, monthlyAmount, duration) {
    await AmplitudeService.trackEvent('sip_activated', {
      fund_name: fundName,
      monthly_amount: monthlyAmount,
      duration_months: duration,
      total_commitment: monthlyAmount * duration,
    });
    
    // Track as revenue
    await AmplitudeService.trackRevenue(monthlyAmount, 'sip', {
      fund_name: fundName,
      recurring: true,
    });
  },
};
