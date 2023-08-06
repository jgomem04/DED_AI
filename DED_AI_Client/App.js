import Welcome from './src/views/Welcome';
import Preview from './src/views/Preview';
import Loading from './src/views/Loading';
import Error from './src/views/Error';
import Results from './src/views/Results';
import Feedback from './src/views/Feedback';
import Thanks from './src/views/Thanks';
import Login from './src/views/Login';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
        <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
        <Stack.Screen name="Preview" component={Preview} options={{headerShown: false}}/>
        <Stack.Screen name="Loading" component={Loading} options={{headerShown: false}}/>
        <Stack.Screen name="Error" component={Error} options={{headerShown: false}}/>
        <Stack.Screen name="Results" component={Results} options={{headerShown: false}}/>
        <Stack.Screen name="Feedback" component={Feedback} options={{headerShown: false}}/>
        <Stack.Screen name="Thanks" component={Thanks} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}