import { useEffect, useState } from 'react';
import axios from 'axios';

const PokemonFetcher = ({ onSuccess, onError, index }) => {
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`);
        const responseData = response.data;

        if (isMounted) {
          if (responseData && responseData.species && responseData.species.url) {
            const speciesResponse = await axios.get(responseData.species.url);
            const genusData = speciesResponse.data.genera.find((genus) => genus.language.name === 'en');
            responseData.genus = genusData ? genusData.genus : 'Genus not found';
          }

          onSuccess(responseData);
        }
      } catch (error) {
        if (isMounted) {
          onError(error);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [index, onSuccess, onError]);

  return null;
};

export default PokemonFetcher;
