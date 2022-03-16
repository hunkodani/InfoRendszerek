import "reflect-metadata";
import {createConnection} from "typeorm";
import { connectionOptions } from "./ormconfig";
import express from 'express';
import { getRouter } from "./routes";

createConnection(connectionOptions).then(async connection => {

    const app = express();

    app.use(express.json());
    app.use('/api', getRouter());

    app.listen(3000, () => console.log('Successfully listening on 3000 ...'));

    /*const transaction = new Transaction();
    const person = new Person();
    person.name = "test";
    person.accountBalance = 0;
    person.isResident = true;
    transaction.owner = person;
    transaction.amount = 2000;
    transaction.balanceAfter = 2000;
    transaction.date = new Date();
    transaction.type= "payment";
    await connection.manager.save(transaction);*/

}).catch(error => console.log(error));
