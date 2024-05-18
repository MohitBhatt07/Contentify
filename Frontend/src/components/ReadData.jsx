import React, { useState } from "react";
import { MdEditDocument, MdOutlineDeleteOutline } from "react-icons/md";
import DeleteData from "./DeleteData";
import axios from "axios";
import { toast } from "react-toastify";
import NoDataImage from '../assets/No-dataImage.png';

const ReadData = ({ data, onChangeData, selectedEntity }) => {
  const [updateRow, setUpdateRow] = useState(null);
  const [updateData, setUpdateData] = useState({});
  const baseUrl = import.meta.env.VITE_APP_SERVER_URL;

  const handleUpdateChange = (key, value) => {
    setUpdateData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleUpdateData = async (event) => {
    event.preventDefault();
    console.log(updateData);
    try {
      await axios.put(
        `${baseUrl}/api/entity/${selectedEntity.name}`,
        updateData
      );
      setUpdateData({});
      onChangeData();
      setUpdateRow(null);
      toast.success("Data updated successfully"); 
    } catch (err) {
      console.error(err);
    }
  };

  const getAttributeType = (type) => {
    if (type === "text") return "text";
    else if (type === "numeric") return "number";
    else return "date";
  };

  const getDate = (isoDateTimeString) => {
    const date = new Date(isoDateTimeString);
    let dateString = date.toLocaleString();
    const index = dateString.indexOf(",");
    dateString = dateString.slice(0, index);
    return dateString;
  };

  const handleEditClick = (index) => {
    setUpdateRow(index);
    setUpdateData(data[index]);
  };

  return (
    data.length === 0 ? 
    <div className="text-center">
      <span className="text-2xl ">No data yet...</span>
      <img src={NoDataImage} alt="No data" className="mt-5 rounded-lg m-auto h-56 w-60"/>
    </div>
     :(
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    {Object.entries(data[0]).map(
                      ([key, val], index) =>
                        key !== "id" && (
                          <th
                            key={index}
                            scope="col"
                            className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-6"
                          >
                            {key}
                          </th>
                        )
                    )}
                    <th
                      scope="col"
                      className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-6"
                    >
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      {Object.entries(item).map(([key, val], it) => {
                        if (key === "id") return;
                        if (updateRow === index) {
                          return (
                            <td
                              key={it}
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                            >
                              <input
                                type={getAttributeType(
                                  selectedEntity.attributes[it].type
                                )}
                                value={updateData[key]}
                                placeholder={`${
                                  getAttributeType(
                                    selectedEntity.attributes[it].type
                                  ) === "date" && "mm-dd-yyyy"
                                }`}
                                onChange={(event) =>
                                  handleUpdateChange(key, event.target.value)
                                }
                                className="border border-gray-300 rounded-md px-2 py-1"
                              />
                            </td>
                          );
                        } else if (
                          selectedEntity.attributes[it].type === "date"
                        )
                          return (
                            <td
                              key={it}
                              className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                            >
                              {getDate(val)}
                            </td>
                          );
                        return (
                          <td
                            key={it}
                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                          >
                            {val}
                          </td>
                        );
                      })}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {updateRow !== null && updateRow === index ? (
                          <>
                            <button
                              className="bg-green-500  rounded-md  py-2 px-2 text-white font-bold"
                              onClick={handleUpdateData}
                            >
                              Update
                            </button>
                            <button
                              className="bg-red-500  rounded-md ml-2 py-2 px-2 text-white font-bold"
                              onClick={() => setUpdateRow(null)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <DeleteData
                              deleteData={item}
                              onDeleteData={onChangeData}
                              selectedEntity={selectedEntity}
                            />
                            <button
                              className="bg-green-500 ml-2 rounded-md p-2 text-white font-bold"
                              onClick={() => handleEditClick(index)}
                            >
                              <MdEditDocument size={20} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default ReadData;
