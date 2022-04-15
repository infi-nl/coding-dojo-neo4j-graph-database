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
