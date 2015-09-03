/*eslint-disable no-multiple-empty-lines*/
import React from "react/addons";

// Slide abstractions
// ------------------
// Appear, BlockQuote, Cite, CodePane, Deck, Fill,
// Heading, Image, Layout, Link, ListItem, List, Quote, Slide, Text
import {
  Deck, CodePane, Heading, Image, Link, Slide, Text, Layout, List, ListItem, Fill
} from "spectacle/src/spectacle";

// Images
// ------
import preloader from "spectacle/src/utils/preloader";

const images = {
  polygons: require("../assets/img/bg/formidable/formidangles-dark.svg"),
  logoRed: require("../assets/img/logo/formidable-red.svg"),
  logoBlack: require("../assets/img/logo/formidable-black.svg"),
  wmHomepage: require("../assets/img/wml/screen-homepage.png"),
  wmItem: require("../assets/img/wml/screen-item-ipad.png"),
  wmReport: require("../assets/img/wml/report-homepage.png"),
  wmScripts: require("../assets/img/wml/scripts-homepage.png")
};

preloader([images.city]);

// Themes
// ------
import theme from "../themes/formidable/index";

// Components
// ----------
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

// A TODO for later.
class Todo extends React.Component {
  render() {
    return (
      <div>
      <br />
        <span style={{backgroundColor: "yellow", fontFamily: "monospace", fontSize: "3em",
                      marginTop: "1.5em", fontWeight: "bold"}}>
          TODO: {this.props.children}
        </span>
      </div>
    );
  }
}

Todo.propTypes = {
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
//
// TODO: Handle spaces _within_ text.
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
    .filter((x) => x && x !== indent)
    .join("\n");
};

