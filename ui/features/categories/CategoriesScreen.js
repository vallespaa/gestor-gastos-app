import { useState } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import ThemedView from '../../components/ThemedView'
import TabSelector from '../../components/TabSelector';
import { SPACING } from '../../../shared/styles/global';

export default function CategoriesScreen() {
  const [tab, setTab] = useState('GASTOS');

  return (
    <ThemedView>
      <TabSelector tab={tab} setTab={setTab} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text>Aquí aparecerán las categorías</Text>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: SPACING.md,
  }
});
