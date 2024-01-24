SELECT * FROM marvel WHERE Align LIKE 'Good Characters'
SELECT * FROM marvel WHERE Eye LIKE 'Brown%' AND Hair LIKE 'Brown%'
SELECT * FROM marvel WHERE Sex LIKE 'Male%' AND Alive LIKE 'Living%'
SELECT * FROM marvel WHERE ID Like 'Public Identity' AND Apparences > 100
SELECT * FROM marvel WHERE Year BETWEEN 1960 AND 1969
SELECT * FROM marvel WHERE Align NOT LIKE 'Neutral %'
SELECT * FROM marvel WHERE GSM LIKE ''
SELECT * FROM marvel WHERE Alive LIKE "Living%" AND Apparences < 51
SELECT * FROM marvel WHERE Eye NOT IN ('Blue Eyes', 'Brown Eyes')
SELECT * FROM marvel WHERE Apparences BETWEEN 51 AND 99
SELECT * FROM marvel WHERE Sex LIKE 'Female%' AND Alive LIKE "Deceased%"
SELECT * FROM marvel WHERE Year LIKE '2%'
