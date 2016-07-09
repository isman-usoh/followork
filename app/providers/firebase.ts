import { Injectable } from "@angular/core";
import * as firebase from "firebase";

import AppConfig from "./../app-config";

@Injectable()
export class FirebaseProvider {
  private _app: firebase.FirebaseApplication;

  constructor() {
    this._app = firebase.initializeApp(AppConfig.firebase);
  }

  app(): firebase.FirebaseApplication {
    return this._app;
  }

  database(): firebase.Database {
    return this._app.database();
  }

  auth(): firebase.Auth {
    return this._app.auth();
  }
}

