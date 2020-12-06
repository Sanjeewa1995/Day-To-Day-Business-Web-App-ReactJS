import { Button, CircularProgress, Grid, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

import classes from "./Login.module.css";

class Login extends Component {
  state = {
    loginForm: {
      email: {
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: true,
      },
      password: {
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: true,
      },
    },
    formIsValid: false,
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedLoginForm = {
      ...this.state.loginForm,
    };
    const updatedFormElement = {
      ...updatedLoginForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedLoginForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedLoginForm) {
      formIsValid = updatedLoginForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ loginForm: updatedLoginForm, formIsValid: formIsValid });
  };

  submitHandler = () => {
    if (this.state.formIsValid) {
      this.props.onAuth(
        this.state.loginForm.email.value,
        this.state.loginForm.password.value,
        this.props.isSignUp
      );
    }
    
  };

  componentDidUpdate(){
    if (!this.props.loading && this.props.token !=null) {
      this.props.history.replace("/wijaya/dashboard");
    }
  }

  render() {
    let form = (
      <form className={classes.form} noValidate autoComplete="off">
        <p className={classes.fieldName}>Email Address</p>
        <TextField
          id="outlined-basic"
          label="Enter Email"
          variant="outlined"
          fullWidth
          error={!this.state.loginForm.email.valid}
          helperText={this.state.loginForm.email.valid ? "" : "invalid email"}
          value={this.state.loginForm.email.value}
          onChange={(event) => this.inputChangedHandler(event, "email")}
        />
        <p className={classes.fieldName}>Password</p>
        <TextField
          id="outlined-basic"
          label="Enter Password"
          variant="outlined"
          fullWidth
          helperText={
            this.state.loginForm.password.valid ? "" : "need strong password"
          }
          error={!this.state.loginForm.password.valid}
          value={this.state.loginForm.password.value}
          onChange={(event) => this.inputChangedHandler(event, "password")}
        />
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            onClick={() => this.submitHandler()}
          >
            Submit
          </Button>
        </div>
      </form>
    );

    if (this.props.isLoading) {
      form = <CircularProgress />;
    }

   

    return (
      <div className={classes.wrapper}>
        <Grid container item style={{ height: "100%" }}>
          <Grid item xs={false} sm={2} md={3} lg={3}></Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={6}
            className={classes.formWrapper}
          >
            <p className={classes.formTitle}>{this.props.formTitle}</p>
            {form}
          </Grid>
          <Grid item xs={false} sm={2} md={3} lg={3}></Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
