import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../../shared/styles/global';

export default function DisplayAmount({ amount, expression }) {
  const hasOperator = (input) => /[+\-*/]/.test(input);

  const formatExpression = (exp) => {
    if (!exp) return '';
    return exp
      .replace(/\*/g, ' × ')
      .replace(/\//g, ' ÷ ')
      .replace(/\+/g, ' + ')
      .replace(/-/g, ' − ');
  };

  const formattedExpression = () => {
    if (!expression || !hasOperator(expression)) {
      return '';
    }
    return `${formatExpression(expression)} =`;
  };

  const expressionDisplay = formattedExpression();

  return (
    <View style={styles.container}>
      <View style={styles.displayBox}>
        <Text
          style={styles.amount}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.5}
        >
          {amount || '0'} €
        </Text>
        <Text
          style={[
            styles.expressionText,
            !expressionDisplay && styles.hiddenExpression,
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {expressionDisplay || '0'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  displayBox: {
    backgroundColor: COLORS.white,
    padding: SPACING.md,
  },
  expressionText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.gray,
    textAlign: 'right',
    marginBottom: SPACING.sm,
  },
  hiddenExpression: {
    opacity: 0,
  },
  amount: {
    fontSize: 48,
    fontWeight: '700',
    textAlign: 'right',
    color: COLORS.black,
  },
});
