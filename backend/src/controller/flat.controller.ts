import { getRepository } from "typeorm";
import { Flat } from "../entity/Flat";
import { Controller } from "./controller";

export class FlatController extends Controller {
    repository = getRepository(Flat);
}