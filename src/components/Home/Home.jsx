import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const Home = ({ setButtonClicked }) => {
  const [data, setData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://api.themoviedb.org/3/trending/all/day?api_key=04b4d601805ac31a2739906707e3a331');
      setData(result.data.results);
      setButtonClicked(true);
    };
    fetchData();
  }, [setButtonClicked]);

  return (
    <div>
      <h2>Trending today</h2>
      {data ? (
        data.map(item => (
          <div key={item.id}>
            <Link to={{ pathname: `/movies/${item.id}`, state: { from: location.pathname } }}>{item.title}</Link>
          </div>
        ))
      ) : null}
    </div>
  );
};

export default Home;