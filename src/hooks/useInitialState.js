import { useState, useEffect } from 'react';

const useInitialState = (URL) => {
  const [state, setState] = useState({
    mylist: [],
    trends: [],
    originals: [],
  });

  useEffect(() => {
    fetch(URL)
      .then((response) => response.json())
      .then((data) => setState(data));
  }, []);

  return state;
};

export default useInitialState;
