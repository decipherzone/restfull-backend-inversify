/**
 * Created by Raja Dushyant Vashishtha on 23/5/17.
 * email rajad@decipherzone.com
 *
 * Description : $Description$
 */

import * as express from "express";
import {Controller, Get, interfaces} from "inversify-express-utils";
import {injectable} from "inversify";

@Controller("/")
@injectable()
export class HomeController implements interfaces.Controller {

    @Get("/")
    private index(req: express.Request, res: express.Response, next: express.NextFunction) {
        return "Hello";
    }
}