import {Request, Response, Router} from 'express'
import { User } from '../models/User';

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    // res.send()
});

router.get(":id", (req: Request, res:Response) => {
    const {id }= req.params;
    const item = User.findByPk(id);
    if(item){
        res.send(item);
    }
    res.send("couldn't find the user");

});

export const UserRouter : Router = router;
 