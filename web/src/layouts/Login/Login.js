import React, { Component } from "react";
import "./Auth.scss";
import ErrorBar from "../../components/ErrorBar";

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { loginUser, values } = this.props;
    if (values && values.email && values.password) {
      loginUser(values.email, values.password);
    }
  };

  render() {
    const { submitting, pristine, invalid } = this.props;
    return (
      <div className="AuthPage">
        <ErrorBar />
        <div className="AuthForm">
          <div className="AuthForm__header">
            <img
              className="AuthFrom__icon"
              src="https://uploads-ssl.webflow.com/5fe114d1a2723851f578ebb9/6024050efd63c5f9fd979774_dcp_logo_versions-02.png"
            />
            <h1>DCP Vision</h1>
          </div>
          <form className="AuthForm__form" onSubmit={this.handleSubmit}>
            <div className="AuthForm__field AuthForm__phone">
              <label className="AuthForm__label" htmlFor="email">
                Email address
              </label>
              {/*TODO*/}
              {/*<Field name="email" component="input" />*/}
            </div>
            <div className="AuthForm__field AuthForm__password">
              <label className="AuthForm__label" htmlFor="password">
                Password
              </label>
              {/*TODO*/}
              {/*<Field name="password" component="input" type="password" />*/}
            </div>
            <div className="AuthForm__buttons">
              <button
                id="login"
                type="submit"
                value="Login"
                disabled={submitting || pristine || invalid}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
