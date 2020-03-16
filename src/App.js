import React from "react";
import Bowser from "bowser";

import Content from "components/Content";
import InvalidBrowser from "components/Common/InvalidBrowser";

const App = () => {
  const browser = Bowser.getParser(window.navigator.userAgent).getBrowserName();
  switch (browser) {
    case "Internet Explorer":
    case "Microsoft Edge":
      return <InvalidBrowser browser={browser} />;
  }
  return <Content />;
};

export default App;
