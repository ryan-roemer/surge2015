/*eslint-disable no-multiple-empty-lines*/
import React from "react/addons";

// Slide abstractions
// ------------------
// Appear, BlockQuote, Cite, CodePane, Deck, Fill,
// Heading, Image, Layout, Link, ListItem, List, Quote, Slide, Text
import {
  Deck, Heading, Image, Link, Slide, Text, Layout, List, ListItem, Fill
} from "spectacle/src/spectacle";

// Images
// ------
import preloader from "spectacle/src/utils/preloader";

const images = {
  polygons: require("../assets/img/bg/formidable/polygons.svg"),
  polygonsGray: require("../assets/img/bg/formidable/polygons-gray.svg"),
  polygonsLight: require("../assets/img/bg/formidable/polygons-light.svg"),
  logoSquare: require("../assets/img/logo/formidable-square.png"),
  logoText: require("../assets/img/logo/formidable-text.svg")
};

preloader([images.city]);

// Styles
// ------
const styles = {
  title: {
    // Expand this style object as a splat in `styles`.
    secondary: {
      color: "#ccc",
      // textShadow: ((s, c) => {
      //   return `-${s} 0 ${c}, 0 ${s} ${c}, ${s} 0 ${c}, 0 -${s} ${c}`;
      // }("0.025em", "#444"))
    }
  }
};

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
          <Heading size={1} fit caps textColor="primary">
            Wrangling
          </Heading>
          <Heading size={1} fit caps style={{...styles.title.secondary}}>
            Large Scale
          </Heading>
          <Heading size={1} fit caps textColor="primary">
            Frontend Web Applications
          </Heading>
          <div style={{display: "inline-block", marginTop: "2.5em"}}>
            <Link href="https://twitter.com/ryan_roemer">
              <Text bold style={{display: "inline-block", ...styles.title.secondary}}>
                @ryan_roemer
              </Text>
            </Link>
            <Text style={{display: "inline-block", margin: "0 0.35em",
                          ...styles.title.secondary}}>
              |
            </Text>
            <Link href="https://surge2015.formidablelabs.com">
              <Text bold style={{display: "inline-block", ...styles.title.secondary}}>
                surge2015.formidablelabs.com
              </Text>
            </Link>
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
            Browser apps are now <em>business critical</em>.
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
          <Heading size={4} fit caps textColor="primary">
            Lots of JavaScript
          </Heading>
          <Heading size={4} fit caps textColor="secondary">
            In the browser
          </Heading>
          <Heading size={4} fit caps textColor="primary">
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
          <Heading size={4}>
            Let{"'"}s examine large web applications at a <em>highly-trafficked
            </em>, <em>top-five</em> e-commerce website.
          </Heading>
          {/**/}
        </Slide>
        <Slide>
          <Heading size={3}>
            TODO: INSERT SLIDE - Website usage and impact.
          </Heading>
          {/*
            - Traffic numbers
            - Revenue numbers
            - Black Friday, CyberMonday numbers
            */}
        </Slide>
        <Slide>
          <Heading size={1} caps fit>
            The Web Apps
          </Heading>
          <List>
            <ListItem>A <Point>2+</Point> year website rewrite</ListItem>
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
        <Slide>
          <Heading size={1} caps fit>
            The Team
          </Heading>
          <List>
            <ListItem><Point>50+</Point> core frontend engineers</ListItem>
            <ListItem><Point>14</Point> vertical teams / "tracks"</ListItem>
            <ListItem>Multiple developing & integrating organizations</ListItem>
            <ListItem>Meta <code>(JS,CSS,Java)</code> teams</ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={3}>
            TODO: INSERT SLIDE - Demo or picture of homepage.
          </Heading>
        </Slide>
        <Slide>
          <Heading size={3}>
            TODO: INSERT SLIDE - JS breakdown of homepage from atlas-reports.
          </Heading>
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
            <Image src={images.logoSquare}/>
          </Link>
        </Slide>
        <Slide>
          <Heading size={1} caps fit>
            Wrangling Adventures
          </Heading>
          <List>
            <ListItem><Point>JavaScript lead</Point> for site / development teams</ListItem>
            <ListItem>Lead <Point>"Meta JS"</Point> team of 5-8 developers</ListItem>
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

        {/* ---------------------------------------------------------------
          * Challenges: Surviving, Thriving
          * ---------------------------------------------------------------

            - OVERVIEW - Challenges: How are we surviving / thriving?
                - JavaScript
                - Development
                - Production
                - Organizations

            - OVERVIEW - Survival Tactics:
                (Wrangling)
                - Meta Leadership
                - Educate
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
          <Heading size={4} fit caps textColor="tertiary">
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
              <Heading size={5} caps textColor="tertiary">
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
              <Heading size={5} caps textColor="tertiary">
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
        <Slide bgColor="tertiary" bgImage={images.polygonsLight}>
          <Heading size={1} caps fit textColor="tertiary">
            Thanks!
          </Heading>
          <Link href="http://formidablelabs.com">
            <Image width="100%" src={images.logoText} style={{"margin-top": "40px"}}/>
          </Link>
        </Slide>
      </Deck>
    );
  }
}
