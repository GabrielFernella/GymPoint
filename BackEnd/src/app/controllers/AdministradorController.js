import * as Yup from 'yup';
import Administrador from '../models/Administrador';

class AdministradorController {

    async store(req, res) {
        //Validação dos dados na requisição
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(8),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails'});
        }

        //Validation Email
        const administradorExists = await Administrador.findOne({ where: { email: req.body.email }})
            if(administradorExists){
                return res.status(400).json({ error: 'Administrador already exists'});
            }

        const {id, name, email} = await Administrador.create(req.body);

        return res.json({
            id,
            name,
            email,
        });
    } 

    async update(req, res){
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(8),
            password: Yup.string().min(8)
                .when('oldPassword', (oldPassword, field) => oldPassword ? field.required() :  field ),
            confirmPassword: Yup.string().when('passwprd', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field )
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails'});
        }

        const { email, oldPassword } = req.body;

        const user = await Administrador.findByPk(req.userId);

        if(email != user.email){
            const userExists = await Administrador.findOne({ where: { email: req.body.email }})
            if(userExists){
                return res.status(400).json({ error: 'Administrator already exists'});
            }
        }

        if( oldPassword && !(await Administrador.checkPassword(oldPassword))){
            return res.status(401).json({ error: 'Password does not match'});
        }

        const {id, name} = await Administrador.update(req.body);

        return res.json({
            id,
            name,
            email
        });
    }
}

export default new AdministradorController();  