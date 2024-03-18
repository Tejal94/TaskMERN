import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN

export async function Authenticate(username){
    try{
        return await axios.post('/api/authenticate', { username })
    }catch(e){
        return { e : "User not authenticated..."}
    }
}

export async function registerUser(credentials){
    try{
        const { data : { msg }, status } = await axios.post('/api/register', credentials)

        return Promise.resolve(msg)
    }catch(e){
        return Promise.reject(e)
    }
}

export async function verifyLogin({ username, password }){
    try{
        if(username){
            const data = await axios.post('/api/login', { username, password });
            return Promise.resolve({data})
        }
    }catch(e){
        return Promise.reject({e: "Password incorrect..."})
    }
}

export async function verifyPassword({ username, password }){
    try {
        if(username){
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})      
    }
}