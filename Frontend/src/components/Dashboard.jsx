import React, { useEffect, useState } from "react";
import { API } from "../api/connect";
import { Link } from "react-router-dom";
import NoDataImage from "../assets/No-dataImage.png";
import axios from "axios";
import CreateEntity from "./CreateEntity";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [entities, setEntities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const baseUrl = import.meta.env.VITE_APP_SERVER_URL;

  const handleDeleteEntity = async (entityName) => {
    try {
      const res = await axios.delete(`${baseUrl}/api/entities/${entityName}`);
      toast.success(`${res.data.message}`);
      handleCreateEntity();
      
    } catch (err) {
      toast.error(err);
    }
  };

  const handleCreateEntity = () => {
    const fetchEntities = async () => {
      try {
        const res = await axios.get(`${baseUrl}/api/entities`);
        console.log(res.data);
        if(res.data.length === 0){
          setEntities([]);
        }
        else
          setEntities(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEntities();
  };
  useEffect(() => {
    handleCreateEntity();
  }, []);

  const modalCloseHandler = () => {
    setShowModal(false);
  };
  // console.log(entities)
  // console.log(entities.length === 0);
  return (
    <>
      <CreateEntity
        onCreateEntity={handleCreateEntity}
        isOpen={showModal}
        onClose={modalCloseHandler}
      />

      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow py-4">
          <div className="max-w-7xl flex justify-between mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Entities
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-lg p-2"
            >
              {" "}
              Add entity
            </button>
          </div>
        </header>
        {(Object.entries(entities).length ===0 ) ? (
          <div className="text-center  mt-12">
            <span className="text-2xl font-bold text-violet-700">No Entities yet...</span>
            <img
              src={NoDataImage}
              alt="No data"
              className="mt-5 rounded-lg m-auto h-56 w-60"
            />
          </div>
        ) : (
          
          <main>
            <div className="mt-2">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Attributes</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(entities).map(
                    ([entityName, attributes], index) => (
                      <tr key={index}>
                        <td className="border px-4 py-2">{entityName}</td>
                        <td className="border px-4 py-2">
                          {attributes.map((attr, i) => (
                            <span
                              key={i}
                              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                            >
                              {attr}
                            </span>
                          ))}
                        </td>
                        <td className="border px-4 py-2">
                          <div className="flex justify-center">
                            <Link to={`/entity/${entityName}`}>
                              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                                Edit
                              </button>
                            </Link>
                            <button
                              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                              onClick={() => handleDeleteEntity(entityName)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </main>
        )}
      </div>
    </>
  );
};

export default Dashboard;
