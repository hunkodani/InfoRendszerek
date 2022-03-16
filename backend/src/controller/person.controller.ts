import { getRepository } from "typeorm";
import { Person } from "../entity/Person";
import { Controller } from "./controller";

export class PersonController extends Controller {
    repository = getRepository(Person);

    //Not used, only for testing
    /*getAll = async (req, res) => {
        const search = req.query.search || '';

        try {
            const entities = await this.repository
                .createQueryBuilder('person')
                .where("person.name LIKE CONCAT('%', :search, '%')", { search: search })
                .getMany();
            res.json(entities);
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }*/
}