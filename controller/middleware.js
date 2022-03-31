const { ObjectId } = require('mongodb')
const { Connection } = require('../db/mongoDB')
class ReqHandling {
    async get(req, res) {
        try {
            const collection = Connection.client.db('TEST').collection('Employee_DATA')
            const data = await collection.find({}).toArray()
            return res.json({
                success: true,
                message: "fetched successfully",
                data
            })
        } catch (error) {
            res.json({
                success: false,
                message: error
            })
        }
    }
    async post(req, res) {
        try {
            if (Object.keys(req.body).length < 0) return res.status(400).send('Bad Request')
            const collection = Connection.client.db('TEST').collection('Employee_DATA')
            const options = { ordered: true }
                //const data = await (await collection.insertOne(req.body))
            const data = await collection.insertMany(req.body, options)
            return res.json({
                success: true,
                message: `Inserted data with id ${data.insertedIds}`
            })
        } catch (error) {
            res.json({
                success: false,
                message: error
            })
        } finally {
            Connection.client.close()
        }
    }
    async single(req, res) {
        try {
            const collection = Connection.client.db('TEST').collection('Employee_DATA')
            const data = await collection.findOne({ _id: ObjectId(req.params.id) })
            console.log(data);
            if (data === null) return res.send(`nothing found with id ${req.params.id}..`)

            else return res.json({
                message: `fetched successfully`,
                data
            })
        } catch (error) {
            console.log(error);
            res.json({
                message: `something went wrong`,
            })
        }
    }
    async update(req, res) {
        try {
            const collection = Connection.client.db('TEST').collection('Employee_DATA')
                //const data = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body }, { upsert: true })
                //without upsert
            const data = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body })
            if (data.matchedCount === 0) return res.json({
                success: 'false',
                message: `No document found with id ${req.params.id} in collection`
            })
            return res.json({
                message: `Updatation successful`,
                data
            })
        } catch (error) {
            res.json({
                success: false,
                message: 'Something went wrong'
            })
            console.log(error);
        }
    }
    async delete(req, res) {
        try {
            const collection = Connection.client.db('TEST').collection('Employee_DATA')
            const data = await (await collection.deleteOne({ _id: ObjectId(req.params.id) }))
            if (data.deletedCount !== 1) return res.json({ success: false, message: `No data found with id ${req.params.id}...` })
            return res.json({ success: true, message: `document deleted successfully` })

        } catch (error) {
            res.json({ message: `something went wrong` })
            console.log(error);
        }
    }
}

module.exports = new ReqHandling();