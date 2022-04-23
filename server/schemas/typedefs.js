const {gql} = require("apollo-server-express")


const typeDefs = gql`

    type Query{
        Hello:String
    }



`


module.exports = typeDefs