import { useLayoutEffect } from 'react';
import { Pressable, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../../../shared/styles/global';

export function useCategoryFormHeader({
  navigation,
  isEditing,
  isFormValid,
  isLoading,
  onSave,
  onDelete,
}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isEditing ? 'Editar Categoría' : 'Nueva Categoría',
      headerRight: renderHeaderRight,
    });
  }, [navigation, isEditing, isFormValid, isLoading, onSave]);

  const handleDelete = () => {
    Alert.alert(
      'Eliminar categoría',
      '¿Estás seguro que deseas eliminar esta categoría? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: onDelete },
      ],
    );
  };

  const renderSaveButton = () => (
    <Pressable
      style={({ pressed }) => [
        styles.headerButton,
        { opacity: pressed ? 0.5 : 1 },
      ]}
      onPress={onSave}
      disabled={!isFormValid || isLoading}
    >
      <Ionicons
        name="checkmark-outline"
        size={22}
        color={!isFormValid || isLoading ? COLORS.gray : COLORS.black}
      />
    </Pressable>
  );

  const renderHeaderRight = () => {
    if (isEditing) {
      return (
        <View style={styles.headerButtonsContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.headerButton,
              { opacity: pressed ? 0.5 : 1 },
            ]}
            onPress={handleDelete}
            disabled={isLoading}
          >
            <Ionicons
              name="trash-outline"
              size={22}
              color={isLoading ? COLORS.gray : COLORS.error}
            />
          </Pressable>

          {renderSaveButton()}
        </View>
      );
    }

    return renderSaveButton();
  };
}

const styles = {
  headerButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: SPACING.sm,
    marginLeft: SPACING.xs,
  },
};
