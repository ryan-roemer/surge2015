import React from "react/addons";

// Slide abstractions
// ------------------
// Appear, BlockQuote, Cite, CodePane, Deck, Fill,
// Heading, Image, Layout, Link, ListItem, List, Quote, Slide, Text
import {
  Appear, Deck, Heading, Image, Link, Slide, Text, List, ListItem
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
    secondary: "#dcb"
  },
  textShadowBlackOutline: ((s, c) => {
    return `-${s} 0 ${c}, 0 ${s} ${c}, ${s} 0 ${c}, 0 -${s} ${c}`;
  }("0.025em", "#ccc"))
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
          <Heading size={1} fit caps margin="-20px 0px">
            Wrangling
          </Heading>
          <Heading size={1} fit caps margin="-20px 0px" textColor={styles.title.secondary}>
            Large Scale
          </Heading>
          <Heading size={1} fit caps margin="-20px 0px">
            Frontend Web Applications
          </Heading>
          <div style={{display: "inline-block", marginTop: "2.5em"}}>
            <Link href="https://twitter.com/ryan_roemer">
              <Text bold style={{display: "inline-block"}} textColor={styles.title.secondary}>
                @ryan_roemer
              </Text>
            </Link>
            <Text style={{display: "inline-block", "margin": "0px 0.35em"}}
                  textColor={styles.title.secondary}>
              |
            </Text>
            <Link href="https://surge2015.formidablelabs.com">
              <Text bold style={{display: "inline-block"}} textColor={styles.title.secondary}>
                surge2015.formidablelabs.com
              </Text>
            </Link>
          </div>
        </Slide>

        {/* ---------------------------------------------------------------
          * Motivation / Introduction
          * --------------------------------------------------------------- */}
        <Slide>
          <Heading size={1} caps fit>
            Why are we here?
          </Heading>
          <Heading size={4} textColor={styles.title.secondary}><Appear fid="1">
            (<em>Executive summary</em>)
          </Appear></Heading>
          <List>
            <ListItem><Appear fid="2">
              Web applications are <strong>growing</strong> in <em>size</em> and <em>function</em>.
            </Appear></ListItem>
            <ListItem><Appear fid="3">
              Developed by larger <strong>frontend teams</strong>.
            </Appear></ListItem>
            <ListItem><Appear fid="4">
              Harder to build, deploy, maintain, and monitor.
            </Appear></ListItem>
            <ListItem><Appear fid="4">
              ... and now <strong>critical</strong> to the business.
            </Appear></ListItem>
          </List>
        </Slide>

        {/*eslint-disable no-multiple-empty-lines*/
         /* TODO HERE

            - OVERALL THEME - Wild West, "Large"

            - Dive into each of the bullet points above.
                - Larger Apps
                    - We want fast, responsive apps.
                    - Have enormous possibilities: e.g., React with serevr-side render, bootstrap, into SPA
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








         *//*eslint-enable no-multiple-empty-lines*/}

        <Slide bgImage={images.city} bgDarken={0.75}>
          <Appear fid="1">
            <Heading size={1} caps fit textColor="primary">
              TODO
            </Heading>
          </Appear>
          <Appear fid="2">
            <Heading size={1} caps fit textColor="tertiary">
              ADD SOME SECTIONS
            </Heading>
          </Appear>
          <Appear fid="3">
            <Heading size={1} caps fit textColor="primary">
              AND IMAGES
            </Heading>
          </Appear>
        </Slide>

        {/* ---------------------------------------------------------------
          * Thanks
          * --------------------------------------------------------------- */}
        <Slide bgColor="tertiary" bgImage={images.polygonsLight}>
          <Heading size={1} caps fit textColor="primary">
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
