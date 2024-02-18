const app = require('./app')


const connectDatabase = require('./config/database')



process.on('uncaughtException' , (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1)
})





connectDatabase()



const server = app.listen(5000 , () => {
    console.log(`Server is working on PORT: 5000`);
})





//Unhandled Promise Rejection
process.on('unhandledRejection' , err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhangled Promise Rejection`);

    server.close(() => {
        process.exit(1)
    })
})