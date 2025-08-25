import {View, FlatList, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, SPACING } from '../../../../shared/styles/global';

export default function ColorSelector({ selectedColor, onColorSelect, colors }) {
  const renderColorItem = ({ item: color }) => (
    <Pressable
      style={[
        styles.colorItem,
        { backgroundColor: color, borderColor: color },
        selectedColor === color && styles.selectedColorItem
      ]}
      onPress={() => onColorSelect(color)}
    >
      {selectedColor === color && (
        <Ionicons name="checkmark" size={20} color="white" />
      )}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={colors}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderColorItem}
        contentContainerStyle={styles.contentContainter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.lg, 
  },
  contentContainter: {
    paddingHorizontal: SPACING.md,
  },
  colorItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginHorizontal: SPACING.xs,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  selectedColorItem: {
    borderColor: COLORS.black,
  },
});