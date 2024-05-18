import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CreateData from './CreateData';
import ReadData from './ReadData';

import UpdateData from './UpdateData';
import DeleteData from './DeleteData';

const EntityOperations = () => {
  const { entityName } = useParams();
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [data, setData] = useState([]);
  const baseUrl = import.meta.env.VITE_APP_SERVER_URL;
  
  const fetchEntityData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/entity/readEntity/${entityName}`);
      console.log(res);
      // const entityData =  res.data.data.map((curr))
      setData(res.data.data);

      const attributes = res.data.schema;
      setSelectedEntity({ name: entityName, attributes: attributes});
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    
    fetchEntityData();

  }, [entityName]);

    console.log(data)
  return (
    <div>
      <h2 className="text-3xl font-bold mb-2 mt-7">Entity Operations for {entityName}</h2>
      {selectedEntity && (
        <div>
      
          <CreateData selectedEntity={selectedEntity} onCreateData={() => fetchEntityData()} />
          <ReadData data={data} onChangeData = {fetchEntityData} selectedEntity={selectedEntity} />
          
          
        </div>
      )}
    </div>
  );
};

export default EntityOperations;