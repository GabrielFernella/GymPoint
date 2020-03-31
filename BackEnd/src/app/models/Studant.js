import Sequelize, { Model } from 'sequelize';

class Studant extends Model {
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
}

export default Studant;