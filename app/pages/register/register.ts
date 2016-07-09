import { Component } from "@angular/core";
import { NavController, Toast, Events } from "ionic-angular";
import {
  FormBuilder,
  Validators,
  Control,
  ControlGroup,
  FORM_DIRECTIVES
} from "@angular/common";

import { AuthProvider } from "./../../providers/auth";

@Component({
  templateUrl: "build/pages/register/register.html"
})
export class RegisterPage {
  private registerForm: ControlGroup;
  private name: Control;
  private email: Control;
  private password: Control;

  constructor(
    private events: Events,
    private nav: NavController,
    private auth: AuthProvider,
    private formBuilder: FormBuilder) {

    this.name = new Control("", Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(64)
    ]));
    this.email = new Control("", Validators.compose([
      Validators.required,
      Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$"),
      Validators.minLength(6),
      Validators.maxLength(64)
    ]));
    this.password = new Control("", Validators.compose([
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(24)
    ]));

    this.registerForm = formBuilder.group({
      "name": this.name,
      "email": this.email,
      "password": this.password
    });
  }

  onSubmit(formData: { name: string, email: string, password: string }) {
    this.auth
      .createUser(formData.name, formData.email, formData.password)
      .then(user => {
        this.events.publish("user:register", user);
      })
      .catch(error => {
        this.password.updateValue("");

        if (error.code === "auth/email-already-in-use") {
          this.showLoginFailure("Email already exists an account");
          return;
        }
        if (error.code === "auth/invalid-email") {
          this.showLoginFailure("Email address is not valid");
          return;
        }
        if (error.code === "auth/operation-not-allowed") {
          this.showLoginFailure("Email/password accounts are not enabled");
          return;
        }
        if (error.code === "auth/weak-password") {
          this.showLoginFailure("Password is not strong enough");
          return;
        }
      });
  }

  showLoginFailure(message: string) {
    let toast = Toast.create({
      message: message,
      duration: 3000
    });
    this.nav.present(toast);
  }
}
