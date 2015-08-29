/*eslint-disable no-multiple-empty-lines*/
import React from "react/addons";

// Slide abstractions
// ------------------
// Appear, BlockQuote, Cite, CodePane, Deck, Fill,
// Heading, Image, Layout, Link, ListItem, List, Quote, Slide, Text
import {
  Deck, Heading, Image, Link, Slide, Text, List, ListItem
} from "spectacle/src/spectacle";

// Images
// ------
import preloader from "spectacle/src/utils/preloader";

const images = {
  polygons: require("../assets/img/polygons.svg"),
  polygonsGray: require("../assets/img/polygons-gray.svg"),
  polygonsLight: require("../assets/img/polygons-light.svg"),
  city: require("spectacle/presentation/city.jpg"),
  logo: require("spectacle/presentation/formidable-logo.svg")
};

preloader([images.city]);

// Styles
// ------
const styles = {
  title: {
    // Expand this style object as a splat in `styles`.
    secondary: {
      color: "#C5C3C6",
      textShadow: ((s, c) => {
        return `-${s} 0 ${c}, 0 ${s} ${c}, ${s} 0 ${c}, 0 -${s} ${c}`;
      }("0.025em", "#444"))
    }
  }
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
          * Large Scale Web Applications (Present)
          * ---------------------------------------------------------------

            - Start with a BANG! Big numbers, big stakes.
                - Let's talk about: LARGE. SCALE. WEB APPS.
                - This is everyone's future.

            - It's Time for the Enterprise
                - Enterprise's time has come. And we're going to talk it through.
                - walmart.com e-commerce site. Traffic, orders, spikes, etc.
                - Large amounts of JavaScript. Trend to frontend.

            - Challenges
                - Big applications
                - Big teams
                    - Backend dev's learning the frontend.
                    - Frontend dev's unfamiliar with large apps, code quality, etc.

            - Surviving development
                - Code and infrastructure
                    - One unified build.
                    - Multiple track repos: shared JavaScript + JS
                - Quality
                    - Static checking
                    - Unit tests: 70% code coverage.
                    - Functional tests

            - Surviving production
                - Logging: On the frontend.
                - Deployment: The build, CDN
                - Debugging: Source maps
          */}

        {/* Large. Scale. Web Apps. */}
        {/* TODO SLIDE IDEA: "Welcome to THE PRESENT" */}
        <Slide>
          <Heading size={2}>
            The web is <em>massively</em> moving to the <em>frontend</em>.
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2}>
            Users want <em>rich</em> and <em>seamless</em> experiences.
          </Heading>
        </Slide>
        <Slide>
          <Heading size={2}>
            Product owners want <em>fast</em> and <em>nimble</em> applications.
          </Heading>
        </Slide>

        {/* Quantifying, Examining Large Scale Apps */}


        {/* ---------------------------------------------------------------
          * Past
          * ---------------------------------------------------------------

            - Starting point: A redesign of the site.
            - Getting to production
                - Performance: Not a "from the start" mandate. And tough ever
                  since.
                    - Get into place ASAP, which actual architecture support.
                    - Hat tip to other perf talk.
                    - Maybe a demo.
          */}





        {/* ---------------------------------------------------------------
          * Future
          * ---------------------------------------------------------------

            - New technologies.
                - React: server-side render, efficient DOM
            - Organization and structure
                - Many, many small repositories
                    - Components
                    - Apps
                    - Infrastructure
            - Transition strategies.
                - So important to support teams through transitions.
          */}




        {/* ---------------------------------------------------------------
          * Motivation / Introduction
          * --------------------------------------------------------------- */}
        <Slide>
          <Heading size={1} caps fit>
            Why are we here?
          </Heading>
          <Heading size={4} textColor="secondary">
            (Executive summary)
          </Heading>
          <List>
            <ListItem>
              Web applications are <strong>growing</strong> in <em>size</em> and
              <em>function</em>.
            </ListItem>
            <ListItem>
              Developed by larger <strong>frontend teams</strong>.
            </ListItem>
            <ListItem>
              Harder to build, deploy, maintain, and monitor.
            </ListItem>
            <ListItem>
              ... and now <strong>critical</strong> to the business.
            </ListItem>
          </List>
        </Slide>

        {/* TODO HERE

            - INTRODUCTION
                - Need something fast, quick and to the point.
                - Maybe stats about a web app / dev team? (team size, code size, transactions, etc.)

            - OVERALL THEME - Wild West, "Large"

            - Dive into each of the bullet points above.
                - Larger Apps
                    - We want fast, responsive apps.
                    - Have enormous possibilities: e.g., React with server-side render, bootstrap,
                      into SPA
                    - ... but the code bases are getting much, much larger.
                - Larger Teams
                    - With varying levels of experience.
                        - HTML / CSS dev's learning large scale applications
                        - Backend dev's learning the frontend.
                - Harder to build / deploy / maintain / monitor
                    - JS is the Wild, Wild West [image: wild west, cowboys]
                    - Frameworks change every week
                    - Libraries are of varying quality
                    - We now have "The Build" for JS because it's that complicated.
                        - Optimization for JS / web applications is complicated.
                    - Code goes out in the wild, goes wrong and is really, really hard to support.
                - Critical
                    - The future is JS is on the critical path for apps to work.
                    - JS errors are 5 or 6 figure issues.

            - INTRO: Introduction to Ryan / Formidable
                - Help teams from startups to Fortune 500 companies.
                - Talk about experiences with top 5 e-commerce website redesign.
                - With large team
                - Enormous code base.
                - Widespread reach and traffic.
                - Enormous array of supported browsers.

            - THE POINT: Hone this down.

            - ROADMAP / OUTLINE: Hone this down.
                - TODO: Extract each of the bullet points from abstract on website.

            - Failures & Lessons: DO SECTION

            - The Future: DO SECTION







        <Slide bgImage={images.city} bgDarken={0.75}>
          <Heading size={1} caps fit textColor="primary">
            TODO
          </Heading>

          <Heading size={1} caps fit textColor="tertiary">
            ADD SOME SECTIONS
          </Heading>

          <Heading size={1} caps fit textColor="primary">
            AND IMAGES
          </Heading>

        </Slide>

         */}

        {/* ---------------------------------------------------------------
          * Thanks
          * --------------------------------------------------------------- */}
        <Slide bgColor="tertiary" bgImage={images.polygonsLight}>
          <Heading size={1} caps fit textColor="tertiary">
            Thanks!
          </Heading>
          <Link href="http://formidablelabs.com">
            <Image width="100%" src={images.logo} style={{"margin-top": "40px"}}/>
          </Link>
        </Slide>
      </Deck>
    );
  }
}
