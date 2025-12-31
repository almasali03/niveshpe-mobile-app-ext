import { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import AmplitudeService from '../services/AmplitudeService';

export function useScreenTracking(screenName, properties = {}) {
  const navigation = useNavigation();
  const route = useRoute();
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AmplitudeService.trackEvent('screen_viewed', {
        screen_name: screenName,
        previous_screen: navigation.getState()?.routes[navigation.getState().index - 1]?.name,
        params: route.params,
        ...properties,
      });
    });
    
    return unsubscribe;
  }, [navigation, screenName]);
}

// Usage example:
// function DashboardScreen() {
//   useScreenTracking('Dashboard');
//   return <View>...</View>;
// }
