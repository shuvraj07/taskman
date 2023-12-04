// Import the mysql package
const mysql = require('mysql');

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: 'your_database_host',
  user: 'your_database_user',
  password: 'your_database_password',
  database: 'your_database_name',
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Perform a simple query
connection.query('SELECT * FROM your_table_name', (err, results) => {
  if (err) {
    console.error('Error executing MySQL query:', err);
    return;
  }
  console.log('Query results:', results);

  // Close the connection when done
  connection.end();
});
