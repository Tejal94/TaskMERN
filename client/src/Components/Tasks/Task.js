import React, { useState } from 'react';
import { updateTask } from '../../helper/taskHelper';

const Task = ({id ,sr, title, description, onDelete, onUpdateSuccess }) => {

  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleUpdate = async () => {
    try {
      const updatedTask = await updateTask(id, { title: editedTitle, description: editedDescription });
      onUpdateSuccess(updatedTask); 
      setEditMode(false); 
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };


  return (
    <div className="bg-white shadow-md rounded-lg p-3 flex flex-col gap-2 mb-4">
      
      {editMode ? (
        <>
        <div className='border rounded-lg p-4 '>
          <input className='border rounded-md w-[30%]' value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} />
          <input className='border rounded-md w-[30%]' value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)} />
          <button className="text-white bg-indigo-500 hover:bg-indigo-950 px-3 py-1 rounded-md mr-2" onClick={handleUpdate}>Save</button>
          <button className="text-white bg-indigo-500 hover:bg-indigo-950 px-3 py-1 rounded-md mr-2" onClick={() => setEditMode(false)}>Cancel</button>
        </div>
        </>
      ) : (
        
      <div className="flex justify-between items-center">
        <section className='flex'>
          <span className="text-xl font-semibold">{sr}.</span>
          <h3 className="text-xl font-semibold ml-6">{title}</h3>
        </section>
        <div>
          <button
            onClick={() => setEditMode(true)}
            className="text-white bg-indigo-500 hover:bg-indigo-950 px-3 py-1 rounded-md mr-2"
          >
            Update
          </button>
          <button
            onClick={() => onDelete(id)}
            className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
      )}
      
      <p className="text-gray-700">{description}</p>
    </div>
  )
}

export default Task