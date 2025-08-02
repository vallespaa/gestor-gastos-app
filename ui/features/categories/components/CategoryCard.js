import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONT_SIZES, SPACING, BORDER_RADIUS } from '../../../../shared/styles/global';

export default function CategoryCard({ category }) {
  const { name, color, icon } = category;

  return (
    <View style={styles.card}>
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={48} color="white" />
      </View>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.lightGray,
    width: 96,
    height: 120,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xs,
    justifyContent: 'center',
    alignItems: 'center',
    margin: SPACING.sm,
  },
  iconContainer: {
    width: 88,
    height: 88,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: COLORS.black,
    fontWeight: '400',
    fontSize: FONT_SIZES.sm,
    textAlign: 'center',
    lineHeight: 16,
  },
});
