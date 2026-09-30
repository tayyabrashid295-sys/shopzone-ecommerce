import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        form
      );

      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);

      if (!error.response) {
        alert("Server se connection nahi ho raha. Backend chalayen.");
      } else {
        alert(error.response.data?.message || "Registration failed");
      }
    }
  };

  return (
    <div className="auth">
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password (kam az kam 6 characters)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          minLength={6}
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;