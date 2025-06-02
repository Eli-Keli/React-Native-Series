import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';
const CELL_COUNT = 6; // Number of cells in the code field

const Page = () => {
    const { phone, signin } = useLocalSearchParams<{ phone: string; signin: string }>(); // Extract phone number and signin status from the URL parameters

    const [code, setCode] = useState('');
    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT }); // Hook to manage focus on the code field
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    }); // Hook to clear the code field when focused

    const { signUp, setActive } = useSignUp();
    const { signIn } = useSignIn();

    // Effect to handle code verification when the code length reaches 6
    useEffect(() => {
        if (code.length === 6) {
            console.log(`Code entered: ${code}`);

            if (signin === 'true') {
                console.log(`Verifying sign-in for phone: ${phone}`);
                veryifySignIn();
            } else {
                verifyCode();
            }
        }
    }, [code]);

    const verifyCode = async () => {
        try {
            // Use the code provided by the user and attempt verification
            const signUpAttempt = await signUp!.attemptPhoneNumberVerification({
                code,
            });

            // If verification was completed, set the session to active
            if (signUpAttempt.status === 'complete') {
                await setActive!({ session: signUpAttempt.createdSessionId });
            } else {
                // If the status is not complete, check why. User may need to complete further steps.
                console.error(signUpAttempt);
                Alert.alert('Verification Incomplete', 'Please check the code and try again.');
            }
        } catch (err) {
            console.log('error', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert('Error', err.errors[0].message);
            }
        }
    };

    const veryifySignIn = async () => {
        try {
            // Attempt to sign in using the provided phone number and code
            console.log(`Attempting sign-in for phone: ${phone} with code: ${code}`);
            await signIn!.attemptFirstFactor({
                strategy: 'phone_code',
                code,
            });

            await setActive!({ session: signIn!.createdSessionId });
        } catch (err) {
            console.log('error', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert('Error', err.errors[0].message);
            }
        }
    };

    const resendCode = async () => {
        try {
            if (signin === 'true') {
                const { supportedFirstFactors } = await signIn!.create({
                    identifier: phone,
                })

                const firstPhoneFactor: any = supportedFirstFactors?.find((factor: any) => {
                    return factor.strategy === 'phone_code';
                });

                const { phoneNumberId } = firstPhoneFactor;

                await signIn!.prepareFirstFactor({
                    strategy: 'phone_code',
                    phoneNumberId,
                });
            } else {
                await signUp!.create({
                    phoneNumber: phone,
                });
                signUp!.preparePhoneNumberVerification();
            }
        } catch (err) {
            console.log('error', JSON.stringify(err, null, 2));
            if (isClerkAPIResponseError(err)) {
                Alert.alert('Error', err.errors[0].message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: phone }} />

            <Text style={styles.legal}>We have sent you an SMS with a code to the number above.</Text>
            <Text style={styles.legal}>
                To complete your phone number verification, please enter the 6-digit activation code.
            </Text>

            <CodeField
                ref={ref}
                {...props}
                value={code}
                onChangeText={setCode}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
                renderCell={({ index, symbol, isFocused }) => (
                    <View
                        key={index}
                        style={[styles.cellRoot, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}
                    >
                        <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
                    </View>
                )}
            />

            <TouchableOpacity style={styles.button} onPress={resendCode}>
                <Text style={styles.buttonText}>Didn't receive a verification code?</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.background,
        gap: 20,
    },
    legal: {
        fontSize: 14,
        textAlign: 'center',
        color: '#000',
    },
    button: {
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.primary,
        fontSize: 14,
    },
    codeFieldRoot: {
        marginTop: 20,
        width: 260,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: 4,
    },
    cellRoot: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    cellText: {
        color: '#000',
        fontSize: 28,
        textAlign: 'center',
    },
    focusCell: {
        paddingBottom: 4,
        borderBottomColor: '#000',
        borderBottomWidth: 2,
    },
});