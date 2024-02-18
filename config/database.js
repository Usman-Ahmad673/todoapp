const mongoose = require('mongoose')



const connectDatabase = () => {

    mongoose.connect("mongodb+srv://itsusmanahmad00:Twv3nXmr4YvLteOd@cluster0.mthdclc.mongodb.net/?retryWrites=true&w=majority",
                    {
                        useNewUrlParser:true,
                        useUnifiedTopology:true
                    }
                    ).then((data) => {
                        console.log(`Successfully connected to database at Server : ${data.connection.host}`);
                    }).catch(err => {
                        console.log(`Error connecting to database: ${err.message}`);
                    })

}

module.exports = connectDatabase