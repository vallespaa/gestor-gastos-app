import { View, Text, Pressable, StyleSheet } from 'react-native';
import {
  COLORS,
  FONT_SIZES,
  SPACING,
  BORDER_RADIUS,
} from '../../shared/styles/global';

export default function KeyPad({ onKeyPress }) {
  const keys = [
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    [',', '0', '⌫', '+'],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.keyboard}>
        {keys.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((key) => (
              <Pressable
                key={key}
                style={({ pressed }) => [
                  styles.key,
                  pressed && { opacity: 0.5 },
                ]}
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
    backgroundColor: 'hsl(220, 13%, 95%)',
    paddingBottom: SPACING.md,
    borderTopLeftRadius: BORDER_RADIUS.md,
    borderTopRightRadius: BORDER_RADIUS.md,
  },
  keyboard: {
    padding: SPACING.md,
    gap: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  key: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: COLORS.lightGray,
    padding: SPACING.md,
    borderRadius: BORDER_RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: 'bold',
  },
});
