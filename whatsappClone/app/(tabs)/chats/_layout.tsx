import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack } from 'expo-router';
import { TouchableOpacity, View, Text, Image } from 'react-native';

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: 'Chats',
                    headerLargeTitle: true, // Only available on iOS
                    headerTransparent: true,
                    headerBlurEffect: 'regular', // Only supported on iOS
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: '#fff',
                    },
                    headerLeft: () => (
                        <TouchableOpacity>
                            <Ionicons
                                name="ellipsis-horizontal-circle-outline"
                                color={Colors.primary}
                                size={30}
                            />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', gap: 30 }}>
                            <TouchableOpacity>
                                <Ionicons name="camera-outline" color={Colors.primary} size={30} />
                            </TouchableOpacity>
                            <Link href="/(modal)/new-chat" asChild>
                                <TouchableOpacity>
                                    <Ionicons name="add-circle" color={Colors.primary} size={30} />
                                </TouchableOpacity>
                            </Link>
                        </View>
                    ),
                    headerSearchBarOptions: {
                        placeholder: 'Search',
                    },
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    title: '',
                    headerBackButtonDisplayMode: 'minimal',
                    headerStyle: {
                        backgroundColor: Colors.background,
                    },
                    headerRight: () => (
                        <View style={{ flexDirection: 'row', gap: 30 }}>
                            <TouchableOpacity>
                                <Ionicons name="videocam-outline" color={Colors.primary} size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Ionicons name="call-outline" color={Colors.primary} size={30} />
                            </TouchableOpacity>
                        </View>
                    ),
                }}
            />
        </Stack>
    );
};

export default Layout;