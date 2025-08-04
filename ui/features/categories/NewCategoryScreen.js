import { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import { useCategories } from '../../../shared/context/CategoriesContext';
import ThemedView from '../../components/ThemedView';
import TabSelector from '../../components/TabSelector';
import CategoryCard from './components/CategoryCard';
import CategoryNameInput from './components/CategoryNameInput';
import ColorSelector from './components/ColorSelector';
import IconSelector from './components/IconSelector';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../../../shared/constants/constants'
import { COLORS, FONT_SIZES, SPACING } from '../../../shared/styles/global';

export default function NewCategoryScreen({ navigation }) {
  const [tab, setTab] = useState('GASTOS');
  const [categoryName, setCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState(CATEGORY_COLORS[0]);
  const [selectedIcon, setSelectedIcon] = useState(CATEGORY_ICONS[0]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { addCategory } = useCategories();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={({ pressed }) => ({
            padding: 12,
            opacity: pressed ? 0.5 : 1,
          })}
          onPress={handleSaveCategory}
          disabled={!categoryName.trim() || isLoading}
        >
          <Text style={[
            styles.saveButton,
            (!categoryName.trim() || isLoading) && styles.saveButtonDisabled
          ]}>
            Guardar
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, categoryName, selectedColor, selectedIcon, isLoading]);

  const handleSaveCategory = async () => {
    if (!categoryName.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre para la categoría');
      return;
    }

    setIsLoading(true);
    
    try {
      const newCategory = {
        id: Date.now(),
        name: categoryName.trim(),
        color: selectedColor,
        icon: selectedIcon,
        type: tab
      };

      await addCategory(newCategory);
      
      Alert.alert(
        'Éxito', 
        'Categoría creada correctamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la categoría');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView>
      <ScrollView>
        <TabSelector tab={tab} setTab={setTab} />
        
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
          numColumns={5}
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
  saveButton: {
    color: COLORS.black,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  saveButtonDisabled: {
    color: COLORS.gray,
  },
});