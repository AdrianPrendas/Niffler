import React, { Component } from "react";
import swal from "sweetalert";

import "css/gateway.css";

class Gateway extends Component {
  state = {
    register: {},
    login: {}
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.state.register.name = document.getElementById("name-register");
    this.state.register.email = document.getElementById("email-register");
    this.state.register.password = document.getElementById("password-register");
    this.state.login.email = document.getElementById("email-login");
    this.state.login.password = document.getElementById("password-login");
  }

  register = event => {
    event.preventDefault();
    let { email, name, password } = this.state.register;

    let user = {
      email: email.value,
      name: name.value,
      password: password.value
    };

    fetch("http://localhost:8000/api/register", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(json => {
        swal({
          title: "Success",
          text: `${
            json.user.name
          } is registerd successfully, now you can login`,
          icon: "success"
        });
        email.value = "";
        name.value = "";
        password.value = "";
      })
      .catch(err => {
        swal({
          title: "Oops",
          text: `The user: ${user.name} has not registerd`,
          icon: "warning",
          dangerMode: true
        });
      });
  };

  login = event => {
    event.preventDefault();

    let { email, password } = this.state.login;

    let user = {
      email: email.value,
      password: password.value
    };

    fetch("http://localhost:8000/api/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(user)
    })
      .then(res => {
        //console.log("res.status: ", res.status);
        switch (res.status) {
          case 200:
            return res.json();
          case 404:
            throw res.json();
          default:
            return `res.status: ${res.status} withou controller`;
        }
      })
      .then(json => {
        let { user } = json;
        //console.log("user: ", user);
        let { email, password } = this.state.login;
        user.password = password.value;
        user["gethash"] = true;

        fetch("http://localhost:8000/api/login", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(user)
        })
          .then(res => {
            //console.log("res.status: ", res.status);
            switch (res.status) {
              case 200:
                return res.json();
              case 404:
                throw res.json();
              default:
                return `res.status: ${res.status} withou controller`;
            }
          })
          .then(json => {
            //console.log("token: ", json);
            delete user.password;
            delete user.gethash;
            delete user.__v;
            user["token"] = json.token;
            swal("Response!", "you are in!", "success");
            localStorage.setItem("user", JSON.stringify(user));
            this.props.updateUserHandle(user);
          });
      })
      .catch(err => {
        err.then(data => {
          //console.log("data.message: ", data.message);
          swal({ title: "warning", text: data.message, icon: "warning" });
        });
      });
  };

  render() {
    return (
      <div style={{ position: "relative", top: 30 }}>
        <center>
          <div className="gateway">
            <h2>Rister</h2>
            <form onSubmit={this.register}>
              <input
                type="text"
                name="name"
                id="name-register"
                placeholder="Enter your name"
                required
              />
              <br />
              <input
                type="email"
                name="email"
                id="email-register"
                placeholder="Enter your email"
                required
              />
              <br />
              <input
                type="password"
                name="password"
                id="password-register"
                placeholder="Enter your password"
                required
              />
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>
          <hr />
          <div className="gateway">
            <h2>Login</h2>
            <form onSubmit={this.login}>
              <input
                type="email"
                name="email"
                id="email-login"
                placeholder="Enter your email"
              />
              <br />
              <input
                type="password"
                name="password"
                id="password-login"
                placeholder="Enter your password"
              />
              <br />
              <button type="submit" className="btn btn-success">
                Login
              </button>
            </form>
          </div>
        </center>
      </div>
    );
  }
}

export default Gateway;
