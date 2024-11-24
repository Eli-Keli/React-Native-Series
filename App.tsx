import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

// Form Validation
import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .required('Password length is required')
    .min(4, 'Password length must be at least 4')
    .max(16, 'Password length must be at most 16'),
});

export default function App() {
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
