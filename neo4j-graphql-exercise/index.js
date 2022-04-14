const { Neo4jGraphQL } = require("@neo4j/graphql");
const neo4j = require("neo4j-driver");
const { ApolloServer, gql } = require("apollo-server");

const driver = neo4j.driver(
    "neo4j://localhost:7687",
    neo4j.auth.basic("neo4j", "s3cr3t")
);

const typeDefs = gql`
    type Todo {
        status: Boolean
        description: String
        completedBy: Person @relationship(type: "COMPLETED_BY", direction: IN, properties: "CompletedBy")
        belongsToProject: Project! @relationship(type: "BELONGS_TO", direction: OUT)
    }
    type Project {
        name: String
        todos: [Todo!]! @relationship(type:"BELONGS_TO", direction: IN)
    }
    type Person {
        name: String
        completedTodos: [Todo!]! @relationship(type:"COMPLETED_BY", properties: "CompletedBy", direction: OUT)
    }

    interface CompletedBy @relationshipProperties {
        completedOn: DateTime!
    }
`

// We create a async function here until "top level await" has landed
// so we can use async/await
async function main() {
    const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

    const server = new ApolloServer({
        schema: await neoSchema.getSchema(),
        context: ({ req }) => ({ req }),
    });
    server.listen().then(({url}) => {
       console.log(`server ready to listen at ${url}`)
    })
}

main();