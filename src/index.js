import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";


Sentry.init({
  dsn:
    "https://bede3d43797f4b5f8d0352ff34e13be0@o447258.ingest.sentry.io/5426946",
  release: "my-project-name@" + process.env.npm_package_version,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0, // Be sure to lower this in production
});


ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
