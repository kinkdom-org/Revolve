module.exports = {

    async test() {

        const config = require('../config.json');

        const faunadb = require('faunadb');
        const client = new faunadb.Client({ secret: config.faunadb_secret });

        const { 
            Paginate,
            Get,
            Ref,
            Select,
            Match,
            Index,
            Create,
            Collection,
            Lambda,
            Var,
            Join
        } = faunadb.query;

        //const doc = await client.query(
        const doc = client.query(
            Get(
                Match(Index("intros_by_userID"), "279395206024003587")
            )
        );

        doc.then(function(response) {
            console.log('Response: ', response);
            return response;
        }).catch(function (err) { 
            console.log('Error: ', err) 
        });

    }
};