import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React, { Component, PropsWithChildren } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager, Alert } from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class AppleStyleSwipeableRow extends Component<PropsWithChildren<unknown>> {
    private renderRightAction = (
        text: string,
        color: string,
        x: number, // The x position where the button will slide in from
        progress: Animated.AnimatedInterpolation<number> // The animated progress of the swipe gesture
    ) => {
        const trans = progress.interpolate({
            // Interpolating the swipe progress to create a translation effect
            // The button will slide in from the right as the user swipes
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const pressHandler = () => {
            // Handle the press action for the right action button
            // For demonstration, we will just close the swipeable and show an alert
            this.close();
            Alert.alert('Action', `You pressed ${text} action!`);
        };

        // Rendering a right action button with animation
        // The button slides in from the right when swiped
        // The button's translation is animated based on the swipe progress
        // The button is wrapped in an Animated.View for smooth transitions
        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton style={[styles.rightAction, { backgroundColor: color }]} onPress={pressHandler}>
                    <Ionicons
                        name={text === 'More' ? 'ellipsis-horizontal' : 'archive'}
                        size={24}
                        color={'#fff'}
                        style={{ paddingTop: 10 }}
                    />
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };

    private renderRightActions = (
        progress: Animated.AnimatedInterpolation<number>,
        _dragAnimatedValue: Animated.AnimatedInterpolation<number>
    ) => (
        <View
            style={{
                width: 192,
                flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            }}>
            {this.renderRightAction('More', '#C8C7CD', 192, progress)}
            {this.renderRightAction('Archive', Colors.muted, 128, progress)}
        </View>
    );

    private swipeableRow?: Swipeable;

    private updateRef = (ref: Swipeable) => {
        this.swipeableRow = ref;
    };
    private close = () => {
        this.swipeableRow?.close();
    };
    render() {
        const { children } = this.props;
        return (
            <Swipeable
                ref={this.updateRef}
                friction={2}
                enableTrackpadTwoFingerGesture
                rightThreshold={40}
                renderRightActions={this.renderRightActions}
            >
                {children}
            </Swipeable>
        );
    }
}

const styles = StyleSheet.create({
    leftAction: {
        flex: 1,
        backgroundColor: '#497AFC',
        justifyContent: 'center',
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
})