import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const ActorContainer = styled.div`
  margin: 10px;
  padding: 10px;
`;

const ActorImage = styled.img`
  width: 100px; // Make the actor images smaller
  height: auto;
`;

const ActorName = styled.h2`
  font-size: 1.5em;
`;

const ActorCharacter = styled.p`
  font-size: 1em;
`;

const Cast = () => {
  const [cast, setCast] = useState(null);
  const { movieId } = useParams(); // Get movieId from URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=04b4d601805ac31a2739906707e3a331`);
        setCast(result.data.cast);
      } catch (error) {
        console.error('Error fetching movie cast:', error);
      }
    };

    fetchData();
  }, [movieId]); // Re-fetch when movieId changes

  return (
    <div>
      {cast ? (
        <div>
          {cast.map(actor => (
            <ActorContainer key={actor.cast_id}>
              <ActorName>{actor.name}</ActorName>
              <ActorCharacter>{actor.character}</ActorCharacter>
              {actor.profile_path && (
                <ActorImage src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} alt={actor.name} />
              )}
            </ActorContainer>
          ))}
        </div>
      ) : 'Loading...'}
    </div>
  );
};

export default Cast;