// Presentation
// ------------
export default class extends React.Component {
  render() {
    return (
      <Deck progress="bar" transition={["slide"]}>
        {/* ---------------------------------------------------------------
          * Title
          * --------------------------------------------------------------- */}
        <Slide bgImage={images.polygons}>
          <Text fit bold caps textColor={theme.colors.primary} fontFamily={theme.fonts.primary}>
            Wrangling
          </Text>
          <Text fit bold caps textColor={theme.colors.primary} fontFamily={theme.fonts.primary}>
            Large Scale
          </Text>
          <Text fit bold caps textColor={theme.colors.primary} fontFamily={theme.fonts.primary}>
            Frontend Web Applications
          </Text>
          <div style={{display: "inline-block", marginTop: "2.5em"}}>
            <Text style={{display: "inline-block"}}>
              <Link href="https://twitter.com/ryan_roemer">
                @ryan_roemer
              </Link>
            </Text>
            <Text style={{display: "inline-block", margin: "0 0.35em"}}
                  textColor={theme.colors.darkerGray}>
              |
            </Text>
            <Text style={{display: "inline-block"}}>
              <Link href="http://surge2015.formidablelabs.com">
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
        <Slide>
          <Heading size={2}>
            The web is <em>massively</em> moving to the <em>frontend</em>
          </Heading>
          {/*
            - Browsers are getting faster and better all the time.
            - Standards and technologies are exploding everywhere.
            */}
        </Slide>
        <Slide>
          <Heading size={2}>
            Users want <em>rich</em> and <em>seamless</em> experiences
          </Heading>
          {/*
            - Waiting for page refreshes are a thing of the past.
            - Single Page Applications deliver quick, slick experiences.
            */}
        </Slide>
        <Slide>
          <Heading size={2}>
            Product owners want <em>fast</em> and <em>nimble</em> apps
          </Heading>
          {/*
            - JavaScript is easy to iterate and meld to requirements.
            */}
        </Slide>
        <Slide>
          <Heading size={2}>
            Browser apps are now <em>business critical</em>
          </Heading>
          {/*
            - The number of websites anywhere that you can turn off JS is decreasing rapidly.
            */}
        </Slide>
        <Slide>
          <Heading size={2}>
            And, yes, even for the <em>enterprise</em>
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2}>
            ... which means
          </Heading>
          {/*
            - JavaScript has won.
            - And we are destined for a web application world of...
            */}
        </Slide>
        <Slide bgColor="tertiary">
          <Heading size={4} bold fit caps textColor={theme.colors.lightestGray}>
            Lots of JavaScript
          </Heading>
          <Heading size={4} bold fit caps textColor={theme.colors.primary}>
            In the browser
          </Heading>
          <Heading size={4} bold fit caps textColor={theme.colors.lightestGray}>
            Written by large teams
          </Heading>
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
        <Slide>
          <Heading size={4} textColor="secondary">
            Let{"'"}s dig into some large apps at a <em>high-traffic
            </em>, <em>top-five</em> e-commerce site
          </Heading>
          {/**/}
        </Slide>
        <Slide>
          <Link href="http://walmart.com">
            <Image src={images.wmItem} width="80%"/>
          </Link>
          {/*
            - walmart.com
            */}
        </Slide>
        <Slide>
          <Heading size={1} caps fit textColor="secondary">
            The Numbers
          </Heading>
          <List>
            <ListItem>
              <Link href={links.wmFy2014}><Point>$10 billion
              </Point></Link> in sales for FY 2014 (30% increase)
              {/*
                - "Each operating segment strengthened its e-commerce platforms, and customers
                   responded, driving annual Global eCommerce sales, including acquisitions, above
                   the $10-billion mark, a 30 percent increase."
               */}
            </ListItem>
            <ListItem>
              <Link href={links.wmFy2014}><Point>$13 billion</Point></Link> estimate for FY 2015
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
            <ListItem>
              Cyber Monday 2014 orders surpassed <em>all previous records</em>
            </ListItem>
          </List>
          {/*
            - 70% mobile for Thanksgiving - Cyber Monday 2014
            - 3472 page views / second estimate from 1.5 billion 2014 number.
            */}
        </Slide>
        <Slide>
          <Heading size={1} caps fit>
            The Dev Team
          </Heading>
          <List>
            <ListItem>A <Point>2+</Point> year website rewrite</ListItem>
            <ListItem><Point>50+</Point> core frontend engineers</ListItem>
            <ListItem><Point>14</Point> vertical teams / "tracks"</ListItem>
            <ListItem>Multiple developing & integrating organizations</ListItem>
            <ListItem>Meta (<code>JS,CSS,Java</code>) teams</ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={1} caps fit>
            The Applications
          </Heading>
          <List>
            <ListItem>
              Transition from <Point>"old"</Point> to <Point>"new"</Point> world.
            </ListItem>
            <ListItem>
              Mostly <em>multiple</em> entry point (applicatons) per page
            </ListItem>
            <ListItem>
              Handful of <em>Single Page Applications</em> (SPAs)
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={1} caps fit>
            The Code
          </Heading>
          <List>
            <ListItem>
              <Point>50+</Point> JS "entry points", ranging
              from <Point>1K - 145K</Point>
            </ListItem>
            <ListItem>Shared <Point>300K</Point> common library</ListItem>
            <ListItem>Additional external and internal JS apps</ListItem>
            <ListItem>
              <Point>650K</Point> lines, <Point>2500</Point> files of JavaScript source
            </ListItem>
            <ListItem>
              <Point>More JavaScript</Point> lines and files than <Point>Java</Point>
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

        {/* ---------------------------------------------------------------
          * Ryan & Meta JS
          * ---------------------------------------------------------------

            - I work for Formidable Labs.
                - A software development consultancy in Seattle, Wa.
                - Help teams from startups to Fortune 500 companies.
                - One of our largest clients.

            - My role
                - JavaScript lead for the website
                - Lead the "Meta JS" team. (Also Meta CSS, Meta Java teams)

          */}
        <Slide bgColor="secondary">
          <Heading size={4} fit caps textColor="primary">
            A Tour Through
          </Heading>
          <Heading size={4} fit caps textColor="tertiary">
           the Trenches
          </Heading>
        </Slide>
        <Slide bgColor="secondary">
          <Link href="http://formidablelabs.com">
            <Image width="100%" src={images.logoRed}/>
          </Link>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={1} caps fit textColor={theme.colors.lighterGray}>
            Wrangling Adventures
          </Heading>
          <List textColor="primary">
            <ListItem><Point>JavaScript lead</Point> for site / development teams</ListItem>
            <ListItem>Lead <Point>“Meta JS”</Point> team of 5-8 developers</ListItem>
            <ListItem>Part of new core web team</ListItem>
          </List>
          {/*
            - TODO: Maybe an image of my face? Or a twitter handle?

            - Started with the project near the beginning of the redesign.
            - Authored most parts of the frontend infrastructure.
            - Point person on all things JS-related wrt production, other teams, etc.
            - ... and here are some of my experiences helping support and ship the website.
            */}
        </Slide>
        <Slide>
          {/*
            - So many moving parts, details and complexities.
            - I'm going to focus on just a few of things we've found critical
              to keeping our large scale applications up and running.
            */}
          <Heading size={3}>
            <em>A few battle-tested tips from the field...</em>
          </Heading>
        </Slide>

        {/* TODO: Move into "Challenges" as intro case study? */}
        {/* ---------------------------------------------------------------
          * Case Study - Homepage
          * ---------------------------------------------------------------

            - Page scripts
            - Entry points
          */}
        <Slide bgColor="tertiary">
          <Heading size={4} fit caps textColor="primary">
            The Homepage
          </Heading>
        </Slide>
        <Slide>
          <Link href="http://walmart.com">
            <Image src={images.wmHomepage} width="80%"/>
          </Link>
          {/*
            - This is the homepage.
            - Let's look at what goes into it.
            */}
        </Slide>
        <Slide>
          <Heading size={1} caps fit textColor="secondary">
            JS on the Homepage
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
          <Heading size={1} caps fit>
            Homepage - Scripts
          </Heading>
          {/*eslint-disable max-len*/}
          <CodePane
            lang="html"
            source={strip(`
              <script async="" src="//i5.walmartimages.com/dfw/4ff9c6c9-1217/k2-_ce6b2cd5-7246-488c-9811-0f03b44ffd05.v325.js"/>
              <script src="//fonts.walmart.com/fqp0lia.js" type="text/javascript"/>
              <script><![CDATA[var TBRewriteHostAltWeight = 10.000000;]]></script><script src="//a14.wal.co/capabilities.min.js"/>
              <script async="" src="//i5.walmartimages.com/dfw/4ff9c6c9-2c86/k2-_1cf91030-5b66-42d4-88af-42da1d47cf61.v314.js"/>
              <script src="//www.google.com/adsense/search/ads.js"/>
              <script src="//i5.walmartimages.com/dfw/63fd9f59-dd5c/k2-_136e85ec-4952-4931-a69f-d808d78a8d47.v1.js"/>
              <script src="//i5.walmartimages.com/dfw/63fd9f59-3c31/k2-_60b82d0b-f55d-49f9-a027-6ee71de83b4b.v1.js"/>
              <script src="//a14.wal.co/cdn-test.min.js"/>
            `)}
            margin="20px auto"
            style={{fontSize: "1.5em"}}
          />
          {/*eslint-enable max-len*/}
        </Slide>
        <Slide>
          <Heading size={1} caps fit>
            Homepage - Scripts
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
          {/*
            - 28 various scripts on the page in HTML
            - More can be loaded by JS
            - 2 website core: config-map, core-bundle.
            - 2 from CDN infrastructure
            - 2 internal ads integration
            - 2 Google ads
            - 1 fonts
            - 1 polyfill
            - 18 inline script tags.
            */}
        </Slide>
        <Slide>
          <Heading size={1} caps fit>
            Homepage - Entry Points
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
            style={{fontSize: "1.5em"}}
          />
        </Slide>
        <Slide>
          <Heading size={1} caps fit textColor="secondary">
            Homepage - Entry Points
          </Heading>
          <List>
            <ListItem>Asynchronously loaded</ListItem>
            <ListItem><Point>1</Point> shared library</ListItem>
            <ListItem><Point>4</Point> primary entry points</ListItem>
            <ListItem><Point>2</Point> deferred entry points</ListItem>
          </List>
          {/*
            - 6 entry points (2 deferred).
            - 1 shared library
            - Caching analysis (for portion of shared library used)
            */}
        </Slide>

        {/* ---------------------------------------------------------------
          * Challenges: Surviving, Thriving
          * ---------------------------------------------------------------

            - TODO: Theme of "10 tips + 1 future (?)"

            - OVERVIEW - Challenges: How are we surviving / thriving?
                - JavaScript
                - Development
                - Production
                - Organizations

            - OVERVIEW - Survival Tactics:
                (Wrangling)
                - Meta Leadership
                - Educate (TODO: Combine with leadership.)
                - Review everything
                - Automate quality
                (Infrastructure)
                - Build
                - Log
                - Monitor
                - Debugging "life lines"
                - Anticipate failures
                - Minimize exposure

            - Surviving JavaScript
                - The Wild, Wild West
                - The Good:
                    - It's flexible, developer-friendly, and scalable.

                - The Bad:
                    - Flexible almost to a fault (monkey patching everywhere)
                    - Tough to do correctly
                    - ... in all browsers
                    - Code must be small and avoid duplication
                    - The technology ecosystem changes at a ridiculous rate

                - TIP: Meta team - Coordinate team / infrastructure to funnel.
                    - Common open source / vendor libraries
                    - Conventions and code review for the team
                    - Utilities and guidance.
                    - And do this ASAP.

                - TIP: You need a real "build" now.
                    - JS is complicated: Minification, ES6, Polyfills,
                    - CDN interaction and dev. vs. prod mode.
                    - Make it as **fast** as possible.
                        - Especially in development.
                    - Your Meta team should own this.

                - SUB-TIP: Keep development as close to production as possible, dev-wise.
                    - Including full CDN mode if possible.

                - SUB-TIP: ... get ready for a bumpy ride.

            - Surviving Development
                - Big teams
                    - Backend dev's learning the frontend.
                    - Frontend dev's unfamiliar with large apps, code quality, etc.
                    - TIP: Education
                        - Good documentation

                - TIP: Meta team - Organize your code.
                    - Going to have enormous amount of code.
                    - One unified build.
                    - Originally, a monolith repo, now multiple track repos.
                    - Shared Java + JS
                        - LESSON: Original decision to nest JS deeply in Java has been painful.

                - TIP: Meta team - Review all your code, even vendor code.
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

                - TIP: Use quality tooling and automation.
                    - Static checking
                    - Unit tests: 70% code coverage.
                    - Functional tests
                    - And do this ASAP

            - Surviving Production
                - IMPACT: Errors:
                    - Very, very costly.
                    - With incredible development speed + so many different browsers, you should be
                      very, very scared
                      .
                - TIP: Logging: On the frontend. To a service.
                    - Code goes out in the wild, goes wrong and is really, really hard to support.

                - TIP: Monitoring: Observe spikes and idiosyncrasies.

                - TIP: Debugging: Source maps

                - TIP: Learn and anticipate your failures.
                    - Your JS webapp is most likely to fail: TODO_INSERT_SCENARIOS
                    - Learn your own app / organization's weak points.

                - TIP: Plan for spikes
                    - Spikes: Black Friday, Cyber Monday
                    - Like usual, just more system stress and higher error penalties.
                    - Code freezes
                    - Exhaustive testing
                    - Oncall team
                    - TODO: A takeway / concise point (?)

            - Surviving the Organization
                - Cross-organization initiatives.
                    - Injected HTML/JS/CSS
                - TIP: Minimize exposure to things you can't control.
                    - iFrames
          */}
        <Slide bgColor="secondary">
          <Heading size={4} fit caps textColor="primary">
            Challenges
          </Heading>
        </Slide>
        <Slide>
          <Heading size={4} fit caps>
            Challenges
          </Heading>
          <Layout>
            <Fill>
              <List>
                <ListItem>
                  JavaScript
                </ListItem>
                <ListItem>
                  Development
                </ListItem>
              </List>
            </Fill>
            <Fill>
              <List>
                <ListItem>
                  Production
                </ListItem>
                <ListItem>
                  Organizations
                </ListItem>
              </List>
            </Fill>
          </Layout>
        </Slide>

        <Slide bgColor="secondary">
          <Heading size={4} fit caps textColor="primary">
            Survival
          </Heading>
          <Heading size={4} fit caps textColor="primary">
            Tactics
          </Heading>
        </Slide>
        <Slide>
          <Layout>
            <Fill>
              <Heading size={5} caps>
                Wrangling
              </Heading>
              <List>
                <ListItem>
                  Meta Leadership
                </ListItem>
                <ListItem>
                  Educate
                </ListItem>
                <ListItem>
                  Review everything
                </ListItem>
                <ListItem>
                  Automate quality
                </ListItem>
              </List>
            </Fill>
            <Fill>
              <Heading size={5} caps>
                Infrastructure
              </Heading>
              <List>
                <ListItem>
                  Build
                </ListItem>
                <ListItem>
                  Log, Monitor
                </ListItem>
                <ListItem>
                  Debugging "life lines"
                </ListItem>
                <ListItem>
                  Anticipate failures
                </ListItem>
                <ListItem>
                  Minimize exposure
                </ListItem>
              </List>
            </Fill>
          </Layout>
        </Slide>




        {/* TODO HERE: Keep writing the slides... */}






        {/* TODO: CUT THIS SECTION?
          * ---------------------------------------------------------------
          * Past
          * ---------------------------------------------------------------

            - Starting point:
                - A redesign of the site.
                - A 2+ year effort.

            - Getting to production
                - Performance: Not a "from the start" mandate. And tough ever
                  since.
                    - Get into place ASAP, which actual architecture support.
                    - Hat tip to other perf talk.
                    - TIP: Analysis tools _for_ the development team.
                        - But, the work for the dev. teams is **hard**.
                        - Maybe a demo.
                    - LESSON: Teams will be "feature-driven" unless perf is a metric and
                      explicit requirement.


        // TODO: Perf analysis tools slides / images
        <Slide>
          <Heading size={1} caps fit>
            Homepage - Scripts
          </Heading>
          <Image src={images.wmScripts} width="90%"/>
        </Slide>
        <Slide>
          <Heading size={1} caps fit textColor="secondary">
            Homepage - Entry Points
          </Heading>
          <Image src={images.wmReport} width="90%"/>
        </Slide>
          */}





        {/* ---------------------------------------------------------------
          * Future
          * ---------------------------------------------------------------

            - TODO(IDEA): "Surviving the Future" / "Surviving Indefinitely"
            - TODO(IDEA): end with "THRIVE!"
            - TODO: Transition to "THANKS".

            - TIP: Embrace change, even if uncomfortable.
                - Most of the code in a huge application will be aging / legacy
                  by the time you actually ship it.
                - Keep up with the times, and re-examine what you should be doing.
                    - And especially for JavaScript.
                - STORY: React: server-side render, efficient DOM

            - TIP: Refactor infrastructure & organization
                - TIP: Many, many small repositories
                    - Components
                    - Apps
                    - Infrastructure

                - TIP: Lessen the direct role of Meta teams
                    - Opt for "guidance"
                    - And autonomy for tracks sooner.

            - TIP: Transition strategies.
                - So important to support teams through transitions.
          */}



        {/* ---------------------------------------------------------------
          * Thanks
          * --------------------------------------------------------------- */}
        <Slide bgColor="secondary" bgImage={images.polygons}>
          <Heading size={1} bold caps fit textColor="primary"
                   style={{marginTop: "1em", marginBottom: "0.75em"}}>
            Thanks!
          </Heading>
          <Link href="http://formidablelabs.com">
            <Image width="40%" src={images.logoRed} />
          </Link>
        </Slide>
      </Deck>
    );
  }
}
