const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const connection = require('../database/connection');
const authConfig = require('../config/auth.json');

module.exports = {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const results = await connection('auth').where('email', email).select('*');
            const user = results[0];

            if (!user.email) {
                return res.status(400).send({ error: 'User not found' });
            }

            const pw = await bcrypt.compare(password, user.password);

            if (!pw) {
                return res.status(400).send({ error: 'Password not found' });
            }

            const token = jwt.sign({ id: user.id }, authConfig.secret, {
                expiresIn: 86400
            });

            return res.send({ user, token });
        } catch (err) {
            res.send(err);
        }
    },

    async create(req, res) {
        try {
            const { email, password } = req.body;


            const user = await connection('auth').where('email', email).select('email');
            console.log(user);

            if (user.length > 0) {
                return res.status(400).send({ error: 'User exists' });
            }

            const hash = await bcrypt.hash(password, 10);

            const login = await connection('auth').insert({
                email,
                password: hash
            });

            return res.json(login);
        } catch (err) {
            res.send(err);
        }
    }
}