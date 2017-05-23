/**
 * Created by Raja Dushyant Vashishtha on 23/5/17.
 * email rajad@decipherzone.com
 *
 * Description : $Description$
 */

import {Container} from "inversify";
import "reflect-metadata";
import {interfaces, TYPE} from "inversify-express-utils";
import {HomeController} from "../controller/HomeController";
import {Utility} from "../utils/utility";

export class IOC {
    private _container: Container;
    private static INSTANCE: IOC;

    constructor() {
        if (Utility.isNull(IOC.INSTANCE)) {
            IOC.INSTANCE = this;
        } else {
            throw new Error("Can't initialize singleton class !!");
        }
        this.init();
    }

    private init(): void {
        IOC.INSTANCE._container = new Container();
        IOC.INSTANCE._container.bind<interfaces.Controller>(TYPE.Controller).to(HomeController).whenTargetNamed("HomeController");
    }

    get container(): Container {
        return this._container;
    }

    public static getInstance(): IOC {
        if (!Utility.isNull(IOC.INSTANCE)) {
            return IOC.INSTANCE;
        }
        return new IOC();
    }

}