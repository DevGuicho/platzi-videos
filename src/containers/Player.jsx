import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setVideoSource } from '../actions';
import '../assets/styles/components/Player.scss';

const Player = (props) => {
  const {
    match: {
      params: { id },
    },
    playing,
  } = props;
  const [loading, setLoading] = useState(true);

  const hasPlaying = Object.keys(playing).length > 0;

  useEffect(() => {
    props.setVideoSource(id);
    setLoading(false);
  }, []);

  const handleClick = () => {
    props.history.push('/');
  };

  if (loading) return <h2>loading ...</h2>;

  return hasPlaying ? (
    <div className="Player">
      <video controls autoPlay>
        <source src={playing.source} type="video/mp4" />
      </video>
      <div className="Player-back">
        <button type="button" onClick={handleClick}>
          Regresar
        </button>
      </div>
    </div>
  ) : (
    <Redirect to="/404" />
  );
};

const mapStateToProps = (state) => {
  return {
    playing: state.playing,
  };
};

const mapDispatchToProps = {
  setVideoSource,
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
