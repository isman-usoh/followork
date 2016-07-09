import { Injectable } from "@angular/core";
import { FirebaseProvider } from "./firebase";

import {LoginPage} from "./../pages/login/login";

@Injectable()
export class AuthProvider {
    constructor(
        private firebase: FirebaseProvider) { }

    isAuth(): boolean {
        return !!this.currentUser();
    }

    signOut(): Promise<void> {
        return this.firebase.auth().signOut();
    }

    signIn(email: string, password: string): Promise<firebase.User> {
        return this.firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
    }

    createUser(name: string, email: string, password: string): Promise<firebase.User> {
        return this.firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(user => {
                return user
                    .updateProfile({ displayName: name, photoURL: user.photoURL })
                    .then(res => user)
                    .catch(error => user);
            });
    }

    currentUser(): firebase.User {
        return this.firebase.auth().currentUser;
    }
}