# Infi Dojo Neo4j for beginners

## What is Neo4j?

Neo4j is a native graph database. It's a No-SQL database which focuses on storing and querying complex relations. It stores the relationships between _nodes_ (objects) on each of these objects. This way Neo4j doesn't have to lookup relationships at query time. This makes it faster to query relations compared to e.g. a SQL-database, which needs to do (indexed) lookups over and over at query time.

The benefits compared to other databases are more noticeable when the data and query complexity increase.

**TODO a small example problem here?**

You can find more detailed information at the Neo4j website: https://neo4j.com/developer/graph-database.

### What will you learn in this dojo?

- You'll learn about basic concepts, such as _nodes_, _Labels_ and _relationships_.
- We'll do some simple queries to get you started with _Cypher_, the query language Neo4j uses.
- After this basic introduction you'll can chose one of the following paths:
  - OR: Build an application in node/C# (**TODO**) with neo4j
  - OR: Dive in the world of algorithms to find more complex relations

### What do we expect from you?

Not much!
explaination

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

- Nodes can be tagged with _labels_, representing their different roles in your domain. (For example, Person).
- Nodes can hold any number of key-value pairs, or properties. (For example, name)
- Node _labels_ may also attach metadata (such as index or constraint information) to certain nodes.

**Relationships**

- Relationships provide directed, named, connections between two node entities (e.g. Person LOVES Person).
- Relationships always have a direction, a type, a start node, and an end node, and they can have properties, just like nodes.
- Nodes can have any number or type of relationships without sacrificing performance.
- Although relationships are always directed, they can be navigated efficiently in any direction.

### The query language: Cypher

The Cypher query language is quite intuitive, as it visually resembles the components of your query.

Nodes are defined by parenthesis `()` and relationships by arrows `-->`

These can get a little more complex later on, but you'll always recognize these two based on their form in the query.

**A simple query**

A very simple query could look like this:

```
MATCH (n1)-->(n2)
RETURN n1, n2
```

This will return all nodes that have a relationship which each other. Fun, but not very useful.

**Query by property**

In the real world you'd probably want to specify things a little bit more.

```
MATCH (n1{id: 7})-->(n2)
Return n2
```

This will return all related nodes for the node with id 7. You can limit your query based on every property or properties a node has. e.g.:

```
MATCH (n1{age: 7, city: Amsterdam})-->(n2)
Return n2
```

**Query by label**

Besides properties, nodes can have labels. These are a bit similar to table names in a sql database. We can use them categorize the different entities in our database. For instance:

```
MATCH (p:Person)-->(b:Book)
RETURN p,b
```

This will return all relationships between persons and books.

**Query by relationship**

We know how to query relationships between certain object now. But we've no clue what the nature of this relationship is. Fortunately we can also specify the type of relationship in our query.

```
MATCH (p:Person)-[:LOVES]->(m:Movie)
RETURN p,m
```

OR

```
MATCH (p:Person)-[:HATES]->(m:Movie)
RETURN p,m
```

**Summary**

All this new syntax might be a bit overwhelming. But it's just syntax, so don't worry! Here's a neat little picture which summerizes the basic elements of cypher query. _Make sure you understand all aspects before you continue_ and feel free to ask us for extra explanation.
![cypher-example](cypher-example.png)

## Try it yourself

Let's get our hands dirty now! Open a new movie db sandbox on [sandbox environment](https://sandbox.neo4j.com/).

This is a simple graph database filled with some example data to get us started.

### 1. How many are there?

Let's explore this database a bit. Can you find out how many movies, actors and reviewers there are in this data-set?

Tip: make use of the labels and relationship types.

### 2. Who acted in The Matrix?

Can you query all the actors that played in The Matrix?

Tip: use the title property on the Movie nodes. When you query all movies and hover over them you'll see the properties at the bottom of the query result.

If you succeeded you might want to find out which other people were involved with The Matrix.

Tip: instead of returning specific variables, you can also use a wildcard: `RETURN *`

### 3. Who's Eddie?

This one is a bit tricky!

Please find out which actor played Eddie and in which movie.

Note that relationships can have properties as well, just as nodes. In this case we need to lookup the roles property (Which is an array by the way! Who's `['Eddie']`?)

### 4. Act like you know how(ard)

Can you find out which actors played in movies directed by Ron Howard?

Tip: `()-[]->()<-[]-()`

## Chapter Two: Recommendations

### 1. Add new reviewers

First find out what properties reviewers have. Note that reviewers are of type Person.

Write a query that:

- Creates 20 new reviewers with a unique name and has 40% chance to create a random rating from each reviewer to a movie. Make sure to add yourself as a reviewer.

  Tip: use `UNWIND` to loop over an array of names `["John Doe", "Jane Doe"]`

  and use `FOREACH(ignoreMe IN CASE WHEN {{your condition}} THEN [1] ELSE [] END | {{your query here}})`

- Has 25% chance to create a :FOLLOWS relationship from each reviewer to another reviewer
- Adds a born property with a random birth year to each reviewer

### 2. Reviewer recommendations: second-degree contacts

Can you write a query that recommends 10 reviewers that are being followed by reviewers that you are following? These are reviewers you might know or might want to get to know. (Your name should be in the database after completing the previous assignment)

Save this query somewhere for later

### 3. Reviewer recommendations: similar movie ratings

Find out which reviewer gives the most similar movie ratings to you. Please return the first 10 results for this one too. You don't have to take the count of reviewed movies into account.

Tip: save this query somewhere for later

### 4. Reviewer recommendations: similar age

Since you completed the other recommendation queries this one shouldn't be too hard. Let's find the first 10 reviewers with an age closest to you.

Tip: save this query somewhere for later

### 5. Movie recommendations: movies that reviewers around your age like

From recommending reviewers to recommending movies. Please find the ten best rated movies for the reviewers that were born closest to your birth year.

### 6. Movie recommendations: best rated movie for the genre you like the best

First add Genre nodes with an `IN_GENRE` relationship to all movie nodes based on the mapping you can find [here](/movie-genres.json).

Then write a query that returns the 10 best rated movies for the genre you like best.

### 7. Recommendations: use a similarity algorithm

Now let's combine the reviewer recommendation queries from above into one monster. Try to write a query that gives you recommended reviewers to start following based on reviewers you know through reviewers you're following, movie ratings and age. Use the [Jaccard similarity](https://neo4j.com/docs/graph-data-science/current/algorithms/similarity-functions/) algorithm.
