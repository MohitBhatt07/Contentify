import React, { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import InputModalSheet from "./InputModalSheet";
import Tooltip from "./Tooltip";

const CreateEntity = ({ onCreateEntity, isOpen, onClose }) => {
  const [entityName, setEntityName] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [onError , setOnError] = useState(false);
  const baseUrl = import.meta.env.VITE_APP_SERVER_URL;

  const handleCreateEntity = async () => {
    console.log(entityName);
    console.log(attributes)
    if(entityName === "" || attributes.length === 0){
      setOnError(true);
      return;
    }
  
    for(const curr of attributes) {
     if(curr.name.length === 0 || curr.type.length === 0){
        setOnError(true);
        return;
      }
    }
    
    try {
      await axios.post(`${baseUrl}/api/entities`, {
        name: entityName,
        attributes,
      });
      setEntityName("");
      setAttributes([]);
      onCreateEntity();
      onClose();
      toast.success("Entity created successfully");
    } catch (err) {
      toast.error(`${err.response.data.error}`);

      console.error(err);
    }
  };

  const handleAddAttribute = () => {  
    setAttributes([...attributes, { name: "", type: "" }]);
  };

  const handleAttributeChange = (index, field, value) => {
    setOnError(false);
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const handleAttributeRemove = (index)=>{
    setOnError(false);
    const newAttributes = [...attributes];
    newAttributes.splice(index , 1);
    setAttributes(newAttributes);
  }

  const closeHandler = () => {
    setEntityName("");
    setAttributes([]);
    onClose();
  };

  return (
    <InputModalSheet onClose={closeHandler} isOpen={isOpen}>
      <>
        <h2 className="text-2xl font-bold mb-2">Create Entity<Tooltip /></h2>
        <div className="text-center ">
          <input
            type="text"
            placeholder="Entity Name"
            value={entityName}
            onChange={(e) => {setEntityName(e.target.value); setOnError(false)}}
            className="border mr-2 border-gray-300 rounded-md p-2 mb-2"
          />
          {attributes.map((attribute, index) => (
            <div key={index} className="flex justify-center mb-2">
              <input
                type="text"
                placeholder="Attribute Name"
                value={attribute.name}
                onChange={(e) =>
                  handleAttributeChange(index, "name", e.target.value)
                }
                className="border border-gray-300 rounded-md p-2 mr-2"
              />
              <select
                value={attribute.type}
                onChange={(e) =>
                  handleAttributeChange(index, "type", e.target.value)
                }
                className="border border-gray-300 rounded-md p-2"
              >
                <option value="">Select Type</option>
                <option value="TEXT">Text</option>
                <option value="NUMERIC">Number</option>
                <option value="DATE">Date</option>
              </select>
              <button className="rounded-md p-2 bg-red-400 ml-2 text-white" onClick={()=>handleAttributeRemove(index)}>remove</button>
            </div>
          ))}
          <button
            onClick={handleAddAttribute}
            className="bg-blue-500 mr-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
          >
            Add Attribute
          </button>
          <button
            onClick={handleCreateEntity}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Entity
          </button>
          
        </div>
        {onError  && <p className="text-center text-red-600">Entity name or attributes cannot be empty</p>}
      </>
    </InputModalSheet>
  );
};

export default CreateEntity;
