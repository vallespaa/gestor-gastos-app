import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from '../../../../shared/styles/global';

export default function CategoryCard({ category, onPress }) {
  const { name, color, icon } = category;

  return (
    <Pressable
      style={({ pressed }) => [pressed && styles.pressed]}
      onPress={() => onPress?.(category)}
    >
      <View style={styles.card}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <Ionicons name={icon} size={48} color="white" />
        </View>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {name || 'Nombre de categoría'}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.lightGray,
    width: 96,
    height: 120,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xs,
    alignItems: 'center',
    margin: SPACING.sm,
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: BORDER_RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    maxWidth: '100%',
    color: COLORS.black,
    fontWeight: '500',
    fontSize: FONT_SIZES.sm,
    lineHeight: 16,
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
});
