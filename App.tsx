/* eslint-disable @typescript-eslint/no-unused-vars */
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

// Form Validation
import * as Yup from 'yup';

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
    <View>
      <Text style={styles.text}>App</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white',
  },
});
