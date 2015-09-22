/*eslint-disable no-multiple-empty-lines*/
import React from "react/addons";

// Slide abstractions
// ------------------
// Appear, BlockQuote, Cite, CodePane, Deck, Fill,
// Heading, Image, Layout, Link, ListItem, List, Quote, Slide, Text
import {
  Deck, CodePane, Heading, Image, Link, Slide, Text, Layout, List, ListItem, Fill, Appear
} from "spectacle/src/spectacle";

// Images
// ------
import preloader from "spectacle/src/utils/preloader";

const images = {
  polygons: require("../assets/img/bg/formidable/formidangles-dark.svg"),
  polygonsGray: require("../assets/img/bg/formidable/formidangles-gray.svg"),
  logoFormidable: require("../assets/img/logo/formidable.svg"),
  logojQuery: require("../assets/img/logo/jquery.svg"),
  logoBackbone: require("../assets/img/logo/backbone.svg"),
  logoUnderscore: require("../assets/img/logo/underscore.png"),
  logoRollbar: require("../assets/img/logo/rollbar.svg"),
  logoLoggly: require("../assets/img/logo/loggly.svg"),
  logoSentry: require("../assets/img/logo/sentry.svg"),
  logoAirbrake: require("../assets/img/logo/airbrake.svg"),
  logoReact: require("../assets/img/logo/react.svg"),
  logoWebpack: require("../assets/img/logo/webpack.svg"),
  wmHomepage: require("../assets/img/wml/screen-homepage.png"),
  wmItem: require("../assets/img/wml/screen-item-ipad.png"),
  wmReport: require("../assets/img/wml/report-homepage.png"),
  wmScripts: require("../assets/img/wml/scripts-homepage.png"),
  bgPattern: require("../assets/img/bg/slides/pattern-fancypants.jpg"),
  bgRailroadBridge: require("../assets/img/bg/slides/unsplash-railroad-bridge.jpg"),
  bgTypewriterParts: require("../assets/img/bg/slides/unsplash-typewriter-parts.jpg"),
  bgCowboyPilot: require("../assets/img/bg/slides/newoldstock-x1a-cowboy-pilot.jpg"),
  bgHorseWrangling: require("../assets/img/bg/slides/newoldstock-horse-wrangling.jpg"),
  bgClassroom: require("../assets/img/bg/slides/newoldstock-classroom-desks.jpg"),
  bgLionTamer: require("../assets/img/bg/slides/newoldstock-lion-tamer.jpg"),
  bgHerdingBuffalo: require("../assets/img/bg/slides/newoldstock-herding-buffalo.jpg"),
  bgDraftsmen: require("../assets/img/bg/slides/newoldstock-draftsmen.jpg"),
  bgGears: require("../assets/img/bg/slides/stocksnap-gears.jpg"),
  // bgSpeedometer: require("../assets/img/bg/slides/pexels-speedometer.jpg"),
  bgMotorbike: require("../assets/img/bg/slides/pexels-motorbike.jpg"),
  bgCaution: require("../assets/img/bg/slides/pexels-caution-sign.jpg"),
  bgAstronautEarth: require("../assets/img/bg/slides/newoldstock-astronaut-earth.jpg")
};

// Preload all images
preloader(Object.keys(images));

// Components
// ----------
// Custom overrides for the deck
class CustomDeck extends Deck {
  _handleKeyPress(e) {
    // Call base method.
    super._handleKeyPress(e);

    // Add some extra key bindings for Satechi remote.
    /*globals window:false*/
    const event = window.event || e;

    const SATECHI_PREV_KEY = 38;
    if (event.keyCode === SATECHI_PREV_KEY) {
      this._prevSlide();
    }

    const SATECHI_NEXT_KEY = 40;
    if (event.keyCode === SATECHI_NEXT_KEY) {
      this._nextSlide();
    }
  }
}

// Non-bolded heading.
const getLonelyHeadingStyles = function () {
  /*eslint-disable no-invalid-this*/
  const styles = Heading.Mixin.getStyles.call(this);
  styles.fontWeight = "normal";
  return styles;
};

class LonelyHeading extends Heading {
  constructor(props) {
    super(props);
    this.getStyles = getLonelyHeadingStyles;
  }
}

LonelyHeading.defaultProps = {
  size: 4
};

LonelyHeading.Mixin = {
  getStyles: getLonelyHeadingStyles
};

// A meaningful "point" in text.
class Point extends React.Component {
  render() {
    return (
      <span style={{fontWeight: "bold"}}>
        {this.props.children}
      </span>
    );
  }
}

Point.propTypes = {
  children: React.PropTypes.node
};

// Blackbox for white over images
class BlackBox extends React.Component {
  render() {
    const Tag = this.props.tag || "span";
    const bgDarken = typeof this.props.bgDarken !== "undefined" ? this.props.bgDarken : 0.75;
    const bgRgb = typeof this.props.bgRgb !== "undefined" ? this.props.bgRgb : [0, 0, 0];
    const styles = {
      background: `rgba(${bgRgb.join(",")}, ${bgDarken})`,
      borderRadius: "0.2em",
      padding: "0.0em 0.2em",
      margin: "0"
    };

    return (
      <Tag style={styles}>
        {this.props.children}
      </Tag>
    );
  }
}

BlackBox.propTypes = {
  tag: React.PropTypes.string,
  bgDarken: React.PropTypes.number,
  bgRgb: React.PropTypes.array,
  children: React.PropTypes.node
};

// Links
// -----
const links = {
  /*eslint-disable max-len*/
  tcThanksgiving2014: "http://techcrunch.com/2014/12/02/walmart-com-reports-biggest-cyber-monday-in-history-mobile-traffic-at-70-over-the-holidays/",
  frMobileTraffic: "http://www.fierceretail.com/mobileretail/story/walmart-mobile-traffic-100/2015-05-20",
  wmFy2014: "http://cdn.corporate.walmart.com/66/e5/9ff9a87445949173fde56316ac5f/2014-annual-report.pdf"
  /*eslint-enable max-len*/
};


// Helpers
// -------
// A naive, indent preserving strip.
const strip = function (val) {
  // Find first line with text. Capture that indent level.
  let indent = null;

  return val.split("\n")
    .map((line) => {
      // Capture initial indent.
      if (indent === null && /^\s/.test(line)) {
        indent = /^ */.exec(line)[0];
      }

      // If no indent, ignore.
      if (indent === null) {
        return null;
      }

      return line
        .replace(new RegExp("^" + indent), "")
        .replace(/\s*$/, "");
    })
    .join("\n")
    .replace(/^\s*|\s$/, "");
};

// Convert note items to list.
const notes = function () {
  const args = [].slice.call(arguments);

  // HACKY: Raw HTML string insertion.
  return (
    "<ul style='font-size: 0.8em'>" +
      args.map((note) => `<li>${note}</li>`).join("") +
    "</ul>"
  );
};

