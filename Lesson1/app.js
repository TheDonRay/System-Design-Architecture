import express from 'express'; 
const app = express();  

// import any routes here below 
app.use(express.json()); 

// initialize the data here as such 
const userData = []; 

app.get('/', (req, res) =>  {
    res.json({ 
        Server: 'Successfully Running'
    }); 
});   

app.get('/users', (req, res) => { 
    res.json({ 
        Data: userData
    }); 
});   

export default app; 

