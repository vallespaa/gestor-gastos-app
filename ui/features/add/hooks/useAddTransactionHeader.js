import { useLayoutEffect, useCallback, useRef } from 'react';
import { Pressable, Text } from 'react-native';
import { COLORS, SPACING } from '../../../../shared/styles/global';

export function useAddTransactionHeader({ navigation, isLoading, onSave }) {
  // Guardamos onSave en una ref para que el botón no se recree en cada
  // render (onSave cambia siempre) y se use siempre la última versión.
  const onSaveRef = useRef(onSave);
  onSaveRef.current = onSave;

  const renderSaveButton = useCallback(() => {
    return (
      <Pressable
        style={({ pressed }) => [
          styles.headerButton,
          { opacity: pressed ? 0.5 : 1 },
        ]}
        onPress={() => onSaveRef.current()}
        disabled={isLoading}
      >
        <Text style={styles.headerButtonText}>Guardar</Text>
      </Pressable>
    );
  }, [isLoading]);

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
