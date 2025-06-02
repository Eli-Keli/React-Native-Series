import { View, Text, StyleSheet, TouchableOpacity, Linking, TextInput, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import MaskInput from 'react-native-mask-input';
import { useRouter } from 'expo-router';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';

const KEN_PHONE = [
    `+`,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
];

const Page = () => {
    const router = useRouter();

    const [phoneNumber, setPhoneNumber] = useState('+254 ');
    const [loading, setLoading] = useState(false);
    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();


    const openLink = () => Linking.openURL('https://example.com/privacy-policy'); // Use actual URL

    const sendOTP = async () => {
        console.log(`Sending OTP to ${phoneNumber}`);
        setLoading(true);

        try {
            // Start the sign-up process with the phone number
            await signUp?.create({
                phoneNumber: phoneNumber,
            })

            // Start the verification - a SMS message will be sent to the number with a one-time code
            await signUp!.preparePhoneNumberVerification();

            console.log(`OTP sent to ${phoneNumber}`);

            router.push(`/verify/${phoneNumber}`);

        } catch (error) {
            console.error('Error sending OTP:', JSON.stringify(error, null, 2));

            // Handle errors from the Clerk API
            if (isClerkAPIResponseError(error)) {
                if (error.errors[0].code === 'form_identifier_exists') {
                    // User signed up before
                    console.log('User signed up before');
                    await trySignIn();
                } else {
                    setLoading(false);
                    Alert.alert(error.errors[0].longMessage || error.errors[0].message);
                }
            }
        }
    }
    const trySignIn = async () => {
        console.log(`Trying to sign in with ${phoneNumber}`);

        try {
            // Attempt to sign in with the phone number
            const { supportedFirstFactors } = await signIn!.create({
                identifier: phoneNumber,
            })

            // Check if the phone_code factor is supported
            const firstPhoneFactor: any = supportedFirstFactors?.find((factor: any) => {
                return factor.strategy === 'phone_code';
            });

            const { phoneNumberId } = firstPhoneFactor;

            // Prepare the phone number verification
            await signIn!.prepareFirstFactor({
                strategy: 'phone_code',
                phoneNumberId,
            });
            console.log(`OTP sent to ${phoneNumber} for sign-in`);
            router.push(`/verify/${phoneNumber}?signin=true`);
            setLoading(false);

        } catch (error) {
            console.error('Error during sign-in:', JSON.stringify(error, null, 2));
            setLoading(false);
            Alert.alert('Error', 'Failed to sign in. Please try again.');
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding" // 'padding' is used for iOS, 'height' for Android
            keyboardVerticalOffset={100}
        >
            {loading && (
                <View style={[StyleSheet.absoluteFill, styles.loading]}>
                    <ActivityIndicator size="large" color={Colors.primary} />
                    <Text style={{ fontSize: 18, padding: 10 }}>Sending code...</Text>
                </View>
            )}
            <View style={styles.container}>
                <Text style={styles.description}>
                    WhatsApp will need to verify your account. Carrier charges may apply.
                </Text>

                <View style={styles.list}>
                    {/* Would be a real country selector here */}
                    <View style={styles.listItem}>
                        <Text style={styles.listItemText}>Kenya</Text>
                        <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
                    </View>
                    <View style={styles.separator} />

                    <MaskInput
                        value={phoneNumber}
                        placeholder='+254 7XX XXX XXX'
                        onChangeText={(masked, unmasked) => setPhoneNumber(masked)}
                        style={styles.input}
                        keyboardType='phone-pad'
                        autoFocus
                        mask={KEN_PHONE}
                    />
                </View>

                <Text style={styles.legal}>
                    You must be{' '}
                    <Text style={styles.link} onPress={openLink}>
                        at least 16 years old
                    </Text>{' '}
                    to register. Learn how WhatsApp works with the{' '}
                    <Text style={styles.link} onPress={openLink}>
                        Meta Companies
                    </Text>
                    .
                </Text>

                <View style={{ flex: 1 }} />

                <TouchableOpacity
                    style={[styles.button, phoneNumber !== '' ? styles.enabled : null, { marginBottom: 20 }]}
                    onPress={sendOTP}
                    disabled={loading || phoneNumber === ''}
                >
                    <Text style={[styles.buttonText, phoneNumber !== '' ? styles.enabled : null]}>Next</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Page

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.background,
        gap: 20,
    },
    description: {
        fontSize: 14,
        color: Colors.gray,
    },
    legal: {
        fontSize: 12,
        textAlign: 'center',
        color: '#000',
    },
    link: {
        color: Colors.primary,
    },
    list: {
        backgroundColor: '#fff',
        width: '100%',
        borderRadius: 10,
        padding: 10,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 6,
        marginBottom: 10,
    },
    listItemText: {
        fontSize: 18,
        color: Colors.primary,
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.gray,
        opacity: 0.2,
    },
    input: {
        backgroundColor: '#fff',
        width: '100%',
        fontSize: 16,
        padding: 6,
        marginTop: 10,
    },
    button: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        padding: 10,
        borderRadius: 10,
    },
    enabled: {
        backgroundColor: Colors.primary,
        color: '#fff',
    },
    buttonText: {
        color: Colors.gray,
        fontSize: 22,
        fontWeight: '500',
    },
    loading: {
        zIndex: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
})