import { View, Text, StyleSheet, Pressable, Alert, Linking  } from 'react-native';
import Header from '../../components/Header';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { SPACING, COLORS, FONT_SIZES } from '../../../shared/styles/global';

export default function SettingsScreen() {

  return (
    <View style={styles.container}>
      <Header title={"Ajustes"} />

      <Text style={styles.sectionTitle}>IMPORTAR Y EXPORTAR</Text>

      <Pressable style={styles.item} >
        <Ionicons name="download-outline" size={24} color={COLORS.black} style={styles.icon} />
        <Text style={styles.itemText}>Importar datos en Formato Excel</Text>
      </Pressable>

      <Pressable style={styles.item}>
        <Ionicons name="push-outline" size={24} color={COLORS.black} style={styles.icon} />
        <Text style={styles.itemText}>Exportar datos en Formato Excel</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>CONTACTO</Text>

      <Pressable style={styles.item} onPress={handleFeedback}>
        <Ionicons name="chatbox-outline" size={24} color={COLORS.black} style={styles.icon} />
        <Text style={styles.itemText}>Enviar Feedback</Text>
      </Pressable>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Versión de la app:</Text>
        <Text style={styles.footerText}>{Constants.expoConfig.version}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: SPACING.md,
        paddingTop: Constants.statusBarHeight + SPACING.md,
        backgroundColor: COLORS.white
    },
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
