import React from "react/addons";

// Slide abstractions
// ------------------
// Appear, BlockQuote, Cite, CodePane, Deck, Fill,
// Heading, Image, Layout, Link, ListItem, List, Quote, Slide, Text
import {
  Appear, Deck, Heading, Image, Link, Slide, Text
} from "spectacle/src/spectacle";

// Images
// ------
import preloader from "spectacle/src/utils/preloader";

const images = {
  polygons: require("../assets/img/polygons.svg"),
  polygonsGray: require("../assets/img/polygons-gray.svg"),
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
        <Slide transition={["slide"]} bgImage={images.polygons}>
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

        <Slide transition={["slide"]} bgImage={images.city} bgDarken={0.75}>
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

        <Slide transition={["spin", "slide"]} bgColor="tertiary">
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
