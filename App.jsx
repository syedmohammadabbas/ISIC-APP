import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './pages/HomeScreen';
import ConnectDevice from './pages/ConnectDevices';
import PressureGraph from './pages/PressureGraph';
import AnalyzePressure from './pages/AnalyzePressure';

const Stack = createNativeStackNavigator();

const FirstScreen = ({ navigation }) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
  }, [navigation]);

  return (
    <View style={styles.firstScreen}>
      <Image source={require('./assets/ISIC_Logo.png')} />
      <Text style={styles.GraphAndUIText}>Respiratory Care App</Text>
    </View>
  );
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="First" 
        screenOptions={{ 
            headerStyle: { backgroundColor: '#002B5B' }, 
            headerTintColor: '#FFF',
            headerShown: false,
        }}
      >
        <Stack.Screen name="First" component={FirstScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ConnectDevice" component={ConnectDevice} />
        <Stack.Screen name="AnalyzePressure" component={AnalyzePressure} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return <MyStack />;
}

const styles = StyleSheet.create({
  firstScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#002B5B',
    gap: 20,
  },
  GraphAndUIText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 24,
  },
});
