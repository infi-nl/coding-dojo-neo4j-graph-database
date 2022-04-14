# Chapter GraphQL and Neo4j
Neo4j has provided the community with a package (currently supported on Java and Node runtime environments).
Based on a given graphql schema it handles cypher queries and provides us with an interesting middleware for creating node based graphql api's backed by a neo4j database.
We're using Apollo Server to create the actual api based on the schema.

In this chapter we're shortly taking a look at what that library can provide us with. We'll be extending predefined type definitions used to describe your graph db structure.
Context will be a simple todo api, with Persons and Projects.

**TODO: Paste in graph**

### Exercise 1:
Extend the type def with a Project Type and according relationship

### Exercise 2:
Add a Project
Add a Person
Add a Todo through running a graphql mutation in the apollo sandbox server (apollo)
Complete a todo

### Exercise 3:
query a list that would provide you with the necessary information to create a todo app.


## Resources used when crafting the dojo:
- [Type Definitions](https://neo4j.com/docs/graphql-manual/current/type-definitions/)
- [Relationship](https://neo4j.com/docs/graphql-manual/current/type-definitions/relationships/)
- [Mutations](https://neo4j.com/docs/graphql-manual/current/mutations/)



### Scratch queries

```graphql

query GetAllTodos {
  todos {
    description
  }
}
mutation CreatePerson($createPeopleInput2: [PersonCreateInput!]!) {
  createPeople(input: $createPeopleInput2) {
    people {
      name
    }
  }
}
query GetProjects {
  projects {
    name
  }
}
mutation($input: [ProjectCreateInput!]!) {
  createProjects(input: $input) {
    projects {
      name
    }
  }
}

 mutation {
   createTodos(input: [
       {
         status: false
         description: "Todo 1"

      }

   ]){
     todos {
       description
     }
   }
 }


```