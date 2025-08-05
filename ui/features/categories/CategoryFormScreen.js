import { useCategoryForm } from './hooks/useCategoryForm';
import { useCategoryFormHeader } from './hooks/useCategoryFormHeader';
import { View, StyleSheet, ScrollView } from 'react-native';
import ThemedView from '../../components/ThemedView';
import TabSelector from '../../components/TabSelector';
import CategoryCard from './components/CategoryCard';
import CategoryNameInput from './components/CategoryNameInput';
import ColorSelector from './components/ColorSelector';
import IconSelector from './components/IconSelector';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../../../shared/constants/constants'
import { SPACING } from '../../../shared/styles/global';

export default function CategoryFormScreen({ navigation, route }) {
  const editingCategory = route?.params?.category;

  const {
    tab,
    categoryName,
    selectedColor,
    selectedIcon,
    isLoading,
    isEditing,
    isFormValid,
    setTab,
    setCategoryName,
    setSelectedColor,
    setSelectedIcon,
    handleSave,
  } = useCategoryForm(editingCategory, navigation);

  useCategoryFormHeader({
    navigation,
    isEditing,
    isFormValid,
    isLoading,
    onSave: handleSave,
  });

  return (
    <ThemedView>
      <ScrollView>
        {!isEditing && (
          <TabSelector tab={tab} setTab={setTab} />
        )}
        
        <View style={styles.row}>
          <CategoryCard category={{ name: categoryName, color: selectedColor, icon: selectedIcon }} />
          <View style={styles.inputContainer}>
            <CategoryNameInput 
              value={categoryName}
              onChangeText={setCategoryName}
              maxLength={20}
            />
          </View>
        </View>

        <ColorSelector 
          selectedColor={selectedColor}
          onColorSelect={setSelectedColor}
          colors={CATEGORY_COLORS}
        />

        <IconSelector 
          selectedIcon={selectedIcon}
          onIconSelect={setSelectedIcon}
          icons={CATEGORY_ICONS}
        />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.lg, 
  },
  inputContainer: {
    flex: 1,
    marginLeft: SPACING.sm,
  },
});