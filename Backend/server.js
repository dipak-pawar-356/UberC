const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;


const server = http.createServer(app);


server.listen(port, (err) => {
    if (err) {
        console.error(`Failed to start server: ${err.message}`);
        process.exit(1); // Exit with failure code
    } else {
        console.log(`Server is running on port ${port}`);
    }
});
