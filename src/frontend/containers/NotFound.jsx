import React from 'react';
import '../assets/styles/components/NotFound.scss';
import Header from '../components/Header';

const NotFound = () => {
  return (
    <>
      <Header />
      <section className="error-container">
        <span>4</span>
        <span>
          <span className="screen-reader-text">0</span>
        </span>
        <span>4</span>
      </section>
    </>
  );
};

export default NotFound;
