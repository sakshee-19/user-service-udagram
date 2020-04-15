import { UserRouter } from './user.router';
import { Router, Request, Response } from 'express';
// import { AuthRouter } from './auth.router';


const router: Router = Router();

router.use('/users', UserRouter);
// router.use('/auth', AuthRouter);

router.get('/', (req: Request, res: Response) =>{
    res.send(`V0`);
})

export const IndexRouter: Router = router;