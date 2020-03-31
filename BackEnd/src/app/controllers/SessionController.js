import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from '../../config/auth';

import Administrador from '../models/Administrador';

class SessionController {
    async store(req,res){
        //Validation Schema 
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails'});
        }

        const { email, password } = req.body;

        const administrador = await Administrador.findOne({ where: { email }});
        //Validation Email
        if(!administrador){
            return res.status(401).json({ error: 'Administrator not found'})
        }
        //Validation Password
        if(!(await administrador.checkPassword(password))) { 
            return res.status(401).json({ error: 'Password does not match'});
        }

        //Insert data
        const { id, name } = administrador;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });

    }
}

export default new SessionController();