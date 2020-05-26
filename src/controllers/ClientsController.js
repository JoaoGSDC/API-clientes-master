const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        try {
            const cpf = req.query.cpf;
            const clients = cpf ? await connection('users').where('cpf', cpf).innerJoin('phones', 'users.cpf', 'phones.cpf_client') : await connection('users').select('*');
         
            return res.json(clients);
        } catch (err) {
            res.send(err);
        }
    },

    async create(req, res) {
        try {
            const { name, type, cpf, rg, date, id_group, status, tel } = req.body;

            const client = await connection('users').insert({
                name,
                type,
                cpf,
                rg,
                date,
                id_group,
                status
            });
    
            const phone = await tel.foreach((number) => {
                connection('phones').insert({
                    tel: number,
                    cpf_client: cpf
                });
            });
    
            return res.json(client);
        } catch(err) {
            res.send(err);
        }
    },

    async update(req, res) {
        try {
            const { name, type, cpf, rg, date, id_group, status, tel } = req.body;

            const client = await connection('users').where('cpf', cpf).select('*');

            if (!client) {
                return res.status(401).json({ error: 'Operation not permitted.' });
            }

            await connection('users').where('cpf', cpf).update({
                name,
                type,
                cpf,
                rg,
                date,
                id_group,
                status
            });

            await tel.foreach((number) => {
                connection('phones').where('cpf_clients', cpf).update({
                    tel: number
                })
            });

            client = await connection('users').where('cpf', cpf).select('*');

            return res.json(client);
        } catch (err) {
            res.send(err);
        }
    },

    async delete(req, res) {
        try {
            const { cpf } = req.params;

            const client = await connection('users').where('cpf', cpf).select('*');

            if (!client) {
                return res.status(401).json({ error: 'Operation not permitted.' });
            }

            await connection('users').where('cpf', cpf).del();
            await connection('phone').where('cpf_client', cpf).del();

            return res.status(204).send();
        } catch (err) {
            res.send(err);
        }
    }
}