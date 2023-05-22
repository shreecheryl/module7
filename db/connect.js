import mongoose from 'mongoose'

// mongoose
//     .connect(process.env.DB) // this returns a Promise so we then use 'then' to con't when the connection is successful
//     .then(() => console.log('Connected to the database...'))
//     .catch((err) => console.log(err))

// The above works but reconfiguring here (above does not need export this does)
const connectDB = (url) => {
    return mongoose.connect(url)
}

export default connectDB

