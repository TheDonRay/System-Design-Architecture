// Anything a controller throws (or passes to next(err)) lands here.
// Express 5 forwards async rejections automatically, so this catches those too.

export function notFound(req, res) {
    res.status(404).json({
        error: `Route not found: ${req.method} ${req.originalUrl}`
    });
}

// four args = Express recognizes this as the error handler
export function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error'
    });
}
