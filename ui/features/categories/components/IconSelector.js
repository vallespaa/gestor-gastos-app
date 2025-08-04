import { FlatList, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../../../../shared/styles/global';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_SIZE = 48; 
const ITEM_MARGIN = SPACING.xs;


export default function IconSelector({ selectedIcon, onIconSelect, icons }) {
  const numColumns = Math.floor(SCREEN_WIDTH / (ITEM_SIZE + ITEM_MARGIN * 2));

  const renderIconItem = ({ item: icon }) => (
    <Pressable
      style={[
        styles.iconItem,
        selectedIcon === icon && styles.selectedIconItem
      ]}
      onPress={() => onIconSelect(icon)}
    >
      <Ionicons 
        name={icon} 
        size={24} 
        color={selectedIcon === icon ? COLORS.white : COLORS.gray} 
      />
    </Pressable>
  );

  return (
    <FlatList
      data={icons}
      keyExtractor={(item) => item}
      numColumns={numColumns}
      contentContainerStyle={styles.iconList}
      renderItem={renderIconItem}
    />
  );
}

const styles = StyleSheet.create({
  iconList: {
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.xl,
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