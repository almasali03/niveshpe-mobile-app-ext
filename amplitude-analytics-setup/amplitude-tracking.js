/**
 * NiveshPe Amplitude Analytics Tracking
 * Version: 1.0.0
 * 
 * This file contains all Amplitude tracking implementations for NiveshPe app
 */

// Configuration
const AMPLITUDE_CONFIG = {
    API_KEY: 'YOUR_AMPLITUDE_API_KEY_HERE', // Replace with actual API key
    OPTIONS: {
        includeUtm: true,
        includeReferrer: true,
        platform: 'Web',
        trackingOptions: {
            city: true,
            country: true,
            device_model: true,
            language: true,
            os_name: true,
            os_version: true,
            platform: true,
            region: true
        }
    }
};

// Initialize Amplitude
function initializeAmplitude() {
    try {
        amplitude.init(AMPLITUDE_CONFIG.API_KEY, null, AMPLITUDE_CONFIG.OPTIONS);
        
        // Set initial user properties
        const userId = localStorage.getItem('niveshpe_user_phone');
        if (userId) {
            amplitude.setUserId(userId);
            updateUserProperties();
        }
        
        // Track session start
        trackEvent('session_started', {
            session_source: document.referrer || 'direct',
            device_type: getDeviceType(),
            page_url: window.location.href
        });
        
        console.log('Amplitude initialized successfully');
    } catch (error) {
        console.error('Error initializing Amplitude:', error);
    }
}

// Helper function to track events
function trackEvent(eventName, properties = {}) {
    try {
        // Add common properties to all events
        const enrichedProperties = {
            ...properties,
            page_url: window.location.href,
            page_title: document.title,
            timestamp: new Date().toISOString(),
            session_id: getSessionId()
        };
        
        amplitude.logEvent(eventName, enrichedProperties);
        console.log(`Event tracked: ${eventName}`, enrichedProperties);
    } catch (error) {
        console.error(`Error tracking event ${eventName}:`, error);
    }
}

// Track revenue events
function trackRevenue(amount, productType, properties = {}) {
    try {
        const revenue = new amplitude.Revenue()
            .setPrice(amount)
            .setQuantity(1)
            .setProductId(productType)
            .setRevenueType('investment');
        
        // Add additional properties
        Object.keys(properties).forEach(key => {
            revenue.setEventProperty(key, properties[key]);
        });
        
        amplitude.logRevenueV2(revenue);
        console.log(`Revenue tracked: ₹${amount} for ${productType}`);
    } catch (error) {
        console.error('Error tracking revenue:', error);
    }
}

// Update user properties
function updateUserProperties(properties = {}) {
    try {
        const defaultProperties = {
            platform: 'mobile_web',
            app_version: '1.0.0',
            last_active_date: new Date().toISOString()
        };
        
        // Get stored user data
        const userData = {
            user_type: localStorage.getItem('niveshpe_user_type'),
            kyc_status: localStorage.getItem('niveshpe_kyc_status'),
            phone_number: localStorage.getItem('niveshpe_user_phone'),
            email: localStorage.getItem('niveshpe_user_email'),
            pan_verified: localStorage.getItem('niveshpe_pan_verified') === 'true'
        };
        
        const userProperties = {
            ...defaultProperties,
            ...userData,
            ...properties
        };
        
        amplitude.setUserProperties(userProperties);
        console.log('User properties updated:', userProperties);
    } catch (error) {
        console.error('Error updating user properties:', error);
    }
}

