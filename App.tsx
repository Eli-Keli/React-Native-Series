/* eslint-disable @typescript-eslint/no-unused-vars */
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import BouncyCheckbox from 'react-native-bouncy-checkbox';

// Form Validation
import * as Yup from 'yup';
import { Formik } from 'formik';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .required('Password length is required')
    .min(4, 'Password length must be at least 4')
    .max(16, 'Password length must be at most 16'),
});

export default function App() {

  const [passsword, setPassword] = useState('');
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const [lowercase, setLowercase] = useState(true);
  const [uppercase, setUppercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePassword = (passwordLength: number) => {
    let characterList = '';

    const lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const digitCharacters = '0123456789';
    const specialCharacters = '!@#$%^&*()_+';

    if (lowercase) {
      characterList += lowercaseCharacters;
    }
    if (uppercase) {
      characterList += uppercaseCharacters;
    }
    if (numbers) {
      characterList += digitCharacters;
    }
    if (symbols) {
      characterList += specialCharacters;
    }

    const password = createPassword(characterList, passwordLength);

    setPassword(password);
    setIsPassGenerated(true);

  };

  const createPassword = (characters: string, passwordLength: number): string => {
    let password = '';

    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(characterIndex);
    }

    return password;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowercase(true);
    setUppercase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.appContainer}>
      <SafeAreaView>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
            <Formik
              initialValues={{ passwordLength: '' }}
              validationSchema={PasswordSchema}
              onSubmit={(values) => {
                console.log(values);
                generatePassword(Number(values.passwordLength));
              }}
            >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <View>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    {
                      touched.passwordLength && errors.passwordLength && (
                        <Text style={styles.errorText}>{errors.passwordLength}</Text>
                      )
                    }
                  </View>
                  <TextInput
                    style={styles.inputStyle}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    keyboardType="numeric"
                    placeholder="Ex.8"
                  />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Lowercase letters</Text>
                  <View>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={lowercase}
                      onPress={() => setLowercase(!lowercase)}
                      fillColor="#29AB27"
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Uppercase letters</Text>
                  <View>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={uppercase}
                      onPress={() => setUppercase(!uppercase)}
                      fillColor="#FED85D"
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Numbers</Text>
                  <View>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={numbers}
                      onPress={() => setNumbers(!numbers)}
                      fillColor="#C9A0DC"
                    />
                  </View>
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading}>Include Symbols</Text>
                  <View>
                    <BouncyCheckbox
                      useBuiltInState={false}
                      isChecked={symbols}
                      onPress={() => setSymbols(!symbols)}
                      fillColor="#FC8085"
                    />
                  </View>
                </View>
                <View style={styles.formActions}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={() => handleSubmit()}
                  >
                    <Text style={styles.primaryBtnTxt}>Generate</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    disabled={!isValid}
                    style={styles.secondaryBtn}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            </Formik>
        </View>
        {
          isPassGenerated && (
            <View style={[styles.card, styles.cardElevated]}>
              <Text style={styles.subTitle}>Generated password:</Text>
              <Text style={styles.description}>Long press to copy</Text>
              <Text selectable={true} style={styles.generatedPassword}>{passsword}</Text>
            </View>
          )
        }
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
    color: '#666',
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000',
  },
});
