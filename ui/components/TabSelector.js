import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { COLORS, FONT_SIZES } from '../../shared/styles/global';

export default function TabSelector({ tab, tabs = ['GASTOS', 'INGRESOS'], setTab }) {
  const [containerWidth, setContainerWidth] = useState(0);
  const indicatorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (containerWidth === 0) return;
    const activeIndex = tabs.indexOf(tab);
    const tabWidth = containerWidth / tabs.length;
    indicatorAnim.setValue(activeIndex * tabWidth);
  }, [containerWidth]);

  const handlePress = (activeTab, index) => {
    setTab(activeTab);
    const tabWidth = containerWidth / tabs.length;
    Animated.spring(indicatorAnim, {
      toValue: index * tabWidth,
      useNativeDriver: false,
    }).start();
  };

  const tabWidth = containerWidth / tabs.length;

  return (
    <View
      style={styles.tabContainer}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <View style={styles.baseIndicator} />
      
      {tabs.map((tabName, index) => {
        const isActive = tab === tabName;
        return (
          <Pressable
            key={tabName}
            style={[styles.tab, { width: tabWidth }]}
            onPress={() => handlePress(tabName, index)}
          >
            <Text style={isActive ? styles.tabTextActive : styles.tabText}>
              {tabName}
            </Text>
          </Pressable>
        );
      })}
      
      {containerWidth > 0 && (
        <Animated.View
          style={[
            styles.indicator,
            {
              width: tabWidth,
              transform: [{ translateX: indicatorAnim }],
            },
          ]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative',
    height: 40,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.gray,
  },
  tabTextActive: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.black,
  },
  baseIndicator: {
    position: 'absolute',
    bottom: 1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: COLORS.lightGray,
    zIndex: 1,
  },
  indicator: {
    position: 'absolute',
    bottom: 1,
    height: 2,
    backgroundColor: COLORS.black,
    zIndex: 2,
  },
});