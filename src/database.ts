import mongoose from 'mongoose';

// mongoose.connect( process.env.MONGODB_URI +''  || 'mongodb://localhost:27017/test'
// ,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
// })  
// .then(db => {console.log("database is connected test");
// console.log(db.Connection.name)})
// .catch(err => console.log(err));


mongoose.connect( process.env.MONGODB_URI+''
,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})  
.then(db => {console.log("database is connected filesDBdd");
console.log(db.Connection.name)})
.catch(err => console.log(err));