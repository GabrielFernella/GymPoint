import Sequelize, { Model } from 'sequelize';

class Student extends Model {
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            idade: Sequelize.INTEGER,
            peso: Sequelize.DECIMAL,
            altura: Sequelize.DECIMAL,
        },
        {
            sequelize,
        });
        return this;
    }

    static associate(models){
        this.belongsTo(models.Plan, {foreignKey: 'plan_id', as: 'plan'});
    }
}

export default Student;