import { useState } from 'react';
import { Alert } from 'react-native';
import { useCategories } from '../../../../shared/context/CategoriesContext';
import { useFinancial } from '../../../../shared/context/FinancialContext';
import { CATEGORY_ICONS, CATEGORY_COLORS } from '../../../../shared/constants/constants';

export function useCategoryForm(editingCategory, navigation) {
  const isEditing = !!editingCategory;
  const [tab, setTab] = useState(editingCategory?.type || 'GASTOS');
  const [categoryName, setCategoryName] = useState(editingCategory?.name || '');
  const [selectedColor, setSelectedColor] = useState(
    editingCategory?.color || CATEGORY_COLORS[0]
  );
  const [selectedIcon, setSelectedIcon] = useState(
    editingCategory?.icon || CATEGORY_ICONS[0]
  );
  const [isLoading, setIsLoading] = useState(false);
  
  const { addCategory, editCategory, removeCategory } = useCategories();
  const { transactions } = useFinancial();

  const isFormValid = categoryName.trim().length > 0;

  const createNewCategory = async () => {
    const newCategory = {
      id: String(Date.now()),
      name: categoryName.trim(),
      color: selectedColor,
      icon: selectedIcon,
      type: tab
    };

    await addCategory(newCategory);
  };

  const updateExistingCategory = async () => {
    const updatedCategory = {
      ...editingCategory,
      name: categoryName.trim(),
      color: selectedColor,
      icon: selectedIcon,
      type: tab,
      updatedAt: new Date().toISOString(),
    };

    await editCategory(updatedCategory);
  };

  const handleSave = async () => {
    if (!isFormValid) {
      Alert.alert('Error', 'Por favor ingresa un nombre para la categoría');
      return;
    }

    setIsLoading(true);
    
    try {
      if (isEditing) {
        await updateExistingCategory();
        Alert.alert(
          'Éxito', 
          'Categoría actualizada correctamente',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        await createNewCategory();
        Alert.alert(
          'Éxito', 
          'Categoría creada correctamente',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      }
    } catch (error) {
      Alert.alert(
        'Error', 
        isEditing ? 'No se pudo actualizar la categoría' : 'No se pudo crear la categoría'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const isCategoryInUse = transactions.some(
      (tx) => tx.category === editingCategory.id
    );

    if (isCategoryInUse) {
      Alert.alert(
        'No se puede eliminar',
        'Esta categoría tiene transacciones asociadas. Cámbialas de categoría o elimínalas antes de eliminar esta categoría.'
      );
      return;
    }

    setIsLoading(true);
    
    try {
      await removeCategory(editingCategory.id);
      
      Alert.alert(
        'Éxito', 
        'Categoría eliminada correctamente',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la categoría');
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
    handleDelete
  };
}