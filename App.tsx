import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PokeImage from './components/PokeImage';
import AttackInfo from './components/AttackInfo';
import PokemonFetcher from './components/PokemonFetcher';
import { Image } from 'expo-image';


const randomPokeIndex = () => Math.floor(Math.random() * 150) + 1;
//let moveArray;

const capitalize = ( string ) => {

  const str = string;
  return str.charAt(0).toUpperCase() + str.slice(1);

};

const App: React.FC = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokeIndex, setPokeIndex] = useState(randomPokeIndex());

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

          <View style={styles.backgroundContainer}>

            <View style={styles.header}>
              <Text style={styles.headerName}>{capitalize(pokemonData.name)}</Text> 
              <Text style={styles.headerHP}>HP: {pokemonData.base_experience}</Text>
              <Image 
                source={require(`./assets/typeIcons/water.svg`)}
                style={styles.icon} 
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
            
            
            {/* <ScrollView>
              {pokemonData.moves && pokemonData.moves.length > 0 && (
                pokemonData.moves.slice(0, 2).map((move, index) => (
                  <AttackInfo key={index} attackName={`Attack ${index + 1}`} moveName={move.move.name} />
                ))
              )}
            </ScrollView> */}
            

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
              <Text onPress={handleRefresh}>Refresh</Text>
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
    backgroundColor: '#F0F',
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
