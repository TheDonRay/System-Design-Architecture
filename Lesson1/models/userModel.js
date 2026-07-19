// The Model layer: owns the data and the only code allowed to touch it.
// Right now it's an in-memory array. Swap this file for a DB later and
// nothing in controllers/ or routes/ has to change.

const userData = [];
let nextId = 1; // initialize ID count here as such

export function findAll() {
    return userData;
}

export function findById(id) {
    return userData.find(user => user.id === parseInt(id));
}

export function findByName(name) {
    return userData.find(user => user.Name === name);
}

export function create({ name, email }) {
    const newUser = { id: nextId++, Name: name, Email: email };
    userData.push(newUser);
    return newUser;
}

export function paginate(page, limit) {
    return userData.slice(page, limit);
}

export function sortByName() {
    return [...userData].sort((a, b) => a.Name.localeCompare(b.Name));
}
