import { useLayoutEffect, useCallback } from 'react';
import { Alert, Pressable, Text } from 'react-native';
import { COLORS, SPACING } from '../../../../shared/styles/global';

export function useAddTransactionHeader({ navigation, isLoading, onSave }) {
  const renderSaveButton = useCallback(() => {
    if (typeof onSave !== 'function') return null;
    return (
      <Pressable
        style={({ pressed }) => [
          styles.headerButton,
          { opacity: pressed ? 0.5 : 1 },
        ]}
        onPress={() => {
          try {
            onSave();
          } catch {
            Alert.alert('Error', 'No se pudo guardar la transacción.');
          }
        }}
        disabled={isLoading}
      >
        <Text style={styles.headerButtonText}>Guardar</Text>
      </Pressable>
    );
  }, [isLoading, onSave]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderSaveButton,
    });
  }, [navigation, renderSaveButton]);
}

const styles = {
  headerButton: {
    padding: SPACING.sm,
    marginRight: SPACING.sm,
  },
  headerButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.black,
  },
};
