import { Component } from "@angular/core";
import { NavController, Events, Toast } from "ionic-angular";
import {
  FormBuilder,
  Validators,
  Control,
  ControlGroup,
  FORM_DIRECTIVES
} from "@angular/common";

import { AuthProvider } from "./../../providers/auth";

@Component({
  templateUrl: "build/pages/login/login.html",
  directives: [FORM_DIRECTIVES]
})
export class LoginPage {
  private loginForm: ControlGroup;
  private email: Control;
  private password: Control;

  constructor(
    private events: Events,
    private formBuilder: FormBuilder,
    private auth: AuthProvider,
    private nav: NavController) {

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

    this.loginForm = formBuilder.group({
      "email": this.email,
      "password": this.password
    });
  }

  onSubmit(formData: { email: string, password: string }) {
    this.auth
      .signIn(formData.email, formData.password)
      .then(user => {
        this.events.publish("auth:login", user);
      })
      .catch(error => {
        this.password.updateValue("");

        if (error.code === "auth/invalid-email" || error.code === "auth/wrong-password") {
          this.showLoginFailure("Email or password invalid");
          return;
        }
        if (error.code === "auth/user-disabled") {
          this.showLoginFailure("User has been disabled");
          return;
        }
        if (error.code === "auth/user-not-found") {
          this.showLoginFailure("User not found");
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
