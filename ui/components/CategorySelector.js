import { Pressable, FlatList, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS } from '../../shared/styles/global';

export default function CategorySelector({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  const renderCategoryItem = ({ item }) => {
    const { color, icon, id } = item;
    const isSelected = selectedCategory === id;

    return (
      <Pressable
        style={({ pressed }) => [
          styles.iconContainer,
          { backgroundColor: color },
          pressed && styles.pressed,
          { borderColor: isSelected ? color : COLORS.white },
        ]}
        onPress={() => onCategoryChange?.(id)}
      >
        <Ionicons name={icon} size={24} color="white" />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderCategoryItem}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  contentContainer: {
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
  },
  iconContainer: {
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  pressed: {
    opacity: 0.5,
  },
  separator: {
    width: SPACING.xs,
  },
});
