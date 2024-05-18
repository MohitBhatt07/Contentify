import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API } from '../api/connect';

const UpdateData = ({ selectedEntity, onUpdateData ,data }) => {
  const [updateData, setUpdateData] = useState({});
  const baseUrl = import.meta.env.VITE_APP_SERVER_URL;

  const handleUpdateData = async () => {
    try {
      await axios.put(`${baseUrl}/api/entity/${selectedEntity.name}`, updateData);
      setUpdateData({});
      onUpdateData(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mb-4">
      <h4 className="text-lg font-bold mb-2">Update Data</h4>
      <select
        value={updateData.id || ''}
        onChange={(e) => setUpdateData({ ...updateData, id: e.target.value })}
        className="border border-gray-300 rounded-md p-2 mb-2"
      >
        <option value="">Select Data</option>
        {data?.map((item) => (
          <option key={item.id} value={item.id}>
            {JSON.stringify(item)}
          </option>
        ))}
      </select>
      {selectedEntity.attributes.map((attribute, index) => (
        <input
          key={index}
          type="text"
          placeholder={`${attribute} (${selectedEntity.attributes[attribute]})`}
          value={updateData[attribute] || ''}
          onChange={(e) => setUpdateData({ ...updateData, [attribute]: e.target.value })}
          className="border border-gray-300 rounded-md p-2 mb-2"
        />
      ))}
      <button
        onClick={handleUpdateData}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Data
      </button>
    </div>
  );
};

export default UpdateData;