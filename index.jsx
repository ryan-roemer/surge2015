/*global document*/

import React from "react/addons";
import context from "spectacle/src/utils/context";

import {Router, Route} from "react-router";
import HashHistory from "react-router/lib/HashHistory";

import Flux from "spectacle/src/flux/alt";

import Deck from "./presentation/deck";
import config from "spectacle/presentation/config";

require("normalize.css");
require("spectacle/themes/default/index.css");
require("highlight.js/styles/monokai_sublime.css");

// Flux
const flux = new Flux();

// Presentation
class Presentation extends React.Component {
  render() {
    return <Deck />;
  }
}

Presentation.contextTypes = {
  router: React.PropTypes.object
};

const PresContext = context(Presentation, {
  styles: config.theme,
  print: config.print,
  flux
});

// Router
React.render(
  <Router history={new HashHistory()}>
    <Route path="/" component={PresContext} />
    <Route path="/:slide" component={PresContext} />
  </Router>
, document.body);

