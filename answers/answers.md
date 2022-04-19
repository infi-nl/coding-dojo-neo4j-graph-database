## Chapter Two: Recommendations

### 1. Add new reviewers

```
MATCH (m:Movie)
UNWIND ["Dave Mollen","Ken Chambers","Della Peterson","Norma Harper","Tyrone Butler","Sam Stewart","Christina Waters","Edwin Warren","Meredith Moran","Jo Porter","Santiago Erickson","Darryl Gonzalez","Tabitha Goodman","Wilbert Clayton","Troy Allen","Bill Barker","Sherman Pena","Nicolas Reynolds","Brittany Grant","Juan Welch"] as name
MERGE (p1:Person {name:name})
FOREACH(ignoreMe IN CASE WHEN (rand() > 0.6) THEN [1] ELSE [] END |
    MERGE (p1)-[:REVIEWED {rating: toInteger(rand()*100)}]->(m)
)
RETURN p1,m
```

```
MATCH (p1:Person)-[:REVIEWED]->(:Movie)<-[:REVIEWED]-(p2:Person)
WITH DISTINCT p1,p2
FOREACH(ignoreMe IN CASE WHEN (rand() > 0.5) THEN [1] ELSE [] END |
    MERGE (p1)-[:FOLLOWS]->(p2)
)
RETURN *
```

```
MATCH (p:Person)-[:REVIEWED]->(m:Movie)
SET p.born = toInteger(rand() * 50) + 1950
RETURN *
```

### 2. Reviewer recommendations: second-degree contacts

```
MATCH (p1:Person {name: "Dave Mollen"})-[:FOLLOWS]->(p2:Person)<-[:FOLLOWS]-(p3:Person)
RETURN p3
LIMIT 10
```

### 3. Reviewer recommendations: similar movie ratings

```
MATCH (p1:Person {name:"Dave Mollen"})-[r1:REVIEWED]->(m:Movie)<-[r2:REVIEWED]-(p2:Person)
RETURN p2.name,avg(abs(r1.rating - r2.rating)) as similarity
ORDER BY similarity ASC
LIMIT 5
```

### 4. Reviewer recommendations: similar age

```
MATCH (p1:Person {name:"Dave Mollen"})-[:REVIEWED]->(:Movie)<-[:REVIEWED]-(p2:Person)
RETURN p2
ORDER BY abs(p1.born-p2.born) ASC
LIMIT 10
```

### 5. Movie recommendations: movies that reviewers around your age like

```
MATCH (p1:Person {name:"Dave Mollen"})-[:REVIEWED]->(:Movie)<-[:REVIEWED]-(p2:Person)
WITH p2
ORDER BY abs(p1.born-p2.born) ASC
LIMIT 10
MATCH (p2)-[r:REVIEWED]->(m:Movie)
RETURN m.title, avg(r.rating) as rating
ORDER BY rating DESC
LIMIT 10
```

### 6. Movie recommendations: best rated movie for the genre you like the best

```
MATCH (p1:Person {name: "Dave Mollen"})-[r1:REVIEWED]->(m1:Movie)-[:IN_GENRE]->(g:GENRE)
WITH p1,g,sum(r1.rating) / sqrt(count(m1)) as genreRating
ORDER BY genreRating DESC
LIMIT 1

MATCH (p2:Person)-[r2:REVIEWED]->(m2:Movie)-[:IN_GENRE]->(g)
WHERE p1.name <> p2.name
WITH m2,avg(r2.rating) as rating
ORDER BY rating DESC
LIMIT 10
RETURN m2.title,rating
```

### 7. Recommendations: Pearson algorithm

```
MATCH (p1:User {name: 'Cynthia Freeman'})-[r1:RATED]->(movie)<-[r2:RATED]-(p2:User)
WHERE p1.name <> p2.name
WITH p1, p2, collect(r1.rating) AS p1Ratings, collect(r2.rating) AS p2Ratings
WHERE size(p1Ratings) > 10
RETURN p1.name AS from,
       p2.name AS to,
       gds.similarity.pearson(p1Ratings, p2Ratings) AS similarity
ORDER BY similarity DESC
```

### 8. Recommendations: Similar movies based on multiple criteria

```
MATCH (m1:Movie {title: "Matrix, The"})
MATCH (m2:Movie)
WHERE m1.title <> m2.title
RETURN m1.title AS from, m2.title AS to, gds.similarity.euclideanDistance(m1.scaledProperties, m2.scaledProperties) AS similarity
ORDER BY similarity ASC
LIMIT 10
```
