import "./App.css";
import { useState } from "react";

const jobs = [
  {
    title: "Frontend Developer",
    company: "Tech Solutions",
    location: "Bhubaneswar",
    type: "Full Time",
    salary: "₹4 - 6 LPA",
    description:
      "We are looking for a Frontend Developer with knowledge of HTML, CSS, JavaScript and React.",
  },
  {
    title: "Python Developer",
    company: "CodeWorks",
    location: "Bangalore",
    type: "Full Time",
    salary: "₹5 - 8 LPA",
    description:
      "Work on Python applications and develop backend services and APIs.",
  },
  {
    title: "Cyber Security Analyst",
    company: "SecureTech",
    location: "Hyderabad",
    type: "Full Time",
    salary: "₹5 - 9 LPA",
    description:
      "Monitor security threats, analyze vulnerabilities and help protect company systems.",
  },
  {
    title: "React Developer",
    company: "WebWorld",
    location: "Pune",
    type: "Remote",
    salary: "₹6 - 10 LPA",
    description:
      "Build modern and responsive web applications using React.js.",
  },
    {
    title: "AI / ML Engineer",
    company: "AI Solutions",
    location: "Bhubaneswar",
    type: "Full Time",
    salary: "₹6 - 10 LPA",
    description:
      "Work on machine learning models and AI-based applications.",
  },

  {
    title: "Data Scientist",
    company: "DataWorks",
    location: "Bangalore",
    type: "Full Time",
    salary: "₹7 - 12 LPA",
    description:
      "Analyze data and build data-driven solutions using Python and machine learning.",
  },
];

