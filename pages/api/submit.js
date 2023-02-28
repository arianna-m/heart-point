const AirtablePlus = require("airtable-plus")

const airtable = new AirtablePlus({
    baseID: 'appq2MoOMk1aytFqQ',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: "2022-23"
})

export default async function handler(req, res){
    const {email, event, points} = req.query;

    if (email && event && points) {
        const record = await airtable.create({ email: email, event: event, points: parseInt(points) });
        res.status(200).send(`Created record ${record.id}`)
    } else {
        res.status(400).send(`Couldn't create record.`)
    }
}