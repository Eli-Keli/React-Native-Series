import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';

import { GifDisplay } from '@/components/GifDisplay';

export default function GifScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <GifDisplay />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
