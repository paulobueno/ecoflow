import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WasteCollectionCenterList = () => {
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/waste-collection-centers/');
        setCenters(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCenters();
  }, []);

  return (
    <div>
      <h2>Waste Collection Centers</h2>
      <ul>
        {centers.map((center) => (
          <li key={center.id}>
            {center.friendly_id} - {center.fill_percentage}% Full
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WasteCollectionCenterList;
