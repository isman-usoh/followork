const firebase = {
    apiKey: "AIzaSyCJF8ezQguv3Xyy0nM0bM3Bm4aPxSKWJGE",
    authDomain: "ionic2-firebase-c9654.firebaseapp.com",
    databaseURL: "https://ionic2-firebase-c9654.firebaseio.com",
    storageBucket: "ionic2-firebase-c9654.appspot.com",
};

const Config = {
    prodMode: !!window["cordova"],
    firebase: firebase
};

export default Config;