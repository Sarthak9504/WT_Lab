const http = require("http");
const mysql = require("mysql2");

const DB_CONFIG = {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "MYSQL@Sarthak",
    database: "vit_results",
};

const fetchStudentMarks = (studentName, callback) => {
    const db = mysql.createConnection(DB_CONFIG);

    db.connect((err) => {
        if (err) {
            console.error("Database connection failed:", err);
            return callback(err);
        }

        const query = "SELECT * FROM student_marks WHERE student_name = ?";
        db.query(query, [studentName], (err, rows) => {
            db.end(); // Close connection after query
            if (err) {
                console.error("Query error:", err);
                return callback(err);
            }
            callback(null, rows);
        });
    });
};

const requestHandler = (req, res) => {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);
    const route = reqUrl.pathname;
    const studentParam = reqUrl.searchParams.get("studname");

    if (route === "/fetchmarks" && studentParam) {
        fetchStudentMarks(studentParam, (err, data) => {
            res.statusCode = err ? 500 : 200;
            res.setHeader("Content-Type", "application/json");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(err ? JSON.stringify({ error: "Failed to fetch data" }) : JSON.stringify(data));
        });
    } else {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Route not found or missing parameter" }));
    }
};

const PORT = 3001;
const server = http.createServer(requestHandler);

server.listen(PORT, () => {
    console.log(`Result API server running at http://localhost:${PORT}`);
});
