/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './assets/styles/App.scss';
import Carousel from './components/Carousel';
import CarouselItem from './components/CarouselItem';
import Categories from './components/Categories';
import Header from './components/Header';
import Search from './components/Search';
import useInitialState from './hooks/useInitialState';

const API = 'http://localhost:3000/initialState';

const App = () => {
  const videos = useInitialState(API);
  return (
    <div>
      <Header />
      <Search />
      {videos.mylist.length > 0 && (
        <Categories title="My list">
          <Carousel>
            {videos.mylist.map((item) => (
              <CarouselItem key={item.id} {...item} />
            ))}
          </Carousel>
        </Categories>
      )}
      <Categories title="Tendencias">
        <Carousel>
          {videos.trends.map((item) => (
            <CarouselItem key={item.id} {...item} />
          ))}
        </Carousel>
      </Categories>
      <Categories title="Originales de PlatziVideo">
        <Carousel>
          {videos.originals.map((item) => (
            <CarouselItem key={item.id} {...item} />
          ))}
        </Carousel>
      </Categories>
    </div>
  );
};

export default App;
