import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from '../../shared/styles/global';

export default function KeyPad({ onKeyPress }) {
  const insets = useSafeAreaInsets();

  const keys = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    [',', '0', '⌫', '+'],
  ];

  return (
    <View style={[styles.container, { bottom: insets.bottom + 0 }]}>
      <View style={styles.keyboard}>
        {keys.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((key) => (
              <Pressable
                key={key}
                style={styles.key}
                onPress={() => onKeyPress(key)}
              >
                <Text style={styles.keyText}>{key}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor: 'hsl(220, 13%, 95%)',
    paddingBottom: SPACING.md,
    borderTopLeftRadius: BORDER_RADIUS.md,
    borderTopRightRadius: BORDER_RADIUS.md,
  },
  keyboard: {
    marginTop: SPACING.md,
    padding: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  key: {
    flex: 1,
    aspectRatio: 1,
    margin: SPACING.xs,
    backgroundColor: COLORS.lightGray,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: FONT_SIZES.xl,
    fontWeight: 'bold',
  },
});
