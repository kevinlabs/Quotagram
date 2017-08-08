INSERT INTO quote_table (quotes, author)
VALUES ($1, $2)
RETURNING *;