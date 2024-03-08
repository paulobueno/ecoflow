import React, { useState, useEffect } from 'react';

import AppEcoCenterDisplay from '../app-ecocenter-display';

// ----------------------------------------------------------------------

export default function AppView() {
  const [collectionCenters, setCollectionCenters] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/waste-collection-centers/')
      .then(response => response.json())
      .then(data => setCollectionCenters(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (<> {collectionCenters.map(center => (<AppEcoCenterDisplay center={center}/>))} </>);
}