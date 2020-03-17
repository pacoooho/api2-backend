import app from './app';
import dotenv from 'dotenv';
dotenv.config();


import './database';

function main() {
  
    app.listen(process.env.PORT||4000);
    console.log(`Server on port ${process.env.PORT||4000}`);

}

main();