import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styles from '../styles/Username.module.css';
import { createTask, fetchTasks, deleteTask, updateTask } from '../helper/taskHelper';
import Task from './Tasks/Task';
import { useNavigate } from 'react-router-dom';

const UserHome = () => {

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(true);

  const [tasksList, setTasksList] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask({ title, description, status });
      toast.success('Task added...')
      setTasksList(prevTasks => [...prevTasks, newTask]);
      setTitle('');
      setDescription('');
    } catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        setTasksList(fetchedTasks);
        console.log(tasksList)
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    loadTasks();
  }, [])

  const handleDelete = async (taskId) => {
    try{
      await deleteTask(taskId);
      setTasksList(tasksList.filter(task => task._id !== taskId));
      toast.success("Task deleted...")
    }catch(e){
      console.error("Failed to delete task:", e);
      toast.error("Failed to delete task...")
    }
  }

  const handleUpdate = async (taskId, updatedData) => {
    try {
      const updatedTask = await updateTask(taskId, updatedData);
      setTasksList(tasksList.map(task => task._id === taskId ? updatedTask : task));
      toast.success('Task updated successfully.');
    } catch (error) {
      console.error('Failed to update task:', error);
      toast.error('Failed to update task.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  return (
    <>
    <button
        className="text-white text-lg absolute z-50 top-10 right-10 bg-indigo-500 hover:bg-indigo-950 px-4 py-2 rounded-md"
        onClick={handleLogout}
      >
        Logout
      </button>
    <div className={`container mx-auto`}>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-auto mt-16'>
        <div className={styles.glass1}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold mb-3'>Let's get the Tasks done!</h4>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='textbox flex w-[100%]'>
              <input onChange={(e) => setTitle(e.target.value)} className='border-0 px-5 py-4 rounded-xl w-[30%]' type='text' placeholder='Title' />
              <input onChange={(e) => setDescription(e.target.value)} className='border-0 px-5 py-4 rounded-xl ml-[2%] w-[40%]' type='text' placeholder='Description' />
              <button className='border bg-indigo-500 w-[20%] ml-[8%] py-4 mt-2 rounded-lg text-gray-50 text-xl shadow-sm text-center hover:bg-indigo-950' type='submit'>Add Task</button>
            </div>
          </form>

          <div className={`mt-4`}>
            <div className='flex bottom-1 p-2 w-[100%]'>
              <p className='w-[10%] font-semibold'>Sr. No.</p>
              <p className='w-[40%] font-semibold'>title</p>
              <p className='font-semibold'>Description</p>
            </div>
            {
              tasksList?.map((cval, i) => {
                return (
                  <Task 
                    sr={i+1} 
                    id={cval?._id}
                    title={cval?.title} 
                    description={cval?.description}
                    // onUpdate={() => handleUpdate(cval._id)}
                    onDelete={() => handleDelete(cval._id)} 
                    onUpdateSuccess={(updatedTask) => handleUpdate(cval._id, updatedTask)}
                    />
                )
              })
            }
          </div>

        </div>
      </div>

    </div>
    </>
  )
}

export default UserHome