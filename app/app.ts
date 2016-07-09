import { Component, ViewChild } from "@angular/core";
import { App, ionicBootstrap, Platform, Nav, Events } from "ionic-angular";
import { StatusBar } from "ionic-native";

import { LoginPage } from "./pages/login/login";
import { RegisterPage } from "./pages/register/register";
import { TaskPage } from "./pages/task/Task";
import { MessagePage } from "./pages/message/message";
import { TeamPage } from "./pages/team/team";

import AppConfig from "./app-config";

import {AuthProvider} from "./providers/auth";
import {FirebaseProvider} from "./providers/firebase";

@Component({
    templateUrl: "build/app.html"
})
class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any;

    menus: Array<{ title: string, icon: string, component: any }>;

    constructor(
        private platform: Platform,
        private auth: AuthProvider,
        private event: Events) {
        this.initializeApp();
        this.loadMenu();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            StatusBar.styleDefault();
        });
    }
    loadMenu() {
        if (!this.auth.isAuth()) {
            this.rootPage = TaskPage;
            this.menus = [
                { title: "งาน", icon: "calendar", component: TaskPage },
                { title: "ข้อความ", icon: "chatboxes", component: MessagePage },
                { title: "ทีมงาน", icon: "people", component: TeamPage }
            ];
        } else {
            this.rootPage = LoginPage;
            this.menus = [
                { title: "ล็อกอิน", icon: "calendar", component: LoginPage },
                { title: "ลงทะเบียน", icon: "chatboxes", component: RegisterPage }
            ];
        }
    }

    onMenuClick(menu) {
        this.nav.setRoot(menu.component);
    }
    onSignOutClick() {

    }
}

ionicBootstrap(MyApp, [FirebaseProvider, AuthProvider], {
    prodMode: AppConfig.prodMode
});
