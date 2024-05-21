import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "@/screens/HomeScreen";
import { NativeWindStyleSheet } from "nativewind";
import RestaurantScreen from '@/screens/RestaurantScreen';
import { RootStackParamList } from '@/types/globalTypes';
import { Provider } from 'react-redux';
import {store} from '../store'
import CheckoutScreen from '@/screens/CheckoutScreen';
import PreparingOrder from '@/screens/PreparingOrder';
import { enableScreens } from 'react-native-screens';
import Delivery from '@/screens/DeliveryScreen';
import { Platform, UIManager } from 'react-native';
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
enableScreens();


NativeWindStyleSheet.setOutput({
  default: "native",
});

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
            <Stack.Screen name="Restaurant" component={RestaurantScreen} options={{headerShown:false}} />
            <Stack.Screen name="Checkout" component={CheckoutScreen} options={{headerShown:false}}/>
            <Stack.Screen 
              name="PreparingOrder" 
              component={PreparingOrder} 
              options={{
                headerShown:false,
                presentation:'modal',
                animation:'slide_from_bottom'
              }}
            />
            <Stack.Screen 
              name="Delivery" 
              component={Delivery} 
              options={{
                headerShown:false,
                presentation:'modal',
                animation:'slide_from_bottom'
              }}
            />
          </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
