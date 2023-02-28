const AirtablePlus = require("airtable-plus")

const airtable = new AirtablePlus({
    baseID: 'appq2MoOMk1aytFqQ',
    apiKey: process.env.AIRTABLE_API_KEY,
    tableName: "2022-23",
    camelCase: true,
    transform: r => {
        const id = r.id
        delete r.id
        r.fields["id"] = id;
        return r.fields
    },
})

export default async (_, res) => {
    const data = await airtable.read({sort: [{field: 'created', direction: 'asc'}],});
    res.json(data)
}