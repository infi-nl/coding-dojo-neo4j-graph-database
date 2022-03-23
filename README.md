# Infi Dojo Neo4j for beginners

## What is Neo4j?
Neo4j is a native graph database. It's a No-SQL database which focuses on storing and querying complex relations. It stores the relationships between *nodes* (objects) on each of these objects. This way Neo4j doesn't have to lookup relationships at query time. This makes it faster to query relations compared to e.g. a SQL-database, which needs to do (indexed) lookups over and over at query time.

The benefits compared to other databases are more noticeable when the data and query complexity increase.

**TODO a small example problem here?**

You can find more detailed information at the Neo4j website: https://neo4j.com/developer/graph-database.


### What will you learn in this dojo?
- You'll learn about basic concepts, such as *nodes*, *Labels* and *relationships*.
- We'll do some simple queries to get you started with *Cypher*, the query language Neo4j uses.
- After this basic introduction you'll can chose one of the following paths:	
	- OR: Build an application in node/C# (**TODO**) with neo4j
	- OR: Dive in the world of algorithms to find more complex relations
	
### What do we expect from you?
Not much! 

- But at least a basic understanding about databases.
- Make sure you've a Neo4j account so you can use the free [sandbox environment](https://sandbox.neo4j.com/)
- If you want to get started with building a node/C# you'll need an environment (**TODO**).
- We'd also love to hear your opinion on the subject during this evening.


### What can you expect from us?
- For starters pizza, beer and other drinks.
- A casual environment where learning and programming is a core theme;
- We're by no means experts on the subject, but we've done some research in order to give you this dojo. We'd like to share our thoughts and experiences with you.


## Chapter one: Basic concepts and queries

### Neo4j's basic components
Graph databases have no concepts of tables, records or foreign keys. Instead labels, nodes and relationships are uses which resemble these concepts somewhat. Let's take a look at them:

**Nodes**
  
  Nodes are the entities in the graph.
- Nodes can be tagged with *labels*, representing their different roles in your domain. (For example, Person).
- Nodes can hold any number of key-value pairs, or properties. (For example, name)
- Node *labels* may also attach metadata (such as index or constraint information) to certain nodes.

**Relationships**

- Relationships provide directed, named, connections between two node entities (e.g. Person LOVES Person).
- Relationships always have a direction, a type, a start node, and an end node, and they can have properties, just like nodes.
- Nodes can have any number or type of relationships without sacrificing performance.
- Although relationships are always directed, they can be navigated efficiently in any direction.

### The query language: Cypher
The Cypher query language is quite intuitive, as it visually resembles the components of your query.

Nodes are defined by parenthesis `()` and relationships by arrows `-->`

These can get a little more complex later on, but you'll always recognize these two based on their form in the query.

A very simple query could look like this:  
```
MATCH (n1)-->(n2)
RETURN n1, n2  
```
This will return all nodes that have a relationship which each other. Fun, but not verry useful.
In the real world you'd probably want to specify things a little bit more.

TODO query with properties.

TODO query with properties and labels

TODO overview  
![cypher-example](cypher-example.png)

### Try it yourself
Open the sandbox

TODO assignments
