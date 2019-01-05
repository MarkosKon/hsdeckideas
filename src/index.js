import "react-app-polyfill/ie11";
import React from "react";
import { render } from "react-snapshot";
import Loadable from "react-loadable";

import Loading from "./components/Loading/Loading";
import registerServiceWorker from "./registerServiceWorker";

const LoadableApp = Loadable({
  loader: () => import("./App"),
  loading: Loading
});

render(<LoadableApp />, document.getElementById("root"));
registerServiceWorker();
