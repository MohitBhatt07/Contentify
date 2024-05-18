import React, { useState } from "react";
import axios from "axios";
import InputModalSheet from "./InputModalSheet";
import { toast } from "react-toastify";
import { RiFileAddLine } from "react-icons/ri";


const CreateData = ({ selectedEntity, onCreateData }) => {
  const [newData, setNewData] = useState({});
  const baseUrl = import.meta.env.VITE_APP_SERVER_URL;
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCreateData = async () => {
    console.log(newData);
    try {
      await axios.post(`${baseUrl}/api/entity/${selectedEntity.name}`, newData);
      setNewData({});
      onCreateData();
      setShowModal(false); 
      toast.success("Data added successfully");
    } catch (err) {
      console.error(err);
    }
  };
  const getAttributeType = (type)=>{
    if(type === "text") return "text";
    else if(type === "numeric") return "number";
    else return "date";
  }
  return (
    <div className="flex justify-end mb-2 w-[90%]">
      <button onClick={()=>setShowModal(true)} className="flex text-white gap-2 font-bold justify-center items-center bg-violet-600 hover:bg-violet-700 p-3 rounded-lg ">Add New 
      <RiFileAddLine size={20}/>
      </button>
      
        <InputModalSheet onClose={closeModal} isOpen={showModal}>
          <>
            <h4 className="text-lg font-bold mb-2">Create Data</h4>
            <div className="flex gap-2 flex-wrap">
              {selectedEntity.attributes.map((attribute, index) => {
                if (attribute.name !== "id")
                  return (
                    <input
                      key={index}
                      type={getAttributeType(attribute.type)}
                      placeholder={`${attribute.name}`}
                      value={newData[attribute.name] || ""}
                      onChange={(e) =>
                        setNewData({ ...newData, [attribute.name]: e.target.value })
                      }
                      className="border border-gray-300 rounded-md p-2 mb-2"
                    />
                  );
              })}
            </div>
            <button
              onClick={handleCreateData}
              className="bg-green-500   hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Data
            </button>
          </>
        </InputModalSheet>
      
    </div>
  );
};

export default CreateData;
