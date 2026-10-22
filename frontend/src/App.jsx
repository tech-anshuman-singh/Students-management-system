 
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";
  const API = `${API_BASE_URL.replace(/\/$/, "")}/students`;

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch students from backend
  const getStudents = async () => {
    try {
      const response = await fetch(API);

      if (!response.ok) throw new Error("Failed to load students");

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      setMessage("Cannot connect to backend. Please start your server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  // Add student
  const addStudent = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, course }),
      });

      if (!response.ok) throw new Error("Could not add student");

      setName("");
      setEmail("");
      setCourse("");
      setMessage("Student added successfully!");

      await getStudents();
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Delete student
  const deleteStudent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Could not delete student");

      setStudents((prev) => prev.filter((student) => student._id !== id));
      setMessage("Student deleted successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Search students
  const filteredStudents = students.filter((student) =>
    [student.name, student.email, student.course].some((value) =>
      (value || "").toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="app-container">
      <header className="hero">
        <div className="hero-icon">🎓</div>
        <div>
          <p className="eyebrow">STUDENT PORTAL</p>
          <h1>Student Management</h1>
          <p className="hero-subtitle">
            Manage your students in one place.
          </p>
        </div>
        <div className="total-box">
          <span>Total Students</span>
          <strong>{students.length}</strong>
        </div>
      </header>

      {message && (
        <div className="message" role="status">
          {message}
          <button
            className="message-close"
            onClick={() => setMessage("")}
            aria-label="Close message"
          >
            ×
          </button>
        </div>
      )}

      <section className="form-card">
        <div className="section-heading">
          <div className="heading-icon">＋</div>
          <div>
            <h2 className="a">Add New Student</h2>
            <p>Enter student details below</p>
          </div>
        </div>

        <form onSubmit={addStudent}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="e.g. Anshuman Singh"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="course">Course</label>
              <select
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              >
                <option value="">Select a course</option>
                <option value="B.Tech CSE">B.Tech CSE</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="BBA">BBA</option>
                <option value="MERN Stack">MERN Stack</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <button className="add-button" type="submit">
            <span>＋</span> Add Student
          </button>
        </form>
      </section>

      <section className="directory-section">
        <div className="directory-heading">
          <div>
            <p className="eyebrow purple">YOUR DATABASE</p>
            <h2>Student Directory</h2>
            <p className="directory-subtitle">
              View and manage all registered students.
            </p>
          </div>

          <div className="student-count">
            {filteredStudents.length} students
          </div>
        </div>

        <div className="search-box">
          <span>⌕</span>
          <input
            type="search"
            placeholder="Search by name, email or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search students"
          />
        </div>

        {loading ? (
          <div className="empty-state">
            <div className="empty-icon">⏳</div>
            <h3>Loading students...</h3>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📚</div>
            <h3>No students found</h3>
            <p>Add a new student or try another search.</p>
          </div>
        ) : (
          <div className="student-grid">
            {filteredStudents.map((student, index) => (
              <article className="student-card" key={student._id}>
                <div className="card-top">
                  <div className={`avatar avatar-${index % 5}`}>
                    {(student.name || "S").charAt(0).toUpperCase()}
                  </div>

                  <span className="status-badge">
                    <span className="status-dot"></span>
                    Registered
                  </span>
                </div>

                <h3>{student.name}</h3>
                <p className="student-email">{student.email}</p>

                <div className="course-row">
                  <span className="course-icon">📘</span>
                  <span>{student.course}</span>
                </div>

                <button
                  className="delete-button"
                  onClick={() => deleteStudent(student._id)}
                >
                  <span>⌫</span> Delete Student
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer>
        <span>🎓</span> Student Management System
        <span className="footer-dot">•</span>
        Built with React &amp; MERN
      </footer>
    </div>
  );
}

export default App;
