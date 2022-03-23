import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Controller } from "./controller";

export class UserController extends Controller {
    repository = getRepository(User);

    getUserRole = async (req, res) => {
        const name = req.query.name || '';
        const pass = req.query.pass || '';
        
        try {
            const entity = await this.repository
                .createQueryBuilder('user')
                .where('user.username = :name AND user.passw = :pass', {name: name, pass: pass})
                .getOne();
            if (entity) {
                res.json(entity.role);
            } else {
                res.json('');
            }
            
        } catch (err) {
            console.error(err);
            this.handleError(res);
        }
    }
}