// Presentation
// ------------
export default class extends React.Component {
  render() {
    return (
      <CustomDeck progress="bar" transition={["slide"]}>
        {/* ---------------------------------------------------------------
          * Title
          * --------------------------------------------------------------- */}
        <Slide id="title" bgImage={images.polygons}>
          <Text bold fit caps textColor="primary" textFont="primary">
            Wrangling
          </Text>
          <Text bold fit caps textColor="primary" textFont="primary">
            Large Scale
          </Text>
          <Text bold fit caps textColor="primary" textFont="primary">
            Frontend Web Applications
          </Text>
          <div style={{display: "inline-block", marginTop: "2.5em"}}>
            <Text style={{display: "inline-block", fontSize: "2.5em"}}>
              <Link href="https://twitter.com/ryan_roemer"
                    textColor="lighterGray">
                @ryan_roemer
              </Link>
            </Text>
            <Text style={{display: "inline-block", margin: "0 0.35em"}}
                  textColor="darkerGray">
              |
            </Text>
            <Text style={{display: "inline-block", fontSize: "2.5em"}}>
              <Link href="http://surge2015.formidablelabs.com"
                    textColor="lighterGray">
                surge2015.formidablelabs.com
              </Link>
            </Text>
          </div>
        </Slide>

        {/* ---------------------------------------------------------------
          * Large Scale Web Applications
          * ---------------------------------------------------------------

            - The Frontend is winning
                - Users want the fast experience
                - Product owners want agile, powerful apps
                - Frontend web apps are business critical and we'd better catch up.

            - Enterprise's time has come. And we're going to talk it through.
          */}
        <Slide id="intro"
          notes={notes(
            "Browsers are getting faster and better all the time",
            "Standards and technologies are exploding everywhere"
          )}>
          <LonelyHeading size={2}>
            The web is <em>massively</em> moving to the <em>frontend</em>
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "Waiting for page refreshes are a thing of the past",
            "Single Page Applications deliver quick, slick experiences"
          )}>
          <LonelyHeading size={2}>
            Users want <em>rich</em> and <em>seamless</em> experiences
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "Modern JavaScript is flexible and fast to develop"
          )}>
          <LonelyHeading size={2}>
            Product owners want <em>fast</em> and <em>nimble</em> apps
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "JavaScript is not really optional anymore in modern web apps"
          )}>
          <LonelyHeading size={2}>
            Browser apps are now <em>business critical</em>
          </LonelyHeading>
        </Slide>
        <Slide>
          <LonelyHeading size={2}>
            And, yes, even for the <em>enterprise</em>
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "JavaScript has won",
            "And we are destined for a web application world of..."
          )}>
          <LonelyHeading size={2}>
            ... which means
          </LonelyHeading>
        </Slide>
        <Slide bgColor="tertiary" bgImage={images.polygonsGray}
          notes={notes(
            "Each of these trends are <b>scary</b>",
            "... and present great <b>opportunity</b>"
          )}>
          <Appear fid="1">
            <Heading bold fit caps textColor="lightestGray">
              Lots of JavaScript
            </Heading>
          </Appear>
          <Appear fid="2">
            <Heading bold fit caps textColor="primary">
              In the browser
            </Heading>
          </Appear>
          <Appear fid="3">
            <Heading bold fit caps textColor="lightestGray">
              Written by large teams
            </Heading>
          </Appear>
        </Slide>

        {/* ---------------------------------------------------------------
          * Examining Large Scale Apps
          * ---------------------------------------------------------------

            - Top-Five Ecommerce Site
                - Large site
                - High traffic
                - Large amount of JavaScript code
                - Large frontend development teams
          */}
        <Slide id="ecommerce"
          notes={notes(
            "The full scope of massive frontend web apps is <b>huge</b>",
            "We’re going to need to focus this talk on some key points"
          )}>
          <LonelyHeading textColor="secondary">
            Let{"’"}s dig into some large frontends at a <em>high-traffic
            </em>, <em>top-five</em> e-commerce site
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "Today’s talk will focus on <code>walmart.com</code>",
            "Specifically, I’m going to talk about the <b>desktop/tablet</b> site"
          )}>
          <Link href="http://walmart.com">
            <Image src={images.wmItem} width="80%"/>
          </Link>
        </Slide>
        <Slide
          notes={notes(
            "Sales figures for Global eCommerce division",
            "3472 page views / second for Thanksgiving - Cyber Monday",
            "Cyber Monday 2014 orders surpassed <em>all previous records</em>"
          )}>
          <Heading size={3}>
            The Numbers
          </Heading>
          <List>
            <ListItem>
              <Link href={links.wmFy2014}><Point>$10 billion
              </Point></Link> FY 2014,{" "}
              {/*
                - "Each operating segment strengthened its e-commerce platforms, and customers
                   responded, driving annual Global eCommerce sales, including acquisitions, above
                   the $10-billion mark, a 30 percent increase."
               */}
              <Link href={links.wmFy2014}><Point>$13 billion</Point></Link> FY 2015 (est)
              {/*
                - "In fiscal 2015, we expect Global eCommerce gross merchandise value, which
                   includes digital sales of Walmart goods and third-party sales through our sites,
                   to exceed $13 billion."
               */}
            </ListItem>
            <ListItem>
              <Link href={links.tcThanksgiving2014}><Point>1.5
              billion</Point> page views</Link> for Thanksgiving - Cyber Monday 2014
            </ListItem>
          </List>
        </Slide>
        <Slide
          notes={notes(
            "Have more than 50 JavaScript apps across the site",
            "<em>1K - 145K</em> in size"
          )}>
          <Heading size={3}>
            The Code
          </Heading>
          <List>
            <ListItem>
              <Point>50+</Point> JS applications
            </ListItem>
            <ListItem>
              <Point>650K</Point> lines, <Point>2500</Point> files of JavaScript source
            </ListItem>
            <ListItem>
              <Point>More JavaScript</Point> lines & files than <Point>Java</Point>
            </ListItem>
          </List>
          {/*
            - Sizes are minified and gzipped.
            - Source Code
              Files   Lines     Category
              1900    189382    Java All
              2517    631653    JS All
              1138    129467    JS App (no vendor)
                      290524    JS Vendor
                      161057    JS App + Vendor
              1315    341129    JS Test

            - 58 entry points:

              2189     4834     builds/tracks/footer/footer.min.js
              20242    70211    builds/tracks/header/header.min.js

              8363     26276    builds/tracks/homepage/homepage.min.js
              69110    389482   builds/tracks/product/product.min.js
              144400   696033   builds/tracks/checkout/checkout/checkout.min.js

              298431   1312631  builds/tracks/lib.min.js
            */}
        </Slide>
        <Slide>
          <Heading size={3}>
            The Technologies
          </Heading>
          <Layout>
            <Fill>
              <Link href="https://jquery.com/">
                <Image src={images.logojQuery} width="40%" />
              </Link>
            </Fill>
          </Layout>
          <Layout style={{marginTop: "2em"}}>
            <Fill>
              <Link href="http://backbonejs.org/">
                <Image src={images.logoBackbone} width="90%" />
              </Link>
            </Fill>
            <Fill>
              <Link href="http://underscorejs.org/">
                <Image src={images.logoUnderscore} width="90%" />
              </Link>
            </Fill>
          </Layout>
        </Slide>
        <Slide>
          <Heading size={3}>
            The Dev Team
          </Heading>
          <List>
            <ListItem>A <Point>2+</Point> year website rewrite</ListItem>
            <ListItem><Point>50+</Point> core frontend engineers</ListItem>
            <ListItem><Point>14</Point> vertical teams / <Point>"tracks"</Point></ListItem>
            <ListItem>... and many <Point>external</Point> teams / partners</ListItem>
          </List>
        </Slide>

        {/* ---------------------------------------------------------------
          * Ryan & Meta JS
          * ---------------------------------------------------------------
          */}
        <Slide id="wrangling" bgImage={images.bgHorseWrangling} bgDarken={0.4}
          notes={notes(
            "As I help wrangle some of this, I'd like to take you on a ..."
          )}>
          <Heading fit caps textColor="primary">
            A Tour Through
          </Heading>
          <Heading fit caps textColor="lightestGray">
           the Trenches
          </Heading>
        </Slide>
        <Slide bgImage={images.bgHorseWrangling} bgDarken={0.4}
          transition={["none"]}
          notes={notes(
            "A software development consultancy in Seattle, WA",
            "Help teams from startups to Fortune 500 companies",
            "One of our largest clients"
          )}>
          <Link href="http://formidablelabs.com">
            <BlackBox tag="div" bgRgb={[255, 255, 255]} bgDarken={0.8}>
              <Image width="100%" src={images.logoFormidable}/>
            </BlackBox>
          </Link>
        </Slide>
        <Slide
          notes={notes(
            "Started at the beginning of the redesign",
            "Authored the base parts of the frontend infrastructure"
          )}>
          <LonelyHeading>
            My <em>wrangling adventures</em>
          </LonelyHeading>
          <LonelyHeading>
            as the <em>JavaScript lead</em> for
          </LonelyHeading>
          <LonelyHeading>
            the website & dev teams
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "So many moving parts, details and complexities.",
            "Focus on a handful of critical issues to keeping the site up & running"
          )}>
          <LonelyHeading>
            A few battle-tested
          </LonelyHeading>
          <LonelyHeading>
            <em>tips</em> from the <em>field</em>...
          </LonelyHeading>
        </Slide>

        {/* ---------------------------------------------------------------
          * Themes - Introduction
          * ---------------------------------------------------------------
          */}
        <Slide>
          <LonelyHeading>
            ... with a focus on
          </LonelyHeading>
          <LonelyHeading>
            four <em>personas</em>
          </LonelyHeading>
        </Slide>
        <Slide id="personas" bgColor="tertiary" bgImage={images.polygonsGray}>
          <Layout>
            <Fill style={{borderRight: "1px solid #525050", borderBottom: "2px solid #525050"}}>
              <Heading size={4} caps textColor="primary">
                Architects
              </Heading>
              <Heading size={3} textColor="lightestGray" style={{margin: "0 auto 1em"}}>
                <i className="fa fa-building-o"></i>
              </Heading>
            </Fill>
            <Fill style={{borderLeft: "1px solid #525050", borderBottom: "2px solid #525050"}}>
              <Heading size={4} caps textColor="primary">
                Guides
              </Heading>
              <Heading size={3} textColor="lightestGray" style={{margin: "0 auto 1em"}}>
                  <i className="fa fa-map-o"></i>
              </Heading>
            </Fill>
          </Layout>
          <Layout>
            <Fill style={{borderRight: "1px solid #525050"}}>
              <Heading size={4} caps textColor="primary">
                Gatekeepers
              </Heading>
              <Heading size={3} textColor="lightestGray" style={{margin: "0 auto 1em"}}>
                <i className="fa fa-shield"></i>
              </Heading>
            </Fill>
            <Fill style={{borderLeft: "1px solid #525050"}}>
              <Heading size={4} caps textColor="primary">
                Lifeguards
              </Heading>
              <Heading size={3} textColor="lightestGray" style={{margin: "0 auto 1em"}}>
                <i className="fa fa-life-ring"></i>
              </Heading>
            </Fill>
          </Layout>
        </Slide>

        {/* ---------------------------------------------------------------
          * THEME - Architects
          * ---------------------------------------------------------------

          - Architects: Build the foundations.
              - **Idea**: "Plan and build a strong base."
              - **Motivation**: JS is hard and complicated, and more so for big teams.
              - A "Real" Build
              - Organize the code

          - Architecture & Architects
              - MOTIVATION: JS is the Wild, Wild West
                - The Good:
                    - It's flexible, developer-friendly, and scalable.

                - The Bad:
                    - Flexible almost to a fault (monkey patching everywhere)
                    - Tough to do correctly
                    - ... in all browsers
                    - Code must be small and avoid duplication
                    - The technology ecosystem changes at a ridiculous rate

          */}
        <Slide id="architects" bgColor="tertiary" bgImage={images.polygonsGray}>
          <Heading fit caps textColor="primary">
            Architects
          </Heading>
          <Heading textColor="primary" style={{marginTop: "0.2em", fontSize: "12em"}}>
            <i className="fa fa-building-o"></i>
          </Heading>
        </Slide>
        <Slide>
          <LonelyHeading>
            Plan & build a <em>strong foundation</em>
          </LonelyHeading>
        </Slide>
        <Slide>
          <Heading size={3}>
            Architects
          </Heading>
          <List>
            <ListItem>
              A <Point>real build</Point>
            </ListItem>
            <ListItem>
              Code <Point>organization</Point>
            </ListItem>
          </List>
        </Slide>
        <Slide bgImage={images.bgCowboyPilot} bgDarken={0.35}>
          <Heading bold fit caps textColor="lightestGray">
            The Fundamental Challenge:
          </Heading>
          <Heading bold fit caps textColor="primary">
            JavaScript is the
          </Heading>
          <Heading bold fit caps textColor="lightestGray">
            Wild, Wild West
          </Heading>
        </Slide>
        <Slide>
          <Heading size={4} textColor="red">
            Architecture Challenges
          </Heading>
          <List>
            <ListItem>
              Browser is a single <Point>execution environment</Point>
            </ListItem>
            <ListItem>
              Code <Point>size / duplication</Point> is critical
            </ListItem>
            <ListItem>
              Hard to <Point>manage</Point>, easy to do <Point>wrong</Point>
            </ListItem>
            <ListItem>
              "<Point>Cowboy</Point>" legacy vs. large scale organization
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <LonelyHeading>
            Let{"'"}s look at the
          </LonelyHeading>
          <LonelyHeading>
            architectural <Point>complexities</Point>
          </LonelyHeading>
          <LonelyHeading>
            of just <Point>one page</Point>...
          </LonelyHeading>
        </Slide>

        {/* ---------------------------------------------------------------
          * Case Study - Homepage
          * ---------------------------------------------------------------

            - An example of something "in transition" from a bunch of random
              JS into more structured mini applications.
            - On it's way to a single, cogent SPA.
            - The page itself is very complicated. Some of this you can't avoid
              in large scale applications.
            - Our structure is an example of how basic pages work (and how
              complicated that can be).
          */}
        <Slide id="homepage" bgColor="tertiary" bgImage={images.polygonsGray}>
          <Heading fit caps textColor="primary">
            The Homepage
          </Heading>
          <Heading textColor="primary" style={{marginTop: "0.2em", fontSize: "12em"}}>
            <i className="fa fa-home"></i>
          </Heading>
        </Slide>
        <Slide
          notes={notes(
            "This is the homepage",
            "Let's look at what goes into the <b>desktop</b> site"
          )}>
          <Link href="http://walmart.com">
            <Image src={images.wmHomepage} width="80%"/>
          </Link>
        </Slide>
        <Slide>
          <Heading size={3}>
            The Homepage
          </Heading>
          <List>
            <ListItem><em>Multiple</em>, <em>independent</em> JS apps</ListItem>
            <ListItem>Code from <Point>8</Point> different teams</ListItem>
            <ListItem>
              Exemplary "<em>in transition</em>" page, somewhere
              between raw JavaScript & a SPA
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={3}>
            <i className="fa fa-home"></i> JavaScript
          </Heading>
          <Layout>
            <Fill>
              <Heading size={5} caps textColor="tertiary">
                On Page
              </Heading>
              <List>
                <ListItem>Direct page <em>scripts</em></ListItem>
                <ListItem><Point>10</Point> remote scripts</ListItem>
                <ListItem><Point>18</Point> inline scripts</ListItem>
              </List>
            </Fill>
            <Fill>
              <Heading size={5} caps textColor="tertiary">
                Lazy Loaded
              </Heading>
              <List>
                <ListItem>Injected script tags</ListItem>
                <ListItem><Point>6</Point> app <em>entry points</em></ListItem>
              </List>
            </Fill>
          </Layout>
        </Slide>
        <Slide>
          <Heading size={3}>
            <i className="fa fa-home"></i> On Page
          </Heading>
          <Layout>
            <Fill>
              <List>
                <ListItem><Point>2</Point> <em>application</em> code</ListItem>
                <ListItem><Point>2</Point> CDN infrastructure</ListItem>
                <ListItem><Point>2</Point> internal ads</ListItem>
                <ListItem><Point>2</Point> Google ads</ListItem>
              </List>
            </Fill>
            <Fill>
              <List>
                <ListItem><Point>1</Point> fonts</ListItem>
                <ListItem><Point>1</Point> IE-conditional polyfill</ListItem>
                <ListItem><Point>18</Point> inline scripts</ListItem>
              </List>
            </Fill>
          </Layout>
        </Slide>
        <Slide>
          <Heading size={3}>
            <i className="fa fa-home"></i> Lazy (Code)
          </Heading>
          <CodePane
            lang="javascript"
            source={strip(`
              window._entry(function() {
                require(["header/header"], function () {
                  require(["header/header-deferred"]);
                });
                // ...
                require(["homepage/homepage"]);
                // ...
              });
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}
          />
        </Slide>
        <Slide>
          <Heading size={3}>
            <i className="fa fa-home"></i> Lazy (App)
          </Heading>
          <List>
            <ListItem>Asynchronously loaded</ListItem>
            <ListItem><Point>1</Point> shared library</ListItem>
            <ListItem><Point>4</Point> primary entry points</ListItem>
            <ListItem><Point>2</Point> deferred entry points</ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading fit caps>
            The takeaway?
          </Heading>
          <Heading fit caps textColor="red">
            It{"'"}s complicated.
          </Heading>
        </Slide>

        {/* ---------------------------------------------------------------
          * Architects - A "Real" Build
          * ---------------------------------------------------------------
          */}
        <Slide id="build" bgImage={images.bgRailroadBridge}>
          <Heading fit caps textColor="primary">
            <BlackBox>
              A "Real" Build
            </BlackBox>
          </Heading>
        </Slide>
        <Slide>
          <Heading size={3} textColor="red">
            Build Challenges
          </Heading>
          <List>
            <ListItem>
              <Point>Modern JS apps</Point> are complicated <em>(compression,
                polyfills, transpiling, etc.)</em>
            </ListItem>
            <ListItem>
              <Point>Multiple</Point> JS apps on the same page is even more complex
            </ListItem>
            <ListItem>
              Supporting development & production / <Point>CDN</Point>
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={3}>
            Use a Build Tool
          </Heading>
          <List>
            <ListItem>
              Choose an <Point>paradigm</Point>:{" "}
              <Link href="http://requirejs.org/docs/whyamd.html">AMD</Link>,{" "}
              <Link href="http://wiki.commonjs.org/wiki/CommonJS">CommonJS</Link>
            </ListItem>
            <ListItem>
              Choose a <Point>build tool / loader</Point>:{" "}
              <Link href="http://requirejs.org/">RequireJS</Link>,{" "}
              <Link href="http://browserify.org/">Browserify</Link>,{" "}
              <Link href="http://webpack.github.io/">Webpack</Link>
            </ListItem>
            <ListItem>
              Take time to learn & evaluate the <Point>tradeoffs</Point>
            </ListItem>
          </List>
          {/*
            - Any of the above schemes / tools will do.
            - Strengths and weaknesses to approaches.
                - Schemes
                    - CommonJS is the most liked format, but _must_ be watched / built.
                    - AMD requires boilerplate / awkward syntax, but can have superquick dev.
                - Tools
                    - RequireJS: Most flexible for a large build, but not the "hot tool".
                    - Browserify: Loved by dev's for simple projects.
                    - Webpack: The new hotness, with good AMD/CommonJS support, and some more
                      advanced tooling like shared libraries.
            */}
        </Slide>
        <Slide>
          <Heading size={3} textColor="darkGray">
            Our Build Tools
          </Heading>
          <List>
            <ListItem>
              <Point>Legacy</Point>: AMD + RequireJS
            </ListItem>
            <ListItem>
              <Point>Modern</Point>: CommonJS + Webpack
            </ListItem>
            <ListItem>
              <Point>Transition</Point>: AMD & CommonJS + Webpack
            </ListItem>
          </List>
        </Slide>
        <Slide
          notes={notes(
            "Developers hate waiting for dev changes & test runs",
            "Prod deploys should be fast to keep you agile",
            "<b>STORY</b>: Keep dev. builds in-memory",
            "<b>STORY</b>: Move CDN tool to pure JS (b/c Java was slow)"
          )}>
          <LonelyHeading>
            Keep prod & dev builds <Point>blazingly fast</Point>
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "<b>STORY</b>: Differences <b>will</b> cause bugs. (Assets for Thanksgiving)",
            "<b>STORY</b>: PCI compliance hashing architecture"
          )}>
          <LonelyHeading>
            Make <em>development</em>
          </LonelyHeading>
          <LonelyHeading>
            <Point>identical</Point> to <em>production</em>
          </LonelyHeading>
        </Slide>
        <Slide>
          <Heading size={3} textColor="red">
            Build Complexities
          </Heading>
          <List>
            <ListItem>
              Sharing / caching <Point>common code</Point> (<code>lib.js</code>)
            </ListItem>
            <ListItem>
             Varying <Point>repository structures</Point>
            </ListItem>
            <ListItem>
             Sharing <Point>frontend</Point> & <Point>backend</Point> code
            </ListItem>
            <ListItem>
             Combining application, OSS, & 3rd party code
            </ListItem>
          </List>
          {/*
            - STORY: Sharing code for efficiency for your "common cases" is both
                     critical, difficult and changing. We use analysis tools
                     and repeatedly re-examine assumptions.
            - STORY: We have a legacy decision of having most track JavaScript
                     live in deeply-nested Java paths. Most common, "normal"
                     JavaScript lives in a flat repository. Consequently, we
                     have very, very tough shared
            - Part of the build complexities also figure into Gatekeeping,
              specifically when to say no:
                - 3rd party vendor libraries.
                - How far to bend the JS to accomodate Java.
            */}
        </Slide>

        {/* ---------------------------------------------------------------
          * Architects - Code Organization
          * ---------------------------------------------------------------

          - TIP: Organize your code.
              - Going to have enormous amount of code.
              - One unified build.
              - Originally, a monolith repo, now multiple track repos.
              - Shared Java + JS
                  - LESSON: Original decision to nest JS deeply in Java has been painful.

          */}
        <Slide id="org" bgImage={images.bgTypewriterParts}>
          <Heading fit caps textColor="primary">
            <BlackBox>
              Code Organization
            </BlackBox>
          </Heading>
        </Slide>
        <Slide>
          <LonelyHeading>
            Plan your <Point>repository structure</Point>
          </LonelyHeading>
          <LonelyHeading>
            <Point>1</Point> &rarr; <Point>14</Point> &rarr; <Point>many</Point> repos
          </LonelyHeading>
          {/*
            - You are going to have an enormous amount of code. It's important to structure
              properly and plan it **up front**.
                - Track code
                - Shared code, reusable components

            - STORY: Originally one monolithic repository
                - GOOD: Consistent build, JS environment
                - GOOD: Avoided really any big bugs during Black Friday 2014
                - BAD: Painful to develop, test, deploy.

            - STORY: Now, a per-track repository structure.
                - GOOD: Faster dev, easier iterations and tooling.
                - BAD: Painful for cross-track updates.
                - BAD: Likely a little more bug surface.
            */}
        </Slide>
        <Slide>
          <LonelyHeading>
            Have a bias for <Point>small</Point> & <Point>flexible</Point>
          </LonelyHeading>
          {/*
            - STORY: Heading towards many, many small repositories
                - Per component
                - A mini "open source" model.

            - GOOD: Fast, flexible, honed development.
            - GOOD: Promise of more quality, consistent versioning, etc.

            - BAD: Updating / maintaining infrastructure across repositories
            - BAD: Our transition is going to be painful and long.
            */}
        </Slide>

        {/* ---------------------------------------------------------------
          * THEME - Guides
          * ---------------------------------------------------------------

            - Guides: Help the team along its way.
                - **Idea**: "Shephard junior dev's and coordinate the chaos"
                - **Motivation**: All JS on the same page, ...
                - Meta Leadership
                - Education
                - Review everything (also Gatekeeper)
                - (Meta Team): Guides

            - MOTIVATION: Big teams
                - Backend dev's learning the frontend.
                - Frontend dev's unfamiliar with large apps, code quality, etc.

          */}
        <Slide id="guides" bgColor="tertiary" bgImage={images.polygonsGray}>
          <Heading fit caps textColor="primary">
            Guides
          </Heading>
          <Heading textColor="primary" style={{marginTop: "0.2em", fontSize: "12em"}}>
            <i className="fa fa-map-o"></i>
          </Heading>
        </Slide>
        <Slide>
          <Heading size={4} textColor="secondary">
            <em>Coordinate</em> the chaos,
          </Heading>
          <Heading size={4} textColor="secondary">
            <em>level up</em> the development teams
          </Heading>
        </Slide>
        <Slide
          notes={notes(
            "These aren't pure 'architecture' points, but so intertwined we can't ignore"
          )}>
          <Heading size={3}>
            Guides & Guidance
          </Heading>
          <List>
            <ListItem>
              The <Point>Meta</Point> team
            </ListItem>
            <ListItem>
              <Point>Educate</Point>
            </ListItem>
            <ListItem>
              <Point>Review</Point> everything
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={3} textColor="red">
            Guidance Challenges
          </Heading>
          <List>
            <ListItem>
              Thinking of the project <Point>as a whole</Point>
            </ListItem>
            <ListItem>
              <Point>Onboarding</Point> unfamiliar / junior developers
            </ListItem>
            <ListItem>
              Helping teams be <Point>consistent</Point> / <Point>complementary</Point>
            </ListItem>
          </List>
        </Slide>

        {/* ---------------------------------------------------------------
          * Guides - The Meta Team
          * ---------------------------------------------------------------
          */}
        <Slide id="meta" bgImage={images.bgHerdingBuffalo} bgDarken={0.30}>
          <Heading fit caps textColor="primary">
            The Meta Team
          </Heading>
        </Slide>
        <Slide
          notes={notes(
            "Here's the real problem..."
          )}>
          <LonelyHeading>Code from <Point>multiple teams</Point></LonelyHeading>
          <LonelyHeading>all combined on <Point>one page</Point></LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "<b>STORY - DRY</b>: Had 3 different image carousels emerging"
          )}>
          <LonelyHeading>These folks represent the <Point>whole page</Point></LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "A <b>coordination point</b> for the project"
          )}>
          <Heading size={3}>
            The Meta Team
          </Heading>
          <List>
            <ListItem>
              Set <Point>conventions</Point> & <Point>best practices</Point>
            </ListItem>
            <ListItem>
              Lead <Point>code reviews</Point> for consistency / DRY
            </ListItem>
            <ListItem>
              Develop common <Point>utilities</Point> & the <Point>deployment</Point> infrastructure
            </ListItem>
          </List>
        </Slide>
        <Slide
          notes={notes(
            "<b>Organic</b> or hand-picked team",
            "<b>Loose</b> or explicit mandates"
          )}>
          <Heading fit caps>
            Your Meta Team Task:
          </Heading>
          <Heading fit caps textColor="red">
            Have One.
          </Heading>
        </Slide>
        <Slide>
          <Heading size={3} textColor="darkGray">
            Our Meta JS Team
          </Heading>
          <List>
            <ListItem>
              <Point>1.5</Point> dedicated developers
            </ListItem>
            <ListItem>
              <Point>6</Point> "loaned" track developers
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={3} textColor="darkGray">
            Our Meta JS Duties
          </Heading>
          <List>
            <ListItem>
              ~1 day of code review / week
            </ListItem>
            <ListItem>
              Chat channel participation
            </ListItem>
            <ListItem>
              Cross-track JS initiatives (i18n, multi-tenancy, PCI, etc.)
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={3}>
            Meta JS Benefits
          </Heading>
          <List>
            <ListItem>
              Project-wide <Point>consistency</Point> & <Point>support</Point>
            </ListItem>
            <ListItem>
              Help tracks consider <Point>other teams</Point>
            </ListItem>
            <ListItem>
              <Point>Represent</Point> track interests in the core
            </ListItem>
            <ListItem>
              <Point>More engineers</Point> to support the whole project
            </ListItem>
          </List>
        </Slide>

        {/* ---------------------------------------------------------------
          * Guides - Education
          * ---------------------------------------------------------------

            - TIP: Education

            - Good documentation
                - As close the code as possible.

            - Mentorship:
                - Jump into branches and pair program
                - Invest in track leads to take over education.

          */}
        <Slide id="education" bgImage={images.bgClassroom} bgDarken={0.25}>
          <Heading fit caps textColor="primary">
            Education
          </Heading>
        </Slide>
        <Slide>
          <LonelyHeading>
            Continually write <Point>living</Point> documentation,
          </LonelyHeading>
          <LonelyHeading>
            <Point>close to the code</Point>
          </LonelyHeading>
        </Slide>
        <Slide>
          <LonelyHeading>
            Take a <Point>"hands on approach"</Point>
          </LonelyHeading>
        </Slide>
        <Slide>
          <LonelyHeading>
            Invest in <Point>rising developers</Point> &
          </LonelyHeading>
          <LonelyHeading>
            spread knowledge <Point>back to teams</Point>
          </LonelyHeading>
          {/*
            - STORY: Had to write a lot of test skeletons and jump in branches
              until track leads / devs finally got off the ground, then was
              self-sustaining from there.

            */}
        </Slide>

        {/* ---------------------------------------------------------------
          * Guides - Review Everything
          * ---------------------------------------------------------------

            - TIP: Review all your code, even vendor code.
                - Substantive review from track
                - Meta JS/CSS/Java review too
                    - Keeps coding styles consistent.
                    - Cross-pollinates the teams.
                    - Identify recurring issues, best practices.
                    - Helps aid documentation efforts.
                - STORY: Unreviewed code with max. integer assumption for an ID. Took down
                  prod and quite costly. Meta Java team would have caught / did catch
                  immediately after the bug surfaced.
                - STORY: `Event.prototype.setPropagation` fiasco

          */}
        <Slide id="review" bgImage={images.bgDraftsmen}>
          <Heading fit caps textColor="primary">
            <BlackBox bgDarken={0.4}>
              Code Review
            </BlackBox>
          </Heading>
        </Slide>
        <Slide
          notes={notes(
            "Caught <b>so many bugs</b> in track/meta reviews",
            "<b>STORY</b>: Bad timing on category id going to prod"
          )}>
          <LonelyHeading>
            All code gets <Point>substantive</Point> &
          </LonelyHeading>
          <LonelyHeading>
            <Point>meta</Point> review
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "<b>STORY</b>: `Event.prototype.stopPropagation` breaking code"
          )}>
          <LonelyHeading>
            Including all <Point>third party</Point> &
          </LonelyHeading>
          <LonelyHeading>
            <Point>internal to the org</Point> vendor code
          </LonelyHeading>
        </Slide>

        {/* ---------------------------------------------------------------
          * THEME - Gatekeepers
          * ---------------------------------------------------------------

            - Gatekeepers: Say "NO" when it's needed.
                - **Idea**: "Protect yourself through processes and tech"
                - **Motivation**: Need tools and champions (people) to stop bad code / ideas.
                - Automate quality
                - Minimize exposure
                - Sometimes the meta team, sometimes exec / PM leadership

          */}
        <Slide id="gatekeepers" bgColor="tertiary" bgImage={images.polygonsGray}>
          <Heading fit caps textColor="primary">
            Gatekeepers
          </Heading>
          <Heading textColor="primary" style={{marginTop: "0.2em", fontSize: "12em"}}>
            <i className="fa fa-shield"></i>
          </Heading>
        </Slide>
        <Slide>
          <Heading size={4} textColor="secondary">
            Protect the frontend through
          </Heading>
          <Heading size={4} textColor="secondary">
            <em>process</em> & <em>architecture</em>
          </Heading>
        </Slide>
        <Slide
          notes={notes(
            "<b>Code review</b> + other processes are part of this",
            "Responsibility of meta team, PMs, executives"
          )}>
          <Heading size={3}>
            Gates & Gatekeepers
          </Heading>
          <List>
            <ListItem>
              <Point>Automate</Point> quality
            </ListItem>
            <ListItem>
              Minimize <Point>risks</Point> / <Point>exposure</Point>
            </ListItem>
            <ListItem>
              Require <Point>performance</Point>
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={3} textColor="red">
            Gatekeeping Challenges
          </Heading>
          <List>
            <ListItem>
              Feature pressure
            </ListItem>
            <ListItem>
              Poor quality code
            </ListItem>
            <ListItem>
              <Point>Unknown</Point> included code
            </ListItem>
          </List>
        </Slide>

        {/* ---------------------------------------------------------------
          * Gatekeepers - Automate Quality
          * ---------------------------------------------------------------

            - TIP: Use quality tooling and automation.
                - Static checking
                - Unit tests: 70% code coverage.
                - Functional tests
                - Hook to CI (the "gate")
                - Part of the build duties:
                    - Must be fast, easy and automatic.
                    - Test should closely resemble dev and prod.
                - And do this ASAP

          */}
        <Slide id="automate-quality" bgImage={images.bgGears}>
          <Heading fit caps textColor="primary">
            <BlackBox bgDarken={0.5}>
              Automate Quality
            </BlackBox>
          </Heading>
        </Slide>
        <Slide
          notes={notes(
            "The low-hanging fruit, easiest quality checks to do"
          )}>
          <LonelyHeading>
            <Point>Static checking</Point>
          </LonelyHeading>
          <LonelyHeading>
            (eslint, jshint, jscs, etc.)
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "Easy to write and run",
            "Brittle over time"
          )}>
          <LonelyHeading>
            Clientside <Point>unit</Point> tests
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "Complement to unit tests",
            "Slow to run, but the 'real deal'"
          )}>
          <LonelyHeading>
            <Point>Integration</Point> / <Point>E2E</Point> tests
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "We use a 70% code coverage threshold",
            "Devs 'buy' exceptions with test tickets",
            "Goal is really just 'execute once'"
          )}>
          <LonelyHeading>
            <Point>Code coverage</Point>
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "Continuous integration _is_ 'the gate'"
          )}>
          <LonelyHeading>
            <Point>Continuous integration</Point> (CI)
          </LonelyHeading>
        </Slide>

        {/* ---------------------------------------------------------------
          * Gatekeepers - Minimize Risk
          * ---------------------------------------------------------------

            - TIP: Minimize exposure to things you can't control.
                - Recognized & identify risks and dangerous parts of the infrastructure.
                - Cross-organization initiatives.
                    - Injected HTML/JS/CSS
                    - Solutions: iFrames, different domains

          */}
        <Slide id="risk" bgImage={images.bgLionTamer} bgDarken={0.30}>
          <Heading fit caps textColor="primary">
            Minimize Risk
          </Heading>
        </Slide>
        <Slide>
          <LonelyHeading>
            Learn / identify your biggest <Point>risk areas</Point>
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "Previous protections: code review, tests, etc.",
            "<b>Architect</b> protection as well"
          )}>
          <LonelyHeading>
            <Point>Protect</Point> yourself wherever possible
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "Our number one source of frontend errors",
            "<b>STORY</b>: Custom HTML, deadlines, quality, no review",
            "<b>Protect</b>: iframe, different domains, etc."
          )}>
          <LonelyHeading>
            Architecture risks:
          </LonelyHeading>
          <LonelyHeading>
            <Point>Injected HTML/CSS/JS</Point>
          </LonelyHeading>
        </Slide>
        <Slide>
          <LonelyHeading>
            Code pattern risks:
          </LonelyHeading>
          <LonelyHeading>
            <Point>Defer & pray</Point>
          </LonelyHeading>
          <CodePane
            lang="javascript"
            source={strip(`
              // I'm guessing...
              var HOPEFULLY_ENOUGH_TIME = 2000;

              // Wait until ready for next step.
              setTimeout(function () {
                theNextStep();
              }, HOPEFULLY_ENOUGH_TIME);
            `)}
            margin="20px auto"
            style={{fontSize: "2em"}}
          />
        </Slide>
        <Slide>
          <LonelyHeading>
            Deployment / process risks:
          </LonelyHeading>
          <LonelyHeading>
            <Point>"Hotfeatures"</Point>
          </LonelyHeading>
        </Slide>

        {/* ---------------------------------------------------------------
          * Gatekeepers - Require Performance
          * ---------------------------------------------------------------

            - Learn more about how and why with other Surge talk:
                - http://surge.omniti.com/2015?patrick-meenan

            - TIP: Require and enforce performance from the start.
                - Developers
                - Project managers
                - Automate tooling to capture
                    - Find Parahuram's talk and link.
                - Write analysis tools _for_ development teams.

            - LESSON: Teams will be "feature-driven" unless perf is a metric and
                explicit requirement.
                - We've made great strides in infrastructure and CDN-level.
                - But, the code is too big and 2+ years into the project, it's
                  really, really painful.

          */}
        <Slide id="performance" bgImage={images.bgMotorbike} bgDarken={0.50}>
          <Heading fit caps textColor="primary">
            Require Performance
          </Heading>
        </Slide>
        <Slide>
          <LonelyHeading>
            Frontend code must be <Point>small</Point> & <Point>fast</Point>
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "<b>STORY</b>: We tried doing this 2 years in. Really tough."
          )}>
          <LonelyHeading>
            Teams are <Point>"feature-driven"</Point>
          </LonelyHeading>
          <LonelyHeading>
            unless performance is <Point>enforced</Point> & <Point>required</Point>
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "Patrick Meenan's Surge talk on Web App perf"
          )}>
          <LonelyHeading>
            Enforce with <Point>audits</Point>
          </LonelyHeading>
          <hr style={{width: "75%"}} />
          <LonelyHeading>
            <Link href="http://surge.omniti.com/2015?patrick-meenan">
              "Web App Performance Measurement, Monitoring and Resiliency"
            </Link>
          </LonelyHeading>
          <LonelyHeading>
            <Link href="http://www.webpagetest.org/">
              www.webpagetest.org
            </Link>
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "Performance work should be on sprints"
          )}>
          <LonelyHeading>
            Enforce with <Point>process</Point>
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "Ideally have CI checks for performance"
          )}>
          <LonelyHeading>
            Enforce with <Point>automation</Point>
          </LonelyHeading>
          <hr style={{width: "75%"}} />
          <LonelyHeading>
            <Link href="http://2015.cascadiajs.com/speakers/parashuram-n">
              "Automating Web Performance Measurement"
            </Link>
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "Our build is complex enough, we had to build reporting tools",
            "<b>STORY</b>: Devs have hard time with deps in lib.js"
          )}>
          <LonelyHeading>
            Build your own <Point>tools</Point> where necessary
          </LonelyHeading>
        </Slide>

        {/* ---------------------------------------------------------------
          * THEME - Lifeguards
          * ---------------------------------------------------------------

            - Lifeguards: Throw out the life preserver when you're drowning.
                - **Idea**: "Create tools to see what's happening in the wild"
                - **Motivation**: Once deployed, no insight into browser apps / bugs.
                - Log
                - Monitor / Alert off the logs.
                - Source Maps / Debugging helpers

            - IMPACT: Errors:
                - Very, very costly.
                - With incredible development speed + so many different browsers, you should be
                  very, very scared

          */}
        <Slide id="lifeguards" bgColor="tertiary" bgImage={images.polygonsGray}>
          <Heading fit caps textColor="primary">
            Lifeguards
          </Heading>
          <Heading textColor="primary" style={{marginTop: "0.2em", fontSize: "12em"}}>
            <i className="fa fa-life-ring"></i>
          </Heading>
        </Slide>
        <Slide>
          <Heading size={4} textColor="secondary">
            Create <em>escape hatches</em> &
          </Heading>
          <Heading size={4} textColor="secondary">
            <em>lifelines</em> in production
          </Heading>
        </Slide>
        <Slide
          notes={notes(
            "These aren't pure 'architecture' points, but so intertwined we can't ignore"
          )}>
          <Heading size={3}>
            Lifeguards & Life Savers
          </Heading>
          <List>
            <ListItem>
              <Point>Logging</Point>, <Point>Monitoring</Point>
            </ListItem>
            <ListItem>
              <Point>Debugging</Point> helpers
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={3} textColor="red">
            Lifeguarding Challenges
          </Heading>
          <List>
            <ListItem>
              Code executes <Point>remotely</Point> on <Point>different browsers</Point>
            </ListItem>
            <ListItem>
              Frontend errors are <Point>costly</Point> & often <Point>invisible</Point>
            </ListItem>
          </List>
        </Slide>

        {/* ---------------------------------------------------------------
          * Lifeguards - Logging, Monitoring
          * ---------------------------------------------------------------

            - TIP: Logging: On the frontend. To a service.
                - Code goes out in the wild, goes wrong and is really, really hard to support.

            - TIP: Monitoring: Observe spikes and idiosyncrasies.

          */}
        <Slide id="logging" bgImage={images.bgCaution} bgDarken={0.3}>
          <Heading fit caps textColor="primary">
            <BlackBox bgDarken={0.3}>
              Logging & Monitoring
            </BlackBox>
          </Heading>
        </Slide>
        <Slide>
          <LonelyHeading>
            Your code <em>executes</em> & <Point>fails</Point>
          </LonelyHeading>
          <LonelyHeading>
            on a variety of <Point>browsers</Point>
          </LonelyHeading>
          <LonelyHeading>
            out <em>in the wild</em>
          </LonelyHeading>
        </Slide>
        <Slide
          notes={notes(
            "Yes, log on the frontend"
          )}>
          <LonelyHeading>
            <Point>Log</Point> & <Point>capture</Point> everything
          </LonelyHeading>
        </Slide>
        <Slide>
          <LonelyHeading>
            Get <Point>errors</Point> & <Point>messages</Point>
          </LonelyHeading>
          <LonelyHeading>
            to a <Point>remote store</Point>
          </LonelyHeading>
        </Slide>
        <Slide>
          <LonelyHeading>
            And then <Point>aggregate</Point>,
          </LonelyHeading>
          <LonelyHeading>
            <Point>report</Point>, & <Point>alert</Point>
          </LonelyHeading>
        </Slide>
        <Slide>
          <Heading size={3}>
            Providers
          </Heading>
          <Layout>
            <Fill>
              <Link href="https://rollbar.com/">
                <Text>Rollbar</Text>
                <Image src={images.logoRollbar} width="35%" />
              </Link>
            </Fill>
            <Fill>
              <Link href="https://www.loggly.com/docs/javascript/">
                <Text>Loggly</Text>
                <Image src={images.logoLoggly} width="35%" />
              </Link>
            </Fill>
          </Layout>
          <Layout>
            <Fill>
              <Link href="https://getsentry.com/welcome/">
                <Text>Sentry</Text>
                <Image src={images.logoSentry} width="35%" />
              </Link>
            </Fill>
            <Fill>
              <Link href="https://airbrake.io/">
                <Text>Airbrake</Text>
                <Image src={images.logoAirbrake} width="35%" />
              </Link>
            </Fill>
          </Layout>
        </Slide>

        {/* ---------------------------------------------------------------
          * Lifeguards - Debugging, Source Maps
          * ---------------------------------------------------------------
          */}
        <Slide id="debugging" bgImage={images.bgAstronautEarth} bgDarken={0.25}>
          <Heading fit caps textColor="primary">
            <BlackBox bgDarken={0.35}>
              Debugging Support
            </BlackBox>
          </Heading>
        </Slide>
        <Slide>
          <LonelyHeading>
            Give developers <Point>life lines</Point>
          </LonelyHeading>
          <LonelyHeading>
            when things go <Point>wrong</Point>
          </LonelyHeading>
        </Slide>
        <Slide>
          <Heading size={4}>You ship this:</Heading>
          <CodePane
            lang="javascript"
            source={strip(`
              !function(){var e="Hello Surge!",a=$("<h1 />");
              a.text(e),$("body").append(a)}();
            `)}
            margin="20px auto"
            style={{fontSize: "2.0em"}}
          />
        </Slide>
        <Slide>
          <Heading size={4}>Your devs want this:</Heading>
          <CodePane
            lang="javascript"
            source={strip(`
              (function () {
                var message = "Hello Surge!";
                var $heading = $("<h1 />");

                $heading.text(message);

                $("body").append($heading);
              }());
            `)}
            margin="20px auto"
            style={{fontSize: "2.0em"}}
          />
        </Slide>
        <Slide
          notes={notes(
            "Great for debugging, but <b>full source</b>"
          )}>
          <Heading size={4}>Source Maps</Heading>
          <CodePane
            lang="javascript"
            source={strip(`
              /* ... LOTS MORE CODE ... */
              [],window._entry=c}();
              //# sourceMappingURL=http://dev.walmart.com:9873/js-dist-frontend/core-bundle.js.map
            `)}
            margin="20px auto"
            style={{fontSize: "2.0em"}}
          />
        </Slide>
        <Slide>
          <LonelyHeading>
            <Point>Publish</Point> in VPN on deployment
          </LonelyHeading>
        </Slide>
        <Slide>
          <LonelyHeading>
            Hidden from <Point>end users</Point>
          </LonelyHeading>
          <LonelyHeading>
            Available to <Point>developers</Point>
          </LonelyHeading>
        </Slide>

        {/* ---------------------------------------------------------------
          * Summary
          * ---------------------------------------------------------------
          */}
        <Slide id="summary">
          <Heading size={3}>
            All together now
          </Heading>
          <Layout>
            <Fill>
              <List>
                <ListItem>A "real" <Point>build</Point></ListItem>
                <ListItem><Point>Organized</Point> code</ListItem>
                <ListItem>
                  The <Point>Meta</Point> team
                </ListItem>
                <ListItem>
                  <Point>Education</Point>
                </ListItem>
                <ListItem>
                  Code <Point>Review</Point>
                </ListItem>
              </List>
            </Fill>
            <Fill>
              <List>
                <ListItem>
                  <Point>Automate</Point> quality
                </ListItem>
                <ListItem>
                  Minimize <Point>risks</Point>
                </ListItem>
                <ListItem>
                  Require <Point>performance</Point>
                </ListItem>
                <ListItem>
                  <Point>Logging</Point>, <Point>Monitoring</Point>
                </ListItem>
                <ListItem>
                  <Point>Debugging</Point> helpers
                </ListItem>
              </List>
            </Fill>
          </Layout>
        </Slide>

        {/* ---------------------------------------------------------------
          * Future
          * ---------------------------------------------------------------

            - THEME: Visionary

            - This has been a complicated tour of where we've been and are now.
            - As a hint to how we are looking to the future, I have just a few
              remaining points...
            - These could alone be a separate talk, so please feel free to
              catch me in the hall later. I'm always happy to talk.
            - ... so without further ado, let's close with...

          */}
        <Slide id="future">
          <Heading size={2}>
            Some parting thoughts on the <em>future</em>
          </Heading>
        </Slide>
        <Slide
          notes={notes(
            "Uncomfortable, but necessary",
            "<b>STORY</b>: A 2 year old site is already 'legacy'",
            "<b>STORY</b>: React: server-side render, efficient DOM"
          )}>
          <LonelyHeading>
            Embrace <Point>change</Point>
          </LonelyHeading>
          <Image src={images.logoReact} />
        </Slide>
        <Slide
          notes={notes(
            "<b>STORY</b>: Targeting <b>components</b> & <b>small repos</b>",
            "<b>STORY</b>: Moving to webpack"
          )}>
          <LonelyHeading>
            Reevaluate & refactor your
          </LonelyHeading>
          <LonelyHeading>
            <Point>infrastructure</Point> & <Point>organization</Point>
          </LonelyHeading>
          <Image src={images.logoWebpack} />
        </Slide>
        <Slide
          notes={notes(
            "Forcing a <b>full stop</b> doesn't work."
          )}>
          <LonelyHeading>
            Have a <Point>transition strategy</Point>
          </LonelyHeading>
        </Slide>
        <Slide bgImage={images.polygons} bgColor="secondary"
          notes={notes(
            "... and that's about it",
            "So here's wishing you..."
          )}>
          <Heading bold fit caps textColor="primary">
            Happy
          </Heading>
          <Heading bold fit caps textColor="primary">
            Wrangling
          </Heading>
        </Slide>

        {/* ---------------------------------------------------------------
          * Thanks
          * --------------------------------------------------------------- */}
        <Slide id="thanks" bgColor="secondary" bgImage={images.polygons}>
          <Heading bold fit caps textColor="primary"
                   style={{marginTop: "1em", marginBottom: "0.75em"}}>
            Thanks!
          </Heading>
          <hr style={{width: "75%", margin: "2.0em auto"}} />
          <Text style={{display: "inline-block", fontSize: "3.5em"}}>
            <Link href="http://surge2015.formidablelabs.com"
                  textColor="lighterGray">
              surge2015.formidablelabs.com
            </Link>
          </Text>
        </Slide>
      </CustomDeck>
    );
  }
}