// Authentication Events
const AuthTracking = {
    trackPhoneEntry: function(phoneNumber) {
        trackEvent('phone_number_entered', {
            page_source: 'auth',
            entry_point: document.referrer || 'direct'
        });
    },
    
    trackOTPRequest: function(phoneNumber) {
        trackEvent('otp_requested', {
            phone_number: phoneNumber.substring(0, 6) + '****', // Mask for privacy
            request_time: Date.now()
        });
    },
    
    trackOTPVerified: function(phoneNumber, attempts) {
        trackEvent('otp_verified', {
            phone_number: phoneNumber.substring(0, 6) + '****',
            attempts: attempts || 1,
            verification_time: Date.now()
        });
        
        // Set user ID after successful OTP
        amplitude.setUserId(phoneNumber);
        localStorage.setItem('niveshpe_user_phone', phoneNumber);
    },
    
    trackPANSubmitted: function(panMasked) {
        trackEvent('pan_submitted', {
            pan_masked: panMasked,
            user_type: localStorage.getItem('niveshpe_user_type')
        });
    },
    
    trackPANVerified: function(panMasked, nameMatch, isExisting) {
        trackEvent('pan_verified', {
            pan_masked: panMasked,
            name_match: nameMatch,
            existing_investor: isExisting
        });
        
        updateUserProperties({
            pan_verified: true,
            user_type: isExisting ? 'existing' : 'new'
        });
    }
};

// KYC Events
const KYCTracking = {
    trackKYCStarted: function() {
        trackEvent('kyc_started', {
            user_type: localStorage.getItem('niveshpe_user_type'),
            pan_verified: localStorage.getItem('niveshpe_pan_verified') === 'true'
        });
    },
    
    trackPersonalDetailsSubmitted: function(details) {
        trackEvent('personal_details_submitted', {
            has_nominee: !!details.nominee,
            income_range: details.incomeRange,
            occupation: details.occupation
        });
    },
    
    trackBankAccountAdded: function(bankName, accountType) {
        trackEvent('bank_account_added', {
            bank_name: bankName,
            account_type: accountType,
            is_primary: true
        });
    },
    
    trackKYCCompleted: function() {
        trackEvent('kyc_completed', {
            completion_time: Date.now(),
            user_type: localStorage.getItem('niveshpe_user_type')
        });
        
        updateUserProperties({
            kyc_status: 'completed',
            kyc_completion_date: new Date().toISOString()
        });
    }
};

// Investment Events
const InvestmentTracking = {
    trackFundViewed: function(fundName, fundCategory, returns, source) {
        trackEvent('fund_viewed', {
            fund_name: fundName,
            fund_category: fundCategory,
            fund_returns: returns,
            view_source: source || 'browse'
        });
    },
    
    trackFundSelected: function(fundName, fundCategory, expectedReturns) {
        trackEvent('fund_selected', {
            fund_name: fundName,
            fund_category: fundCategory,
            expected_returns: expectedReturns
        });
    },
    
    trackInvestmentAmount: function(amount, investmentType, fundName) {
        trackEvent('investment_amount_entered', {
            amount: amount,
            investment_type: investmentType,
            fund_name: fundName
        });
    },
    
    trackPaymentMethod: function(method, fundName, amount) {
        trackEvent('payment_method_selected', {
            payment_method: method,
            fund_name: fundName,
            amount: amount
        });
    },
    
    trackInvestmentCompleted: function(fundName, amount, type, paymentMethod) {
        trackEvent('investment_completed', {
            fund_name: fundName,
            amount: amount,
            investment_type: type,
            payment_method: paymentMethod
        });
        
        // Track as revenue
        trackRevenue(amount, type, {
            fund_name: fundName,
            payment_method: paymentMethod
        });
        
        // Update user properties
        const currentInvested = parseFloat(localStorage.getItem('niveshpe_total_invested') || 0);
        const newTotal = currentInvested + amount;
        localStorage.setItem('niveshpe_total_invested', newTotal);
        
        updateUserProperties({
            total_invested: newTotal,
            last_investment_date: new Date().toISOString(),
            first_investment_date: localStorage.getItem('niveshpe_first_investment_date') || new Date().toISOString()
        });
    }
};

