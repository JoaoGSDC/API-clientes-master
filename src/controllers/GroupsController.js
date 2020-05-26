const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        try {
            const id = req.query.id;
            const groups = id ? await connection('groups').where('id', id).select('*') : await connection('groups').select('*');

            return res.json(groups);
        } catch (err) {
            res.send(err);
        }
    },

    async create(req, res) {
        try {
            const { name, status } = req.body;

            const groups = await connection('groups').insert({
                name,
                status
            });

            return res.json(groups);
        } catch (err) {
            res.send(err);
        }
    },

    async update(req, res) {
        try {
            const { id, name, status } = req.body;

            const group = await connection('groups').where('id', id).select('*');

            console.log(group);
            
            if (!group) {
                return res.status(401).json({ error: 'Operation not permitted.' });
            }

            await connection('groups').where('id', id).update({
                name,
                status
            });

            group = await connection('groups').where('id', id).select('*');

            return res.json(group);
        } catch (err) {
            res.send(err);
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;

            const group = await connection('groups').where('id', id).select('*');

            if (!group) {
                return res.status(401).json({ error: 'Operation not permitted.' });
            }

            await connection('groups').where('id', id).del();

            return res.status(204).send();
        } catch (err) {
            res.send(err);
        }
    }

}