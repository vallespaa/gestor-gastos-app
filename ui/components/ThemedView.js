import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { COLORS, SPACING } from '../../shared/styles/global'

export default function ThemedView({ style, children, ...props}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[{
        flex: 1,
        backgroundColor: COLORS.white, 
        paddingBottom: insets.bottom,
        paddingHorizontal: SPACING.md
      },
        style
      ]}
      {...props}
    >
      {children}
    </View>
  )
}