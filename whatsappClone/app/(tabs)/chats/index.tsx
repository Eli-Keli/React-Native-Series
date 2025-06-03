import { View, FlatList } from 'react-native';
import chats from '@/assets/data/chats.json';
import ChatRow from '@/components/ChatRow';
import { defaultStyles } from '@/constants/Styles';

const Page = () => {
    return (
            <FlatList
                data={chats}
                renderItem={({ item }) => <ChatRow {...item} />}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => (
                    <View style={[defaultStyles.separator, { marginLeft: 90 }]} />
                )}
                contentContainerStyle={{ paddingBottom: 40, backgroundColor: '#fff' }}
                contentInsetAdjustmentBehavior='automatic'
            />
    );
};
export default Page;