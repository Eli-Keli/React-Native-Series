import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import Colors from '@/constants/Colors'

const welcome_image = Image.resolveAssetSource(require('@/assets/images/welcome.png')).uri

const WelcomeScreen = () => {

    const openLink = () => Linking.openURL('https://example.com/privacy-policy') // Use actual URL

    return (
        <View style={styles.container}>
            <Image source={{ uri: welcome_image }} style={styles.welcome} />
            <Text style={styles.headline}>Welcome to WhatsApp Clone</Text>
            <Text style={styles.description}>
                Read our{' '}
                <Text onPress={openLink} style={styles.link}>
                    Privacy Policy
                </Text>
                . {'Tap "Agree & Continue" to accept the '}
                <Text onPress={openLink} style={styles.link}>
                    Terms of Service
                </Text>
                .
            </Text>
            <Link href={'/otp'} replace asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Agree & Continue</Text>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    welcome: {
        width: '100%',
        height: 300,
        borderRadius: 60,
        marginBottom: 80,
    },
    headline: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 80,
        color: Colors.gray,
    },
    link: {
        color: Colors.primary,
    },
    button: {
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.primary,
        fontSize: 22,
        fontWeight: '500',
    },
})