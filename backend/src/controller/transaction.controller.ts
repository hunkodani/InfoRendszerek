import { getManager, getRepository } from "typeorm";
import { Person } from "../entity/Person";
import { Transaction } from "../entity/Transaction";
import { Controller } from "./controller";

export class TransactionController extends Controller {
    repository = getRepository(Transaction);

    getAllById = async (req, res) => {
        const search = req.query.search || '';
        
        try {
            const entities = await this.repository
                .createQueryBuilder('transaction')
                .leftJoinAndSelect('transaction.resident', 'resident')
                .where('resident.id = :search', {search: search})
                .getMany();
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }
}