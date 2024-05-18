import React, { useState } from "react";
import axios from "axios";
import { MdOutlineDeleteOutline } from "react-icons/md";


const DeleteData = ({ selectedEntity, onDeleteData,  deleteData}) => {
  // const [deleteData, setDeleteData] = useState(null);
  const baseUrl = import.meta.env.VITE_APP_SERVER_URL;

  const handleDeleteData = async () => {
    try {
      await axios.delete(`${baseUrl}/api/entity/${selectedEntity.name}`, {
        data: { id: deleteData.id },
      });
      onDeleteData();
    } catch (err) {
      console.error(err);
    }
  };
   
  return (
    <button className="bg-red-500 rounded-md p-2 text-white font-bold" onClick={handleDeleteData}>
      <MdOutlineDeleteOutline size={20} />
    </button>
  );
};

export default DeleteData;
