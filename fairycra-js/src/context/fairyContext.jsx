import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

export const FairyContext = createContext();

const FairyContextProvider = (props) => {
  const [fairy, setFairy] = useState({}); 
  const [matchedTwins, setMatchedTwins] = useState([]); 
  const [selectedTwin, setSelectedTwin] = useState([]); 
  const [matchedCakes, setMatchedCakes] = useState([]); 
  const [selectedCake, setSelectedCake] = useState({}); 
  const [order, setOrder] = useState({}); 

  return (
    <FairyContext.Provider
      value={{ 
        fairy, setFairy, matchedTwins, setMatchedTwins, 
        selectedTwin, setSelectedTwin, matchedCakes, setMatchedCakes,
        selectedCake, setSelectedCake, order, setOrder
      }}
    >
      { props.children }
    </FairyContext.Provider>
  )
}

FairyContextProvider.propTypes = {};

export default FairyContextProvider;