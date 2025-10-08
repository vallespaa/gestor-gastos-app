import { useState } from 'react';
import { Pressable, View, Text, StyleSheet, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS, FONT_SIZES, SPACING } from '../../shared/styles/global';
import { formatRelativeDate } from '../../shared/utils/dateUtils';

export default function DateSelector({ date, setDate }) {
  const [show, setShow] = useState(false);

  const currentDate = date instanceof Date ? date : new Date();

  return (
    <View>
      <Pressable
        style={({ pressed }) => [styles.option, pressed && styles.pressed]}
        onPress={() => setShow(true)}
      >
        <MaterialIcons name="edit-calendar" size={24} color={COLORS.black} />
        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {formatRelativeDate(currentDate)}
        </Text>
      </Pressable>

      {show && (
        <DateTimePicker
          value={currentDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(e, selectedDate) => {
            setShow(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.5,
  },
  text: {
    marginLeft: SPACING.sm,
    fontSize: FONT_SIZES.md,
    color: COLORS.black,
    flexShrink: 1,
    maxWidth: 100,
  },
});
