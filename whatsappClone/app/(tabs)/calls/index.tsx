import { ScrollView, TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, {
    CurvedTransition,
    FadeInUp,
    FadeOutUp,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { format } from 'date-fns';

import { defaultStyles } from '@/constants/Styles';
import calls from '@/assets/data/calls.json';
import { SegmentedControl } from '@/components/SegmentedControl';
import SwipeableRow from '@/components/SwipeableRow';

const transition = CurvedTransition.delay(100); // Layout transitions with a curved animation

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const Page = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [selectedOption, setSelectedOption] = useState('All')
    const [items, setItems] = useState(calls);
    const editing = useSharedValue(-30);

    const onEdit = () => {
        let editingNew = !isEditing;
        editing.value = editingNew ? 0 : -30;
        setIsEditing(editingNew);
    };

    const onSegmentChange = (option: string) => {
        setSelectedOption(option);
        if (option === 'All') {
            setItems(calls);
        } else {
            setItems(calls.filter((call) => call.missed));
        }
    };

    const removeCall = (toDelete: any) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setItems(items.filter((item) => item.id !== toDelete.id));
    };

    const animatedRowStyles = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(editing.value) }],
    }));

    const animatedPosition = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(editing.value) }],
    }));

    return (
        <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={{ paddingBottom: 40 }}
            style={{ flex: 1, backgroundColor: Colors.background }}
        >
            <Stack.Screen
                options={{
                    headerTitle: () => (
                        <SegmentedControl
                            options={['All', 'Missed']}
                            selectedOption={selectedOption}
                            onOptionPress={onSegmentChange}
                        />
                    ),
                    headerLeft: () => (
                        <TouchableOpacity onPress={onEdit}>
                            <Text style={{ color: Colors.primary, fontSize: 18 }}>
                                {isEditing ? 'Done' : 'Edit'}
                            </Text>
                        </TouchableOpacity>
                    ),
                }}
            />

            <Animated.View style={[defaultStyles.block]} layout={transition}>
                <Animated.FlatList
                    skipEnteringExitingAnimations // Disable entering/exiting animations for the FlatList
                    data={items}
                    scrollEnabled={false}
                    itemLayoutAnimation={transition} // Use the curved transition for item layout changes
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => <View style={defaultStyles.separator} />}
                    renderItem={({ item, index }) => (
                        <SwipeableRow onDelete={() => removeCall(item)}>
                            <Animated.View
                                entering={FadeInUp.delay(index * 20)} // Delay each item entering animation
                                exiting={FadeOutUp}
                                style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <AnimatedTouchableOpacity
                                    style={[animatedPosition, { paddingLeft: 8 }]}
                                    onPress={() => removeCall(item)}>
                                    <Ionicons name="remove-circle" size={24} color={Colors.red} />
                                </AnimatedTouchableOpacity>

                                <Animated.View
                                    style={[defaultStyles.item, { paddingLeft: 20 }, animatedRowStyles]}>
                                    <Image source={{ uri: item.img }} style={styles.avatar} />

                                    <View style={{ flex: 1, gap: 2 }}>
                                        <Text style={{ fontSize: 18, color: item.missed ? Colors.red : '#000' }}>
                                            {item.name}
                                        </Text>

                                        <View style={{ flexDirection: 'row', gap: 4 }}>
                                            <Ionicons
                                                name={item.video ? 'videocam' : 'call'}
                                                size={16}
                                                color={Colors.gray}
                                            />
                                            <Text style={{ color: Colors.gray, flex: 1 }}>
                                                {item.incoming ? 'Incoming' : 'Outgoing'}
                                            </Text>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            gap: 6,
                                            alignItems: 'center',
                                        }}>
                                        <Text style={{ color: Colors.gray }}>{format(item.date, 'MM.dd.yy')}</Text>
                                        <Ionicons
                                            name="information-circle-outline"
                                            size={24}
                                            color={Colors.primary}
                                        />
                                    </View>
                                </Animated.View>
                            </Animated.View>
                        </SwipeableRow>
                    )}
                />
            </Animated.View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
});

export default Page