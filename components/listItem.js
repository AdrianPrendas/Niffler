
import React, {Component} from 'react';

import {
    View,
    Text,
    Animated,
    TouchableOpacity,
    StyleSheet
  } from 'react-native';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import { CheckBox } from "react-native-elements";

const Separator = () => <View style={styles.separator} />;

const LeftActions = (progress, dragX) => {
  const scale = dragX.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.leftAction}>
      <Animated.Text style={[styles.actionText, { transform: [{ scale }] }]}>
        Edit register
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

const ListItem = ({ register, onSwipeFromLeft, onRightPress }) => (
  <Swipeable
    renderLeftActions={LeftActions}
    onSwipeableLeftOpen={onSwipeFromLeft}
    renderRightActions={(progress, dragX) => (
      <RightActions progress={progress} dragX={dragX} onPress={onRightPress} />
    )}
  >
    <View style={styles.container}>
      
      
        <View style={{flex:1, alignItems:"center"}}>
          <Text style={{ padding:5, color:"#757575",  fontWeight: 'bold'}}>{register.description}</Text>
          <Text style={{ padding:5, color:"#757575"}}>Created at {register.createdAt.toLocaleTimeString()}</Text>
          {register.updatedAt && <Text style={{ padding:5, color:"#757575", textAlign:"center"}}>Updated on {register.updatedAt.toString().split("G")[0]}</Text>}
        </View>

        <View style={{flex:1, alignItems:"center"}}>
          <Text style={{fontWeight: 'bold', fontSize:15}}>{register.amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
        </View>
      


    </View>
  </Swipeable>
);

const ListItem2 = ({ register, onSwipeFromLeft, onRightPress }) => (
    <Swipeable
      renderLeftActions={LeftActions}
      onSwipeableLeftOpen={onSwipeFromLeft}
      renderRightActions={(progress, dragX) => (
        <RightActions progress={progress} dragX={dragX} onPress={onRightPress} />
      )}
    >
      <View style={styles.container}>
        
      <CheckBox
          title={register.description}
          checked={register.checked}
          onPress={()=>register.check(register.description)}
        />
         
        
  
  
      </View>
    </Swipeable>
  );

export  {
    ListItem, ListItem2,
    Separator
};


const styles = StyleSheet.create({
    container: {
      backgroundColor:"#FAFAFA",
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: 'black',
      borderBottomWidth: 0.5,
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
      backgroundColor: 'yellow',
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
      color: 'black',
      fontWeight: '600',
      padding: 20,
    },
  });