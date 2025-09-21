import { View, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
} from '../../../../shared/styles/global';

const ITEM_SIZE = 48;
const ITEM_MARGIN = SPACING.xs;

export default function IconSelector({ selectedIcon, onIconSelect, icons }) {
  return (
    <View style={[styles.iconList]}>
      {icons.map((icon) => (
        <Pressable
          key={icon}
          style={[
            styles.iconItem,
            selectedIcon === icon && styles.selectedIconItem,
          ]}
          onPress={() => onIconSelect(icon)}
        >
          <Ionicons
            name={icon}
            size={24}
            color={selectedIcon === icon ? COLORS.white : COLORS.gray}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  iconList: {
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  iconItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    borderRadius: BORDER_RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    margin: ITEM_MARGIN,
    backgroundColor: COLORS.lightGray,
  },
  selectedIconItem: {
    backgroundColor: COLORS.gray,
  },
});
