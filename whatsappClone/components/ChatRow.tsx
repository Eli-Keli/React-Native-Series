import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Link } from 'expo-router';

import { format } from 'date-fns';
import AppleStyleSwipeableRow from './AppleStyleSwipeableRow';
import Colors from '@/constants/Colors';

export interface ChatRowProps {
    id: string;
    from: string;
    date: string;
    img: string;
    msg: string;
    read: boolean;
    unreadCount: number;
}

const ChatRow: React.FC<ChatRowProps> = ({ id, from, date, img, msg, read, unreadCount }) => {
    return (
        <AppleStyleSwipeableRow>
            <Link href={`/(tabs)/chats/${id}`} asChild>
                <TouchableHighlight activeOpacity={0.8} underlayColor={Colors.lightGray}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 14,
                            paddingLeft: 20,
                            paddingVertical: 10,
                        }}
                    >
                        <Image source={{ uri: img }} style={{ width: 50, height: 50, borderRadius: 50 }} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{from}</Text>
                            <Text style={{ fontSize: 16, color: Colors.gray }}>
                                {msg.length > 40 ? `${msg.substring(0, 40)}...` : msg}
                            </Text>
                        </View>
                        <View style={{ alignItems: 'flex-end', paddingRight: 20 }}>
                            <Text style={{ fontSize: 14, color: Colors.gray }}>
                                {format(new Date(date), 'HH:mm')}
                            </Text>
                            {unreadCount > 0 && (
                                <View
                                    style={{
                                        backgroundColor: Colors.primary,
                                        borderRadius: 50,
                                        paddingHorizontal: 8,
                                        paddingVertical: 2,
                                        marginTop: 4,
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: 12 }}>{unreadCount}</Text>
                                </View>
                            )}
                        </View>
                    </View>
                </TouchableHighlight>
            </Link>
        </AppleStyleSwipeableRow>
    );
};
export default ChatRow;