import {Request, Response, Router} from 'express'
import { User } from '../models/User';
import { AuthRouter } from './auth.router';

const router: Router = Router();

router.use('/auth', AuthRouter);

router.get("/", (req: Request, res: Response) => {
    // res.send()
});

router.get("/:id", async(req: Request, res:Response) => {
    const {id }= req.params;
    const item = await User.findByPk(id);
    if(item){
        res.send(item);
    } else {
    res.send("couldn't find the user");
}
});

export const UserRouter : Router = router;
 