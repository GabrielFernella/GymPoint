import * as Yup from 'yup';

import Student from '../models/Student';


class StudentController {
    async store(req, res) {
        //Validação dos dados na requisição
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            idade: Yup.number().required(),
            peso: Yup.number().required(),
            altura: Yup.number().required(),
        });
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation fails'});
        }

        const userExists = await Student.findOne({ where: { email: req.body.email }}) //Procura se algum usuário já possui um email
            if(userExists){
                return res.status(400).json({ error: 'Student already exists'});
            }
        const {id, name, email, idade, peso, altura} = await Student.create(req.body);

        return res.json({
            id,
            name,
            email,
            idade, 
            peso, 
            altura
        });
    }
    //Verificar Studant para Student
   /* async update(req, res){
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

        const user = await User.findByPk(req.userId);

        if(email != user.email){
            const userExists = await User.findOne({ where: { email: req.body.email }}) //Procura se algum usuário já possui um email

            if(userExists){
                return res.status(400).json({ error: 'User already exists'});
            }
        }

        if( oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({ error: 'Password does not match'});
        }

        const {id, name, provider} = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
            provider
        });
    }*/
}

export default new StudentController();  