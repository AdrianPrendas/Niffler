import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  SafeAreaView, 
  FlatList 
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';




const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  text: {
    color: '#4a4a4a',
    fontSize: 15,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e4e4e4',
    marginLeft: 10,
  },
  leftAction: {
    backgroundColor: '#388e3c',
    justifyContent: 'center',
    flex: 1,
  },
  rightAction: {
    backgroundColor: '#dd2c00',
    justifyContent: 'center',
    // flex: 1,
    alignItems: 'flex-end',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
    padding: 20,
  },
});

export const Separator = () => <View style={styles.separator} />;

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.leftAction}>
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        Add to Cart
      </Animated.Text>
    </View>
  );
};

const RightActions = ({ progress, dragX, onPress }) => {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.rightAction}>
        <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
          Delete
        </Animated.Text>
      </View>
    </TouchableOpacity>
  );
};

const ListItem = ({ text, onSwipeFromLeft, onRightPress }) => (
  <Swipeable
    renderLeftActions={LeftActions}
    onSwipeableLeftOpen={onSwipeFromLeft}
    renderRightActions={(progress, dragX) => (
      <RightActions progress={progress} dragX={dragX} onPress={onRightPress} />
    )}
  >
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  </Swipeable>
);


const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles2.container}>
        <FlatList
          data={quotes}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <ListItem
              {...item}
              onSwipeFromLeft={() => alert('swiped from left!')}
              onRightPress={() => alert('pressed right!')}
            />
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
      </SafeAreaView>
    );
  }
}

const quotes = [
  { id: '0', text: 'It’s just a flesh wound.' },
  { id: '1', text: 'That is my least vulnerable spot.' },
  {
    id: '2',
    text: 'This building has to be at least…. three times bigger than this!',
  },
  { id: '3', text: 'I am serious. And don’t call me Shirley.' },
  { id: '4', text: 'Yeah, but I shoot with this hand.' },
  { id: '5', text: 'I’m just one stomach flu away from my goal weight.' },
  {
    id: '6',
    text:
      'I’m about to do to you what Limp Bizkit did to music in the late ’90s.',
  },
  {
    id: '7',
    text:
      'Martini. Gin, not vodka. Obviously. Stirred for 10 seconds while glancing at an unopened bottle of vermouth.',
  },
  {
    id: '8',
    text:
      'Greater good?’ I am your wife! I’m the greatest good you’re ever gonna get!',
  },
  {
    id: '9',
    text:
      'I feel comfortable using legal jargon in everyday life. [Someone catcalls her.] I object!',
  },
  {
    id: '10',
    text:
      'We get the warhead and we hold the world ransom for…. One million dollars.',
  },
];