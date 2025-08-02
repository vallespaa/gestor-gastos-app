import { useState, useLayoutEffect } from 'react';
import { useCategories } from '../../../shared/context/CategoriesContext';
import { Text, FlatList, StyleSheet, Pressable } from 'react-native';
import ThemedView from '../../components/ThemedView'
import TabSelector from '../../components/TabSelector';
import CategoryCard from './components/CategoryCard';
import { COLORS, FONT_SIZES, SPACING } from '../../../shared/styles/global';

export default function CategoriesScreen({ navigation }) {
  const [tab, setTab] = useState('GASTOS');
  const { getCategories } = useCategories();

  const categories = getCategories(tab);

  return (
    <ThemedView>
      <TabSelector tab={tab} setTab={setTab} />
      <FlatList
        data={categories}
        keyExtractor={item => item.id}
        numColumns={3}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <CategoryCard category={item} />
        )}
        ListEmptyComponent={<Text>No hay categorías</Text>}
        ListFooterComponent={<Text style={styles.footer}>{`${categories.length} CATEGORÍAS`}</Text>}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    alignItems: 'center',
  },
  footer: {
    marginTop: SPACING.md,
    color: COLORS.gray,
    fontWeight: '600',
    fontSize: FONT_SIZES.sm,
  },
});
