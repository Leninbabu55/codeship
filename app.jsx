import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        setForm({
          username: "",
          email: "",
          password: "",
          confirm_password: "",
        });
      } else {
        setError(JSON.stringify(data));
      }
    } catch (error) {
      setError("Unable to connect to Django server");
    }
  };

  return (
    <div className="container">
      <div className="register-box">

        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            value={form.confirm_password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Register
          </button>

        </form>

        {message && (
          <p className="success">{message}</p>
        )}

        {error && (
          <p className="error">{error}</p>
        )}

      </div>
    </div>
  );
}

export default App;
