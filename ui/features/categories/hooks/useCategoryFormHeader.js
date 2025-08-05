import { useLayoutEffect } from 'react';
import { Text, Pressable } from 'react-native';
import { COLORS, FONT_SIZES } from '../../../../shared/styles/global';

export function useCategoryFormHeader({ 
  navigation, 
  isEditing, 
  isFormValid, 
  isLoading, 
  onSave 
}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isEditing ? 'Editar Categoría' : 'Nueva Categoría',
      headerRight: () => (
        <Pressable
          style={({ pressed }) => ({
            padding: 12,
            opacity: pressed ? 0.5 : 1,
          })}
          onPress={onSave}
          disabled={!isFormValid || isLoading}
        >
          <Text style={[
            styles.saveButton,
            (!isFormValid || isLoading) && styles.saveButtonDisabled
          ]}>
            {isEditing ? 'Actualizar' : 'Guardar'}
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, isEditing, isFormValid, isLoading, onSave]);
}

const styles = {
  saveButton: {
    color: COLORS.black,
    fontSize: FONT_SIZES.md,
    fontWeight: '600',
  },
  saveButtonDisabled: {
    color: COLORS.gray,
  },
};