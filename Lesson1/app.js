// Wires the app together: middleware -> routes -> error handling.
// No business logic and no route definitions live here anymore.

import express from 'express';
import routes from './routes/index.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        Server: 'Successfully Running'
    });
});

app.use(routes);

// these two must stay last — they only run if nothing above matched
app.use(notFound);
app.use(errorHandler);

export default app;
