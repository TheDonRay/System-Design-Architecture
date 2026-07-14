import express from 'express'; 
const app = express();  

// import any routes here below 
app.use(express.json()); 

// initialize the data here as such 
const userData = [];  
let nextId = 1; // initialize ID count here as such 

app.get('/', (req, res) =>  {
    res.json({ 
        Server: 'Successfully Running'
    }); 
});   

//retrieves all user data here 
app.get('/api/v1/users', (req, res) => { 
    res.json({ 
        Data: userData
    }); 
});    

// create a new user from the JSON body
app.post('/api/v1/newuser', (req, res) => {
    const { name, email } = req.body;

    // 400 = "bad request from the client", not a thrown 500
    if (!name || !email) {
        return res.status(400).json({
            error: 'Name or email empty please fill them out'
        });
    }

    // build the object first so we can both store AND return it
    const newUser = { id: nextId++, Name: name, Email: email };
    userData.push(newUser);

    // 201 = "Created", and send back the user we just made
    res.status(201).json(newUser);
});

// getting a specific user through their id so this is like a parameter. 
app.get('/api/v1/users/:id', (req, res) => { 
    // retrieve the user from here to get the id 
    const user = userData.find(user => user.id === parseInt(req.params.id)); 
    if (!user) return res.status(404).json({ 
        error: 'User is not found in data'
    }); 
    // if its valid return the user data 
    res.json(user); 
}); 

// we can create a req.query situation here as well 
app.get('/api/v1/search', (req, res) => { 
    const searchquery = req.query.name; 
    if (!searchquery) { 
        return res.status(400).json({ 
            error: "No search available for given query"
        });  
    }  
    const findData = userData.find(user => user.Name === searchquery); 
    if (!findData) { throw new Error('No user found with that name')}; 
    return res.json({ 
        searched: searchquery, 
        found: findData
    });
}); 




export default app; 