// Portfolio Events
const PortfolioTracking = {
    trackPortfolioViewed: function(totalValue, totalInvested, totalReturns) {
        trackEvent('portfolio_viewed', {
            total_value: totalValue,
            total_invested: totalInvested,
            total_returns: totalReturns,
            returns_percentage: ((totalReturns / totalInvested) * 100).toFixed(2)
        });
    },
    
    trackFundPerformance: function(fundName, returns, invested, currentValue) {
        trackEvent('fund_performance_viewed', {
            fund_name: fundName,
            returns: returns,
            invested_amount: invested,
            current_value: currentValue
        });
    }
};

// Goal Events
const GoalTracking = {
    trackGoalCreated: function(goalName, goalType, targetAmount, targetDate, monthlyInvestment) {
        trackEvent('goal_created', {
            goal_name: goalName,
            goal_type: goalType,
            target_amount: targetAmount,
            target_date: targetDate,
            monthly_investment: monthlyInvestment
        });
        
        // Update goals count
        const goalsCount = parseInt(localStorage.getItem('niveshpe_goals_count') || 0) + 1;
        localStorage.setItem('niveshpe_goals_count', goalsCount);
        updateUserProperties({ goals_count: goalsCount });
    },
    
    trackGoalViewed: function(goalName, progressPercentage, remainingAmount) {
        trackEvent('goal_viewed', {
            goal_name: goalName,
            progress_percentage: progressPercentage,
            remaining_amount: remainingAmount
        });
    }
};

// Engagement Events
const EngagementTracking = {
    trackCalculatorUsed: function(calculatorType, inputAmount, result) {
        trackEvent('calculator_used', {
            calculator_type: calculatorType,
            input_amount: inputAmount,
            calculated_result: result
        });
    },
    
    trackReferralClicked: function(ctaLocation) {
        trackEvent('referral_clicked', {
            cta_location: ctaLocation,
            page_source: window.location.pathname
        });
    },
    
    trackMenuOpened: function() {
        trackEvent('menu_opened', {
            page_source: window.location.pathname,
            session_time: Date.now() - getSessionStartTime()
        });
    }
};

// Utility Functions
function getDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/iphone|ipod/.test(userAgent)) return 'iOS';
    if (/ipad/.test(userAgent)) return 'iPadOS';
    if (/android/.test(userAgent)) return 'Android';
    return 'Web';
}

function getSessionId() {
    let sessionId = sessionStorage.getItem('niveshpe_session_id');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        sessionStorage.setItem('niveshpe_session_id', sessionId);
        sessionStorage.setItem('niveshpe_session_start', Date.now());
    }
    return sessionId;
}

function getSessionStartTime() {
    return parseInt(sessionStorage.getItem('niveshpe_session_start') || Date.now());
}

// Page View Tracking
function trackPageView() {
    const pageName = document.title || 'Unknown Page';
    const pageUrl = window.location.href;
    const pagePath = window.location.pathname;
    
    trackEvent('page_viewed', {
        page_name: pageName,
        page_url: pageUrl,
        page_path: pagePath,
        referrer: document.referrer
    });
}

// Error Tracking
window.addEventListener('error', function(e) {
    trackEvent('error_occurred', {
        error_type: 'javascript_error',
        error_message: e.message,
        error_stack: e.error?.stack,
        page_source: window.location.href
    });
});

// Session End Tracking
window.addEventListener('beforeunload', function() {
    const sessionDuration = Date.now() - getSessionStartTime();
    trackEvent('session_ended', {
        session_duration: sessionDuration,
        pages_viewed: parseInt(sessionStorage.getItem('pages_viewed') || 1),
        last_page: window.location.pathname
    });
});

// Initialize on DOM Ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initializeAmplitude();
        trackPageView();
    });
} else {
    initializeAmplitude();
    trackPageView();
}

// Export tracking functions for use in other scripts
window.NiveshPeTracking = {
    trackEvent,
    trackRevenue,
    updateUserProperties,
    Auth: AuthTracking,
    KYC: KYCTracking,
    Investment: InvestmentTracking,
    Portfolio: PortfolioTracking,
    Goal: GoalTracking,
    Engagement: EngagementTracking
};