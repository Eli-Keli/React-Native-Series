import { StyleSheet, View, Text } from 'react-native';

export default function GifScreen() {
  return (
    <View style={styles.container}>
      <Text>GIF display screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
