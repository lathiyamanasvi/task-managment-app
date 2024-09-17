import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextField, Button, Container } from "@mui/material";
import { toast } from "react-toastify";

function Login() {
  const [record, setRecord] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    const { username, password } = record;
    const userdata = JSON.parse(localStorage.getItem(username));

    if (userdata && userdata.password === password) {
      toast.success("Login successful!");
      navigate("/tasks");
    } else {
      toast.error("User not identified!");
      navigate("/register")
    }
  };

  return (

    <div class="container">
      <div class="wrapper d-flex align-items-center justify-content-center h-100" style={{ paddingTop: "100px" }}>
        <div class="card login-form ">
          <div class="card-body">
            <h5 class="card-title text-center">Login Form</h5>
            <form className="login">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Username</label>
                <input type="email" class="form-control" id="exampleInputEmail1"
                  value={record.username}
                  onChange={(e) => setRecord({ ...record, username: e.target.value })} />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleInputPassword1" value={record.password} onChange={(e) => setRecord({ ...record, password: e.target.value })} />
              </div>
              <button type="submit" class="btn btn-primary w-100" variant="contained" onClick={handleLogin}>Submit</button>
              <div class="sign-up mt-4">
                Don't have an account? <Link to={'/'}><a href="#">Create One</a></Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
