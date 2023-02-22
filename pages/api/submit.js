export default async function handler(req, res){
    const {email, event, points} = JSON.parse(req.body);

    if( !email || !event || !points) {
        return res.status(400).json({error: "Missing Fields"})
    }
    if(req.method != "POST") {
        return res.status.json({error: "Method not allowed"})
    }

    const request = await fetch('https://api.airtable.com/v0/appq2MoOMk1aytFqQ/2022-23', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({fields: {email, event, points}})
    });
    if(request.ok){
        return res.status(200).json({data: "ok"});
    }
    return res.status(400).json({error: "error returned"})

}