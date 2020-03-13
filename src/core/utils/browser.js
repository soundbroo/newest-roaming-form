import Bowser from "bowser";
const browser = Bowser.getParser(window.navigator.userAgent).getBrowserName();

console.log(browser);
