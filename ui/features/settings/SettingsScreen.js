import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';
import ThemedView from '../../components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { COLORS, FONT_SIZES, SPACING } from '../../../shared/styles/global';

export default function SettingsScreen() {
  const navigation = useNavigation();

  const handleFeedback = () => {
    const email =
      Constants.expoConfig.extra?.feedbackEmail || 'fallback@example.com';
    const subject = 'Feedback sobre la app';
    const body = 'Hola, quería comentar...';
    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(mailto);
  };

  return (
    <ThemedView>
      <Text style={styles.sectionTitle}>CATEGORÍAS</Text>

      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate('Categories')}
      >
        <Ionicons
          name="shapes-outline"
          size={24}
          color={COLORS.black}
          style={styles.icon}
        />
        <Text style={styles.itemText}>Categorías</Text>
      </Pressable>

      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate('Accounts')}
      >
        <Ionicons
          name="wallet-outline"
          size={24}
          color={COLORS.black}
          style={styles.icon}
        />
        <Text style={styles.itemText}>Cuentas</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>CONTACTO</Text>

      <Pressable style={styles.item} onPress={handleFeedback}>
        <Ionicons
          name="chatbox-outline"
          size={24}
          color={COLORS.black}
          style={styles.icon}
        />
        <Text style={styles.itemText}>Enviar Feedback</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Versión de la app:</Text>
        <Text style={styles.footerText}>{Constants.expoConfig.version}</Text>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: COLORS.gray,
    fontWeight: '600',
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    fontSize: FONT_SIZES.sm,
    letterSpacing: 0.5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  icon: {
    marginRight: SPACING.md,
  },
  itemText: {
    fontSize: FONT_SIZES.md,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: SPACING.lg,
  },
  footerText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray,
  },
});
