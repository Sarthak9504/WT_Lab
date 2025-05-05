import React, { useState } from "react";

function App() {
  const [studentQuery, setStudentQuery] = useState("");
  const [marksData, setMarksData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getStudentResults = async () => {
    if (!studentQuery.trim()) return alert("Please enter a name to search.");
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3001/fetchmarks?studname=${encodeURIComponent(
          studentQuery
        )}`
      );
      const result = await res.json();
      setMarksData(result);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Unable to fetch data. Check backend connection.");
    }
    setIsLoading(false);
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="text-primary">VIT Exam Result Portal</h1>
        <p className="text-muted">Check your semester marks by student name</p>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by Student Name"
              value={studentQuery}
              onChange={(e) => setStudentQuery(e.target.value)}
            />
            <button className="btn btn-success" onClick={getStudentResults}>
              {isLoading ? "Loading..." : "View Result"}
            </button>
          </div>
        </div>
      </div>

      {marksData.length > 0 && (
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow">
              <div className="card-body">
                <h4 className="card-title">
                  Result for <strong>{studentQuery}</strong>
                </h4>
                <table className="table table-hover mt-3">
                  <thead className="table-primary">
                    <tr>
                      <th>Student Name</th>
                      <th>Roll No</th>
                      <th>CN (MSE/ESE)</th>
                      <th>CS (MSE/ESE)</th>
                      <th>WT (MSE/ESE)</th>
                      <th>OS (MSE/ESE)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marksData.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.student_name}</td>
                        <td>{entry.roll_no}</td>
                        <td>{entry.cn_mse} / {entry.cn_ese}</td>
                        <td>{entry.cs_mse} / {entry.cs_ese}</td>
                        <td>{entry.wt_mse} / {entry.wt_ese}</td>
                        <td>{entry.os_mse} / {entry.os_ese}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && marksData.length === 0 && (
        <div className="text-center text-muted mt-4">
          <p>Enter a student name and click 'View Result' to begin.</p>
        </div>
      )}
    </div>
  );
}

export default App;
