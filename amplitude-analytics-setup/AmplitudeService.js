import * as Amplitude from '@amplitude/react-native';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AMPLITUDE_API_KEY = __DEV__ 
  ? 'YOUR_DEV_API_KEY_HERE'
  : 'YOUR_PROD_API_KEY_HERE';

class AmplitudeService {
  initialized = false;

  async initialize() {
    if (this.initialized) return;
    
    try {
      await Amplitude.init(AMPLITUDE_API_KEY);
      await this.setInitialUserProperties();
      await this.trackAppOpen();
      this.initialized = true;
      console.log('Amplitude initialized successfully');
    } catch (error) {
      console.error('Error initializing Amplitude:', error);
    }
  }

  async setInitialUserProperties() {
    const deviceInfo = {
      device_id: DeviceInfo.getUniqueId(),
      device_brand: DeviceInfo.getBrand(),
      device_model: DeviceInfo.getModel(),
      system_name: DeviceInfo.getSystemName(),
      system_version: DeviceInfo.getSystemVersion(),
      app_version: DeviceInfo.getVersion(),
      app_build: DeviceInfo.getBuildNumber(),
      is_tablet: DeviceInfo.isTablet(),
    };
    
    await Amplitude.setUserProperties(deviceInfo);
  }

  async trackAppOpen() {
    const lastOpenTime = await AsyncStorage.getItem('last_app_open');
    const timeSinceLastOpen = lastOpenTime 
      ? Date.now() - parseInt(lastOpenTime) 
      : 0;
    
    await this.trackEvent('app_opened', {
      time_since_last_open: timeSinceLastOpen,
      launch_source: 'direct',
    });
    
    await AsyncStorage.setItem('last_app_open', Date.now().toString());
  }

  async trackEvent(eventName, properties = {}) {
    try {
      await Amplitude.logEvent(eventName, {
        ...properties,
        timestamp: new Date().toISOString(),
        platform: DeviceInfo.getSystemName(),
      });
      
      if (__DEV__) {
        console.log(`📊 Event: ${eventName}`, properties);
      }
    } catch (error) {
      console.error(`Error tracking event ${eventName}:`, error);
    }
  }

  async setUserId(userId) {
    await Amplitude.setUserId(userId);
  }

  async setUserProperties(properties) {
    await Amplitude.setUserProperties(properties);
  }

  async trackRevenue(amount, productId, properties = {}) {
    const revenue = new Amplitude.Revenue()
      .setPrice(amount)
      .setQuantity(1)
      .setProductId(productId)
      .setRevenueType('investment');
    
    await Amplitude.logRevenue(revenue);
  }
}

export default new AmplitudeService();
