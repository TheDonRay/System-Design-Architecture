// The Controller layer: reads the request, calls the model, shapes the response.
// No data access here directly, and no route paths here either.

import * as User from '../models/userModel.js';

// retrieves all user data here
export function getAllUsers(req, res) {
    res.json({
        Data: User.findAll()
    });
}

// create a new user from the JSON body
export function createUser(req, res) {
    const { name, email } = req.body;

    // 400 = "bad request from the client", not a thrown 500
    if (!name || !email) {
        return res.status(400).json({
            error: 'Name or email empty please fill them out'
        });
    }

    // 201 = "Created", and send back the user we just made
    const newUser = User.create({ name, email });
    res.status(201).json(newUser);
}

// getting a specific user through their id so this is like a parameter.
export function getUserById(req, res) {
    const user = User.findById(req.params.id);
    if (!user) return res.status(404).json({
        error: 'User is not found in data'
    });
    // if its valid return the user data
    res.json(user);
}

// we can create a req.query situation here as well
export function searchUsers(req, res) {
    const searchquery = req.query.name;
    if (!searchquery) {
        return res.status(400).json({
            error: "No search available for given query"
        });
    }
    const findData = User.findByName(searchquery);
    if (!findData) {
        return res.status(404).json({
            error: 'No user found with that name'
        });
    }
    return res.json({
        searched: searchquery,
        found: findData
    });
}

/*Practice questions for REST APIs:
Build a GET /users route that accepts page and limit query params and returns a slice of the users array.
GET /users?page=1&limit=2
Hint: look into .slice() on arrays.
*/
export function paginateUsers(req, res) {
    const { page, limit } = req.query;
    // some error handling in case
    if (!page || !limit) {
        return res.status(400).json({
            error: 'missing values please fill the respected values'
        });
    }
    return res.status(200).json({
        Output: User.paginate(page, limit)
    });
}

/*Practice questions for REST APIs:
Build a GET /users route that accepts a sortBy query param (name or age) and returns users sorted by that field.
GET /users?sortBy=name
Hint: look into .sort() on arrays.
*/
export function sortUsers(req, res) {
    const { sortBy } = req.query;
    if (sortBy !== 'name') {
        return res.status(400).json({
            error: "sortBy must be 'name'"
        });
    }
    return res.status(200).json({
        Output: User.sortByName()
    });
}
