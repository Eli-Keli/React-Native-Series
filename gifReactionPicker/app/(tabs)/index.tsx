import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/Colors';
import { emotions } from '@/mocks/emotions';
import { Emotion } from '@/types';

import { EmotionCard } from '@/components/EmotionCard';

export default function HomeScreen() {
  const renderItem = ({ item, index }: { item: Emotion; index: number }) => {
    return <EmotionCard emotion={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>How are you feeling?</Text>
        <Text style={styles.subtitle}>Select an emotion to see a reaction</Text>
      </View>

      <FlatList
        data={emotions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 16,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
});
