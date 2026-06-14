import express from 'express'; 
const app = express();  

// import any routes here below 
app.use(express.json()); 

app.get('/', (req, res) =>  {
    res.json({ 
        Server: 'Successfully Running'
    }); 
});  

export default app; 

