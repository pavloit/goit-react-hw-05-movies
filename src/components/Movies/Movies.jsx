import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px; 
`;

const Input = styled.input`
  margin-right: 10px;
  padding: 5px;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #4b4bbe;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #3a3a8e; 
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(75,75,190,0.5); 
  }
`;

const Movies = () => {
  const [data, setData] = useState(null);
  const [keyword, setKeyword] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://api.themoviedb.org/3/search/movie', {
          params: {
            api_key: '04b4d601805ac31a2739906707e3a331',
            query: keyword,
            page: 1
          }
        });
        setData(result.data.results);
      } catch (error) {
        console.error('Error making API request:', error);
      }
    };

    if (keyword) {
      fetchData();
    }
  }, [keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.elements.search.value);
  };

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <Input type="text" name="search" placeholder="Search movies..." />
        <Button type="submit">Search</Button>
      </Form>
      {data ? data.map(movie => (
        <div key={movie.id}>
          <Link to={{ pathname: `/movies/${movie.id}`, state: { from: location.pathname } }}>{movie.title}</Link>
        </div>
      )) : null}
    </div>
  );
};

export default Movies;