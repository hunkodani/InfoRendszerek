import { Router } from 'express';
import { FlatController } from './src/controller/flat.controller';
import { PersonController } from './src/controller/person.controller';
import { TransactionController } from './src/controller/transaction.controller';
import { UserController } from './src/controller/user.controller';

export function getRouter() {
    const router = Router();

    const userController = new UserController();
    const personController = new PersonController();
    const flatController = new FlatController();
    const transactionController = new TransactionController();

    router.get('/users', userController.getAll);
    router.get('/user?:search', userController.getUserRole);
    router.post('/users', userController.create);
    router.put('/users', userController.update);
    router.delete('/users/:id', userController.delete);

    router.get('/people', personController.getAll);
    router.get('/people/:id', personController.getOne);
    router.post('/people', personController.create);
    router.put('/people', personController.update);
    router.delete('/people/:id', personController.delete);

    router.get('/flats', flatController.getAll);
    router.get('/flats/:id', flatController.getOne);
    router.post('/flats', flatController.create);
    router.put('/flats', flatController.update);
    router.delete('/flats/:id', flatController.delete);

    router.get('/transactions', transactionController.getAll);
    //router.get('/transactions/:id', transactionController.getOne);
    router.get('/transaction?:id', transactionController.getAllById);
    router.post('/transactions', transactionController.create);
    router.put('/transactions', transactionController.update);
    router.delete('/transactions/:id', transactionController.delete);

    return router;
}