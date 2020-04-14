import { UserRouter } from './user.router';
import { Router, Request, Response } from 'express';


const router: Router = Router();

router.use('/users', UserRouter);

router.get('/', (req: Request, res: Response) =>{
    res.send(`V0`);
})

export const IndexRouter: Router = router;