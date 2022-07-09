const dotenv = require('dotenv').config()
const express = require('express')
const cors = require('cors')
const knex = require('knex')

const db = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
	},
})

const app = express()

app.use(express.json())
app.use(cors())

const bcrypt = require('bcrypt')
const saltRounds = 10

app.post('/signin', async (req, res) => {
	const data = await db('login').where('email', req.body.email)
	if (data.length === 0) {
		res.status(400).json('error signing in')
	} else {
		bcrypt.compare(
			req.body.password,
			data[0].hash,
			async function (err, result) {
				if (result === true) {
					const data = await db('users').where('email', req.body.email)
					res.status(200).json(data[0])
				} else {
					res.status(400).json('error signing in')
				}
			}
		)
	}
})

app.post('/register', (req, res) => {
	const { username, email, password } = req.body
	db('users')
		.insert({ email, username, joined: new Date() })
		.returning('*')
		.then((data) => {
			bcrypt.hash(password, saltRounds, async function (err, hash) {
				await db('login').insert({ email, hash })
			})
			return res.status(200).json(data[0])
		})
		.catch((err) => res.status(400).json('err'))
})

app.put('/image', async (req, res) => {
	const { id } = req.body
	const data = await db('users').where('id', id)
	if (data.length === 0) {
		res.status(400).json('not found')
	} else {
		const d = await db('users')
			.where('id', id)
			.update({ entries: (Number(data[0].entries) + 1).toString() })
			.returning('*')
		if (d.length === 0) {
			res.status(400).json('not found')
		} else {
			res.json(d[0].entries)
		}
	}
})

app.listen(process.env.PORT, () => {
	console.log(`app is listening ${process.env.PORT}`)
})
