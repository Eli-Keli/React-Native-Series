import { TouchableOpacity, View } from 'react-native';
import { Link, Stack, useRouter, useSegments } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Cache the Clerk JWT
const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key); // Retrieve the token from secure storage
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value); // Save the token to secure storage
    } catch (err) {
      return;
    }
  },
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments(); // Get the current navigation segments
  const router = useRouter();
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  }); // Load custom fonts

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(tabs)'; // check if the user is in the tabs group

    if (isSignedIn && !inTabsGroup) {
      router.replace('/(tabs)/chats');
    } else if (!isSignedIn) {
      router.replace('/(tabs)/chats');
    }
  }, [isSignedIn]);

  if (!loaded || !isLoaded) {
    return <View />;
  }
  
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="otp" options={{
        title: 'Enter Your Phone Number',
      }} />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          title: 'Verify Your Phone Number',
          headerBackTitle: 'Edit Phone',
          headerBackTitleStyle: {
            fontSize: 16,
          }
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modal)/new-chat" options={{
          title: 'New Chat',
          presentation: 'modal',
          headerTransparent: true,
          headerBlurEffect: 'regular', // Only supported on iOS
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerSearchBarOptions: {
            placeholder: 'Search name or number',
            hideWhenScrolling: false,
          },
          headerRight: () => (
            <Link href={'/(tabs)/chats'} asChild>
              <TouchableOpacity
                style={{ backgroundColor: Colors.lightGray, borderRadius: 20, padding: 4 }}>
                <Ionicons name="close" color={Colors.gray} size={30} />
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}



const RootLayoutNav = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <RootLayout />
    </ClerkProvider>
  );
};

export default RootLayoutNav;