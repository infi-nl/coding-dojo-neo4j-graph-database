### 1. How many are there?

```
MATCH (actors:Person)-[:ACTED_IN]->(movies:Movie)
RETURN count(DISTINCT actors)
```

### 2. Who acted in The Matrix?

```
MATCH (a:Person)-[:ACTED_IN]->(m:Movie {title: "The Matrix"})
RETURN a.name
```

### 3. Who's Eddie?

```
MATCH (a:Person)-[r:ACTED_IN]->(m:Movie)
WHERE r.roles = ['Eddie']
RETURN a.name
```

### 4. Act like you know how(ard)

```
MATCH (a:Person)-[:ACTED_IN]->(m:Movie)<-[:DIRECTED]-(d:Person {name: "Ron Howard"}) RETURN DISTINCT a
```

### 5. CrUD

```
MATCH (m:Movie {title: "Django Unchained"})
CREATE (p:Person {name: "Quentin Tarantino"})-[:DIRECTED]->(m)
RETURN m,p
```

```
MATCH (m:Movie {title: "Django Unchained"})
SET m.tagline = 'Life, liberty and the pursuit of vengeance.'
RETURN m
```

```
MATCH (m:Movie {title: "Django Unchained"})
MATCH (a:Person {name: "Keanu Reeves"})
MERGE (a)-[:ACTED_IN]->(m)
RETURN a,m
```

```
MATCH (a:Person {name: "Keanu Reeves"})-[r:ACTED_IN]->(m:Movie {title: "Django Unchained"})
DELETE r
RETURN a,m
```

```
MATCH (m:Movie {title: "Django Unchained"}) DETACH DELETE m
```

### 7. Reviewer recommendations: second-degree contacts

```
MATCH (p1:Person {name: "Norma Harper"})-[:FOLLOWS]->(p2:Person)<-[:FOLLOWS]-(p3:Person)
WHERE NOT (p1)-[:FOLLOWS]->(p3)
RETURN p3
LIMIT 10
```

### 8. Reviewer recommendations: similar age

```
MATCH (p1:Person {name:"Norma Harper"})-[:REVIEWED]->(:Movie)<-[:REVIEWED]-(p2:Person)
RETURN p2
ORDER BY abs(p1.born-p2.born) ASC
LIMIT 10
```

### 9. Reviewer recommendations: similar movie ratings

```
MATCH (p1:Person {name:"Norma Harper"})-[r1:REVIEWED]->(m:Movie)<-[r2:REVIEWED]-(p2:Person)
RETURN p2.name,avg(abs(r1.rating - r2.rating)) as similarity
ORDER BY similarity ASC
LIMIT 5
```

### 10. Movie recommendations: movies that reviewers around your age like

```
MATCH (p1:Person {name:"Norma Harper"})-[:REVIEWED]->(:Movie)<-[:REVIEWED]-(p2:Person)
WITH p2
ORDER BY abs(p1.born-p2.born) ASC
LIMIT 10
MATCH (p2)-[r:REVIEWED]->(m:Movie)
RETURN m.title, avg(r.rating) as rating
ORDER BY rating DESC
LIMIT 10
```

### 11. Movie recommendations: best rated movie for the genre you like the best

```
MATCH (p1:Person {name: "Norma Harper"})-[r1:REVIEWED]->(m1:Movie)-[:IN_GENRE]->(g:Genre)
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

### 12. Recommendations: Pearson algorithm

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

### 13. Recommendations: Similar movies based on multiple criteria

```
MATCH (m1:Movie {title: "Matrix, The"})
MATCH (m2:Movie)
WHERE m1.title <> m2.title
RETURN m1.title AS from, m2.title AS to, gds.similarity.euclideanDistance(m1.scaledProperties, m2.scaledProperties) AS similarity
ORDER BY similarity ASC
LIMIT 10
```
