// DynamicInputFields.js

import { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";



const DynamicInputFields = () => {
  const [inputFields, setInputFields] = useState([
    { id: 0, value: '' } // Initial input field
  ]);

  // Function to add a new input field
  const addInputField = () => {
    setInputFields([...inputFields, { id: inputFields.length, value: '' }]);
  };

  // Function to remove an input field by its ID
  const removeInputField = (id) => {
    setInputFields(inputFields.filter(field => field.id !== id));
  };

  return (
    <div className='flex '>
      {inputFields.map((field, index) => (
        <div key={field.id} className="flex mb-4">
          <label htmlFor={`location-${field.id}`} className="mr-2"></label>
          <input
            type="text"
            id={`location-${field.id}`}
            className="border rounded px-2 py-1 w-24"
            value={field.value}
            onChange={(e) => {
              const updatedFields = [...inputFields];
              updatedFields[field.id].value = e.target.value;
              setInputFields(updatedFields);
            }}
          />
          {index === inputFields.length - 1 && <button className='mx-2' onClick={addInputField}><IoMdAdd /></button>}
          {index !== inputFields.length - 1 && <button className='mx-2' onClick={() => removeInputField(field.id)}><IoCloseSharp />
</button>}
        </div>
      ))}
    </div>
  );
};

export default DynamicInputFields;
