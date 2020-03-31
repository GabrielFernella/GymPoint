import Sequelize from  'sequelize';

//Models
import Administrador from '../app/models/Administrador';
import Studant from '../app/models/Studant';

import databaseConfig from '../config/database';

const models = [Administrador, Studant];

class Database {
    constructor () {
        this.init();
    }

    init(){
        this.connection = new Sequelize(databaseConfig);

        models.map(model => model.init(this.connection));
    }
}

export default new Database();