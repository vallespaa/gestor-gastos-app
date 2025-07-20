import { View, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { COLORS } from '../../shared/styles/global'

export default function ThemedScrollView({ style, contentContainerStyle, children, ...props}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[{
        flex: 1,
        backgroundColor: COLORS.white, 
      },
        style
      ]}
    >
      <ScrollView
        style={[{ flex: 1 }]}
        contentContainerStyle={[{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: 16
        },
        contentContainerStyle
        ]}
        {...props}
      >
        {children}
      </ScrollView>
    </View>
  )
}