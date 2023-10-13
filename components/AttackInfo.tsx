import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const capitalize = ( string ) => {

  const str = string;
  return str.charAt(0).toUpperCase() + str.slice(1);

};

const AttackInfo = ({ attackName, moveName }) => (

  
  <View style={styles.attackContainer}>
    <View style={styles.attackTextContainer}>
      <Text style={styles.attackText}>{attackName}</Text>
      <Text style={styles.attackMoveText}>{capitalize(moveName)}</Text>
    </View>
    <View style={styles.separator}></View>
  </View>
  
);

const styles = StyleSheet.create({
  attackContainer: {
    // backgroundColor: '#ff0',
    // paddingTop: '10%',
    width: '95%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  
  attackTextContainer: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  attackText: {
    fontWeight: '600',
    fontSize: 30,
  },

  attackMoveText: {
    fontWeight: '400',
    fontSize: 30,
  },

  separator: {
    width: '95%',
    height: 0,
    borderWidth: '1%',
    backgroundColor: '#000',

  },
});

export default AttackInfo;
