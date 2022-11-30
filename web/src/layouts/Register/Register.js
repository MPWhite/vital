import React, { Component } from "react";
import "../Login/Auth.scss";
import { DropdownList } from "react-widgets";
import "react-widgets/dist/css/react-widgets.css";
import ErrorBar from "../../components/ErrorBar";

const required = (value) => (value ? undefined : "Required");

const renderDropdownList = ({ input, data, valueField, textField }) => (
  <DropdownList
    {...input}
    className="TimeZoneDropdown"
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange}
  />
);

class Register extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { registerUser, values } = this.props;
    if (values && values.email && values.password && values.signup_token) {
      registerUser(values.email, values.password, values.signup_token);
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
          <p>Register for an account</p>
          <form className="AuthForm__form" onSubmit={this.handleSubmit}>
            <div className="AuthForm__field">
              <label className="AuthForm__label" htmlFor="email">
                Email
              </label>
              {/*TODO*/}
              {/*<Field name="email" component="input" />*/}
            </div>
            <div className="AuthForm__field">
              <label className="AuthForm__label" htmlFor="password">
                Password
              </label>
              {/*TODO*/}
              {/*<Field*/}
              {/*  name="password"*/}
              {/*  component="input"*/}
              {/*  type="password"*/}
              {/*  validate={[required]}*/}
              {/*/>*/}
            </div>
            <div className="AuthForm__field">
              <label className="AuthForm__label" htmlFor="name">
                Signup Token
              </label>
              {/*TODO*/}
              {/*<Field*/}
              {/*  name="signup_token"*/}
              {/*  component="input"*/}
              {/*  type="text"*/}
              {/*  validate={[required]}*/}
              {/*/>*/}
            </div>
            <div className="AuthForm__buttons">
              <button
                id="login"
                type="submit"
                disabled={submitting || pristine || invalid}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
