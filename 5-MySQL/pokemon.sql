SELECT * FROM pokemon
SELECT Name, Type1, Type2 FROM pokemon
SELECT * FROM pokemon WHERE Type1 LIKE 'Fire' OR Type2 LIKE 'Fire'
SELECT * FROM pokemon WHERE Speed > 90
SELECT * FROM pokemon ORDER BY Total DESC
SELECT * FROM pokemon WHERE Legendary LIKE 'True'
SELECT Name, Type1, Type2 FROM pokemon WHERE Generation = 2
SELECT * FROM pokemon WHERE Defense > 70 AND (Type1 LIKE 'Grass' OR Type2 Like 'Grass')
SELECT * FROM pokemon WHERE Attack BETWEEN 50 AND 70
SELECT Count(*) as cantidad FROM pokemon 
SELECT Avg(Total) FROM pokemon
SELECT * FROM pokemon WHERE (Type1 LIKE 'Water' OR Type2 LIKE 'Water') AND Total > 400
SELECT Name, Type1, Type2 FROM pokemon WHERE Name LIKE 'C%'
SELECT * FROM pokemon WHERE Generation = 3 AND Legendary LIKE 'False'
SELECT * FROM pokemon WHERE Name LIKE '%Mega%'