function App() {
  // Search
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [submittedLocation, setSubmittedLocation] = useState("");

  // Job details
  const [selectedJob, setSelectedJob] = useState(null);

  // Application
  const [showForm, setShowForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Login
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Register
  const [showRegister, setShowRegister] = useState(false);

  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Login input
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Registered account
  const [registeredName, setRegisteredName] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [registeredPassword, setRegisteredPassword] = useState("");

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
  const searchText = submittedSearch
    .toLowerCase()
    .replace(/\s+/g, "")
    .trim();

  const title = job.title.toLowerCase().replace(/\s+/g, "");
  const company = job.company.toLowerCase().replace(/\s+/g, "");

  const matchesSearch =
    title.includes(searchText) ||
    company.includes(searchText) ||
    (searchText.includes("aiml") && title.includes("aiml")) ||
    (searchText.includes("datascience") && title.includes("datascientist"));

  const matchesLocation = job.location
    .toLowerCase()
    .includes(submittedLocation.toLowerCase());

  return matchesSearch && matchesLocation;
});

  // Search
  const handleSearch = () => {
    setSubmittedSearch(search);
    setSubmittedLocation(location);
  };

  const handleClearSearch = () => {
  setSearch("");
  setLocation("");
  setSubmittedSearch("");
  setSubmittedLocation("");
};

  // View job
  const handleViewJob = (job) => {
    setSelectedJob(job);
    setShowForm(false);
    setApplicationSubmitted(false);
  };

  // Close job
  const handleCloseJob = () => {
    setSelectedJob(null);
    setShowForm(false);
    setApplicationSubmitted(false);
  };

  // Submit application
  const handleSubmitApplication = (e) => {
    e.preventDefault();

    const name = e.target.elements[0].value;
    const email = e.target.elements[1].value;
    const phone = e.target.elements[2].value;
    const message = e.target.elements[3].value;

    if (!name || !email || !phone || !message) {
      alert("Please fill all fields!");
      return;
    }

    if (phone.length < 10) {
      alert("Please enter a valid phone number!");
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
  alert("Please enter a valid 10-digit phone number!");
  return;
}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  alert("Please enter a valid email address!");
  return;
}

    setApplicationSubmitted(true);
  };

  return (
    <div className="app">

      {/* ================= NAVBAR ================= */}
      <nav className="navbar">

        <div className="logo" id="home">JobFinder</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#jobs">Jobs</a>
         <a href="#companies">Companies</a>
          <a href="#about">About</a>
        </div>

        <button
          className="login-btn"
          onClick={() => {
            if (loggedIn) {
              setLoggedIn(false);
              setLoginEmail("");
              setLoginPassword("");
              alert("Logged out successfully!");
            } else {
              setShowLogin(true);
              setShowRegister(false);
            }
          }}
        >
         {loggedIn ? `Welcome, ${registeredName}` : "Login"}
        </button>

      </nav>


      {/* ================= HERO ================= */}
      <section className="hero">

        <h1>
          Find Your Dream Job
        </h1>

        <p>
          Search thousands of jobs and find the right opportunity
          for your career.
        </p>

        <div className="search-box">

          <input
            type="text"
            placeholder="Job title, skills or keywords"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button onClick={handleSearch}>
            Search Jobs
          </button>
          <button onClick={handleClearSearch}>
          Clear Search
          </button>

        </div>

      </section>


      {/* ================= LATEST JOBS ================= */}
      <section className="jobs-section" id="jobs">

        <h2>
          Latest Jobs
        </h2>

         <div className="jobs-container">

  {filteredJobs.length > 0 ? (

    filteredJobs.map((job, index) => (

      <div
        className="job-card"
        key={index}
      >

        <h3>
          {job.title}
        </h3>

        <p>
          🏢 {job.company}
        </p>

        <p>
          📍 {job.location}
        </p>

        <p>
  💰 {job.salary}
         </p>

        <span>
          {job.type}
        </span>

        <button
          className="apply-btn"
          onClick={() => handleViewJob(job)}
        >
          View Job
        </button>

      </div>

    ))

  ) : (

    <p className="no-jobs">
      No jobs found. Try a different search.
    </p>

  )}

</div>
      </section>


      {/* ================= JOB DETAILS ================= */}
      {selectedJob && (

        <section className="job-details-section">

          <div className="job-details">

            <h2>
              {selectedJob.title}
            </h2>

            <p>
              <strong>Company:</strong>{" "}
              {selectedJob.company}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {selectedJob.location}
            </p>

            <p>
              <strong>Job Type:</strong>{" "}
              {selectedJob.type}
            </p>

            <p>
              <strong>Salary:</strong>{" "}
              {selectedJob.salary}
            </p>

            <h3>
              Job Description
            </h3>

            <p>
              {selectedJob.description}
            </p>


            {/* APPLY / CLOSE */}
            {!showForm && !applicationSubmitted && (

              <div>

                <button
                  className="apply-now-btn"
                  onClick={() => {
                    if (!loggedIn) {
                      alert("Please login first!");
                      setShowLogin(true);
                      return;
                    }

                    setShowForm(true);
                  }}
                >
                  Apply Now
                </button>

                <button
                  className="close-btn"
                  onClick={handleCloseJob}
                >
                  Close
                </button>

              </div>

            )}


            {/* ================= APPLICATION FORM ================= */}
            {showForm && !applicationSubmitted && (

              <div className="application-form">

                <h3>
                  Apply for {selectedJob.title}
                </h3>

                <form onSubmit={handleSubmitApplication}>

                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    required
                  />

                  <input
                     type="file"
                      accept=".pdf,.doc,.docx"
                       required
                     />

                  <textarea
                    placeholder="Why should we hire you?"
                    rows="5"
                    required
                  ></textarea>

                  <button
                    type="submit"
                    className="submit-btn"
                  >
                    Submit Application
                  </button>

                  <button
                    type="button"
                    className="close-btn"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>

                </form>

              </div>

            )}


            {/* ================= SUCCESS MESSAGE ================= */}
            {applicationSubmitted && (

              <div className="success-message">

                <h3>
                  🎉 Application Submitted!
                </h3>

                <p>
                  Your application for{" "}
                  <strong>
                    {selectedJob.title}
                  </strong>{" "}
                  has been submitted successfully.
                </p>

                <button
                  className="close-btn"
                  onClick={handleCloseJob}
                >
                  Close
                </button>

              </div>

            )}

          </div>

        </section>

      )}


      {/* ================= CATEGORIES ================= */}
      <section className="popular">

        <h2>
          Popular Job Categories
        </h2>

        <div className="categories">

          <div
            className="category"
            onClick={() => {
              setSearch("Developer");
              setSubmittedSearch("Developer");
              setSubmittedLocation("");
            }}
          >
            💻 Software Developer
          </div>

          <div
            className="category"
            onClick={() => {
              setSearch("Cyber Security");
              setSubmittedSearch("Cyber Security");
              setSubmittedLocation("");
            }}
          >
            🛡️ Cyber Security
          </div>

          <div
            className="category"
            onClick={() => {
              setSearch("AI");
              setSubmittedSearch("AI");
              setSubmittedLocation("");
            }}
          >
            🤖 AI / ML
          </div>

          <div
            className="category"
            onClick={() => {
              setSearch("Data");
              setSubmittedSearch("Data");
              setSubmittedLocation("");
            }}
          >
            📊 Data Science
          </div>

        </div>

      </section>
       {/* ================= Companies ================= */}

       <section className="companies-section" id="companies">
  <h2>Top Companies</h2>

  <div className="companies-container">
    <div className="company-card">
      <h3>Tech Solutions</h3>
      <p>Technology & Software</p>
    </div>

    <div className="company-card">
      <h3>CodeWorks</h3>
      <p>Software Development</p>
    </div>

    <div className="company-card">
      <h3>SecureTech</h3>
      <p>Cyber Security</p>
    </div>

    <div className="company-card">
      <h3>WebWorld</h3>
      <p>Web Development</p>
    </div>
  </div>
</section>
        {/* ================= About ================= */}
      <section className="about-section" id="about">
  <h2>About JobFinder</h2>
  <p>
    JobFinder is a simple job search platform that helps users find
    suitable job opportunities based on their skills and location.
  </p>
</section>

      {/* ================= LOGIN FORM ================= */}
      {showLogin && (

        <section className="login-section">

          <div className="login-form">

            <h2>
              Login to JobFinder
            </h2>

            <input
              type="email"
              placeholder="Email Address"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            <button
              className="login-submit-btn"
              onClick={() => {

                if (
                  loginEmail === registeredEmail &&
                  loginPassword === registeredPassword
                ) {
                  setLoggedIn(true);
                  setShowLogin(false);
                  alert("Login successful!");
                } else {
                  alert("Invalid email or password!");
                }

              }}
            >
              Login
            </button>

            <button
              className="login-cancel-btn"
              onClick={() => setShowLogin(false)}
            >
              Cancel
            </button>

            <p>
              Don't have an account?{" "}

              <strong
                onClick={() => {
                  setShowLogin(false);
                  setShowRegister(true);
                }}
                style={{
                  cursor: "pointer",
                  color: "#2563eb"
                }}
              >
                Register
              </strong>

            </p>

          </div>

        </section>

      )}


      {/* ================= REGISTER FORM ================= */}
      {showRegister && (

        <section className="login-section">

          <div className="login-form">

            <h2>
              Create JobFinder Account
            </h2>

            <input
              type="text"
              placeholder="Full Name"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              className="login-submit-btn"
              onClick={() => {

                if (registerPassword !== confirmPassword) {
                  alert("Passwords do not match!");
                  return;
                }

                if (
                  registerName === "" ||
                  registerEmail === "" ||
                  registerPassword === ""
                ) {
                  alert("Please fill all fields!");
                  return;
                }
                setRegisteredName(registerName);
                setRegisteredEmail(registerEmail);
                setRegisteredPassword(registerPassword);

              
              setLoginEmail(registerEmail);
              setLoginPassword(registerPassword);

               alert("Registration successful!");

              setShowRegister(false);
              setShowLogin(true);
              }}
            >
              Register
            </button>

            <button
              className="login-cancel-btn"
              onClick={() => setShowRegister(false)}
            >
              Cancel
            </button>

            <p>
              Already have an account?{" "}

              <strong
                onClick={() => {
                  setShowRegister(false);
                  setShowLogin(true);
                }}
                style={{
                  cursor: "pointer",
                  color: "#2563eb"
                }}
              >
                Login
              </strong>

            </p>

          </div>

        </section>

      )}

    </div>
  );
}

export default App;