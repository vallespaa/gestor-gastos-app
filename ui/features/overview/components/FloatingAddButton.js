import { useNavigation } from '@react-navigation/native';
import { Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../../shared/styles/global';

export default function FloatingAddButton() {
  const navigation = useNavigation();

  return (
    <Pressable
      style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5, 
        shadowColor: "#000", 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      }}
      onPress={() => navigation.navigate('AddTransaction')}
    >
      <Ionicons name="add" size={24} color={COLORS.white} />
    </Pressable>
  );
}