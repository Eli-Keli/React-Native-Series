import { StyleSheet, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Swipeable } from 'react-native-gesture-handler';

import {
    GiftedChat,
    Bubble,
    InputToolbar,
    Send,
    SystemMessage,
    IMessage,
} from 'react-native-gifted-chat';

import messageData from '@/assets/data/messages.json';
import ReplyMessageBar from '@/components/ReplyMessageBar';
import ChatMessageBox from '@/components/ChatMessageBox';
import chats from '@/assets/data/chats.json';


const Page = () => {
    const {id} = useLocalSearchParams<{id: string}>(); // Get the chat ID from the URL parameters
    const chat = chats.find((chat) => chat.id === id); // Find the chat data based on the ID

    const [messages, setMessages] = useState<IMessage[]>([]); // Initialize messages state with an empty array
    const [replyMessage, setReplyMessage] = useState<IMessage | null>(null);
    const [text, setText] = useState(''); // State to manage the text input in the chat composer

    const insets = useSafeAreaInsets(); // Get the safe area insets for bottom padding (to avoid content being obscured by the home indicator on iOS devices)
    const swipeableRowRef = useRef<Swipeable | null>(null);

    // Initialize messages with a sample message when the component mounts
    useEffect(() => {
        setMessages([
            ...messageData.map((message) => {
                return {
                    _id: message.id,
                    text: message.msg,
                    createdAt: new Date(message.date),
                    user: {
                        _id: message.from,
                        name: message.from ? 'You' : 'Bob',
                    },
                };
            }),
            {
                _id: 0,
                system: true,
                text: 'All your base are belong to us',
                createdAt: new Date(),
                user: {
                    _id: 0,
                    name: 'Bot',
                },
            },
        ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages: any[]) =>
            GiftedChat.append(previousMessages, messages),
        )
    }, [])

    const updateRowRef = useCallback(
        (ref: any) => {
            if (
                ref &&
                replyMessage &&
                ref.props.children.props.currentMessage?._id === replyMessage._id
            ) {
                swipeableRowRef.current = ref;
            }
        },
        [replyMessage]
    );

    useEffect(() => {
        if (replyMessage && swipeableRowRef.current) {
            swipeableRowRef.current.close();
            swipeableRowRef.current = null;
        }
    }, [replyMessage]);

    const renderInputToolbar = (props: any) => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{ backgroundColor: Colors.background }}
                renderActions={() => (
                    <View style={{ height: 44, justifyContent: 'center', alignItems: 'center', left: 5 }}>
                        <Ionicons name="add" color={Colors.primary} size={28} />
                    </View>
                )}
            />
        );
    };

    return (
        <ImageBackground
            source={require('@/assets/images/pattern.png')}
            style={{
                flex: 1,
                backgroundColor: Colors.background,
                marginBottom: insets.bottom,
            }}
        >
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <View
                            style={{
                                flexDirection: 'row',
                                width: 220,
                                alignItems: 'center',
                                gap: 10,
                                paddingBottom: 4,
                            }}
                        >
                            <Image
                                source={{
                                    uri: chat?.img || 'https://pbs.twimg.com/profile_images/1564203599747600385/f6Lvcpcu_400x400.jpg',
                                }}
                                style={{ width: 40, height: 40, borderRadius: 50 }}
                            />
                            <Text style={{ fontSize: 16, fontWeight: '500' }}>
                                {chat?.from || 'Simon Grimm'}
                            </Text>
                        </View>
                    ),
                }}
            />
            <GiftedChat
                messages={messages}
                onSend={(messages: any) => onSend(messages)}
                onInputTextChanged={setText}
                user={{
                    _id: 1,
                }}
                renderAvatar={null} // Hide avatars
                maxComposerHeight={100} // Limit the height of the composer input
                renderSystemMessage={(props) => (
                    <SystemMessage {...props} textStyle={{ color: Colors.gray }} />
                )}
                bottomOffset={insets.bottom} // Adjust for the safe area insets at the bottom
                textInputProps={styles.composer}
                renderBubble={(props) => {
                    return (
                        <Bubble
                            {...props}
                            textStyle={{
                                right: {
                                    color: '#000',
                                },
                            }}
                            wrapperStyle={{
                                left: {
                                    backgroundColor: '#fff',
                                },
                                right: {
                                    backgroundColor: Colors.lightGreen,
                                },
                            }}
                        />
                    );
                }} // Custom bubble style
                renderSend={(props) => (
                    <View
                        style={{
                            height: 44,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 14,
                            paddingHorizontal: 14,
                        }}>
                        {text === '' && (
                            <>
                                <Ionicons name="camera-outline" color={Colors.primary} size={28} />
                                <Ionicons name="mic-outline" color={Colors.primary} size={28} />
                            </>
                        )}
                        {text !== '' && (
                            <Send
                                {...props}
                                containerStyle={{
                                    justifyContent: 'center',
                                }}>
                                <Ionicons name="send" color={Colors.primary} size={28} />
                            </Send>
                        )}
                    </View>
                )} // Custom Send button
                renderInputToolbar={renderInputToolbar} // Custom InputToolbar (to include left icon for actions)
                renderChatFooter={() => (
                    <ReplyMessageBar clearReply={() => setReplyMessage(null)} message={replyMessage} />
                )} // Custom footer to show the reply message bar on long press
                onLongPress={(context, message) => setReplyMessage(message)}
                renderMessage={(props) => (
                    <ChatMessageBox
                        {...props}
                        setReplyOnSwipeOpen={setReplyMessage}
                        updateRowRef={updateRowRef}
                    />
                )} // Custom message component to handle swipe actions and reply
            />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    composer: {
        height: 44,
        backgroundColor: '#fff',
        borderRadius: 18,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        paddingHorizontal: 10,
        paddingTop: 8,
        fontSize: 16,
        marginVertical: 4,
    },
});

export default Page