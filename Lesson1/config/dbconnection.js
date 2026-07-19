import { mongoose } from 'mongoose'; 

//set it up as a function to do the connection, remember its going to be async  
const dbConnection = async () => { 
    try { 
        const connection = mongoose.connect(process.env.URI); 
        if (!connection) { 
            return res.status(400).json({ 
                Error: error
            }); 
        } 
        // if successful console.log 
        console.log('Connection is Successful'); 
    } catch (error) { 
        return res.status(500).json({ 
            Error: 'Connection Error'
        })
    }
}; 

export default dbConnection; 