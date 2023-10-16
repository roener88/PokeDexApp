import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { Accelerometer } from 'expo-sensors';
import PokeImage from './components/PokeImage';
import PokemonFetcher from './components/PokemonFetcher';


// Creates a random number between 1 and 150 for the Pokemon Base Set
const randomPokeIndex = () => Math.floor(Math.random() * 150) + 1;

// Capitalizes all the data from the API
const capitalize = ( string ) => {

  const str = string;
  return str.charAt(0).toUpperCase() + str.slice(1);

};

// Maps all the Icon.svg files because the require function cannot get dynamic data
const typeAssets = {
  bug: { icon: require('./assets/typeIcons/bug.svg'), bgColor: '#C0D28C'},
  dark: { icon: require('./assets/typeIcons/dark.svg'), bgColor: '#888097'},
  dragon: { icon: require('./assets/typeIcons/dragon.svg'), bgColor: '#5F90DA'},
  electric: { icon: require('./assets/typeIcons/electric.svg'), bgColor: '#FAEAA9'},
  fairy: { icon: require('./assets/typeIcons/fairy.svg'), bgColor: '#F5C4F4'},
  fighting: { icon: require('./assets/typeIcons/fighting.svg'), bgColor: '#E59AB2'},
  fire: { icon: require('./assets/typeIcons/fire.svg'), bgColor: '#F5CBA2'},
  flying: { icon: require('./assets/typeIcons/flying.svg'), bgColor: '#C9D6F0'},
  ghost: { icon: require('./assets/typeIcons/ghost.svg'), bgColor: '#939DCD'},
  grass: { icon: require('./assets/typeIcons/grass.svg'), bgColor: '#AED6A3'},
  ground: { icon: require('./assets/typeIcons/ground.svg'), bgColor: '#E9B094'},
  ice: { icon: require('./assets/typeIcons/ice.svg'), bgColor: '#B4E5DC'},
  normal: { icon: require('./assets/typeIcons/normal.svg'), bgColor: '#BCBEBC'},
  poison: { icon: require('./assets/typeIcons/poison.svg'), bgColor: '#C8A1DC'},
  psychic: { icon: require('./assets/typeIcons/psychic.svg'), bgColor: '#F5B4BA'},
  rock: { icon: require('./assets/typeIcons/rock.svg'), bgColor: '#D8CFB2'},
  steel: { icon: require('./assets/typeIcons/steel.svg'), bgColor: '#97B1BD'},
  water: { icon: require('./assets/typeIcons/water.svg'), bgColor: '#8AB5E4'},
};

// Function to retreive the Pokemon Type Icon dynamically
const getTypeIcon = (typeName) => {

  return typeAssets[typeName].icon || require('./assets/typeIcons/normal.svg');

};

// Function to retreive the Pokemon bgColor dynamically
const getTypeBGColor = (typeName) => {

  return typeAssets[typeName].bgColor || '#F4D500';

};

const App: React.FC = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokeIndex, setPokeIndex] = useState(randomPokeIndex());

  useEffect(() => {
    const subscription = Accelerometer.addListener((accelerometerData) => {
     
      const { x, y, z } = accelerometerData;
      const acceleration = Math.sqrt(x * x + y * y + z * z);

      
      if (acceleration > 2) {
        console.log('Shake!');
        handleRefresh();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleRefresh = () => {
    const newPokeIndex = randomPokeIndex();
    setPokeIndex(newPokeIndex);
  };

  const onSuccessCallback = useCallback((data) => {
    setPokemonData(data);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <PokemonFetcher
        index={pokeIndex} // Pass the 'pokeIndex' as a prop
        onSuccess={onSuccessCallback}
        onError={(error) => console.error('Error fetching data:', error)}
      />

      {pokemonData ? (
        
        <>

          <View style={[styles.backgroundContainer, { backgroundColor: getTypeBGColor(pokemonData.types[0].type.name )}]}>

            <View style={styles.header}>
              <Text style={styles.headerName}>{capitalize(pokemonData.name)}</Text> 
              <Text style={styles.headerHP}>HP: {pokemonData.base_experience}</Text>
             
              <Image 
                style={styles.icon} 
                source={getTypeIcon(pokemonData.types[0].type.name)}
                contentFit='contain'
              />
            </View>
            
            <LinearGradient
              // Background Linear Gradient
              colors={['#F00', '#3b5998']}
              style={styles.imageContainer}
            >
              <PokeImage pokeImage={pokemonData.sprites.other.dream_world.front_default} />
            </LinearGradient>

            <LinearGradient 
              colors={['#938C08', '#F2F1D1', '#938C08']}
              start={{x: 0, y: 0.5}}
              end={{x: 1, y: 0.5}}
              style={styles.infoContainer}
            >
              <Text style={styles.infoText} >{pokemonData.genus} - Height: {pokemonData.height} - Weight: {pokemonData.weight}</Text>
            </LinearGradient>
          
            <View style={styles.attackContainer}>

              <View style={styles.attackTextContainer}>
                <Text style={styles.attackText}>Attack 1</Text>
                {pokemonData.moves && pokemonData.moves.length > 0 && (
                  <Text style={styles.attackMoveText}>{capitalize(pokemonData.moves[0].move.name)}</Text>
                )}
              </View>
              <View style={styles.separator}></View>
              <View style={styles.attackTextContainer}>
                <Text style={styles.attackText}>Attack 2</Text>
                {pokemonData.moves && pokemonData.moves.length > 0 && (
                  <Text style={styles.attackMoveText}>{capitalize(pokemonData.moves[1].move.name)}</Text>
                )}
              </View>
              <View style={styles.separator}></View>
            </View>
            
            <View style={styles.refreshButton}>
              <Text onPress={handleRefresh}>Shake your phone to catch a new Pokémon</Text>
            </View>
          </View>
        </>
      ) : (
        <Text style={styles.name}>Loading...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4D500',
    justifyContent: 'center',
    alignItems: 'center',
  },

  backgroundContainer:{
    // backgroundColor: '#F0F',
    width: '95%',
    height: '95%',
    borderRadius: 20,
    alignItems: 'center',
  },

  header:{
    // backgroundColor: '#0FF',
    width: '95%',
    height: '15%',
    paddingTop: '7%',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },

  headerName: {
    fontWeight: 'bold',
    fontSize: 40,
  },

  headerHP: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  icon: {
    width: '10%',
    height: '40%',
  },

  imageContainer: {
    backgroundColor: '#00F',
    width: '95%',
    height: '35%',
    borderRadius: 15,
    borderWidth: '6%',
    borderColor: '#F4D500',
  },

  infoContainer: {
    top: '-1%',
    backgroundColor: '#F4D500',
    width: '80%',
    height: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    fontStyle: 'italic',
  },

  infoText: {
    fontStyle: 'italic',
    fontWeight: '500',
  },

  attackContainer: {
    paddingTop: '10%',
    width: '95%',
    height: '40%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  
  attackTextContainer: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
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

  refreshButton: {
    width: '95%',
    height: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default App;
