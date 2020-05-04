import {Sequelize} from 'sequelize-typescript';
import { config } from './config/config';
// import { V0MODELS } from './controllers/v0/models';

const c = config.dev;
export const sequelize =  new Sequelize({
        database: c.database,
        dialect: 'postgres',
        username: c.username,
        password: c.password,
        storage: ':memory:',
        host: c.host
        // models: '',
});
 
// sequelize.addModels(V0MODELS)