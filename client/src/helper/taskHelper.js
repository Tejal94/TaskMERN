import axios from 'axios';

const api = axios.create({ baseURL: 'http://127.0.0.1:8080/api' });

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/tasks', {
      headers: {
      'Authorization': `Bearer ${token}`
    }});
    console.log("From helper", response)
    return response.data;
  } catch (error) {
    // Handle or throw the error depending on your preference
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post('/tasks', taskData, {
      headers: {
      'Authorization': `Bearer ${token}`
    }});
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update an existing task
export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (taskId) => {
  try {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};
