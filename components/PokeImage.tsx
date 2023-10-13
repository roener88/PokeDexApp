import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';


const PokeImage = ({ pokeImage }) => {

  const pokemonImage = pokeImage;

  return (

    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: pokemonImage }}
        contentFit='contain'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '90%',
  },
});

export default PokeImage;

