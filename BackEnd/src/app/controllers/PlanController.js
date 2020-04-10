import Plan from '../models/Plan';
import * as Yup from 'yup';

class PlanController {
    async index(req, res){
        
        return res.json()
    }

    async store(req, res){
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.number().required(),
        })
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation Fails.'})
        }
        

        const plan = await Plan.create(req.body);

        return res.json(plan)
    }
}


export default new PlanController();