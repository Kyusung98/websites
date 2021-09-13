import React from "react";
import { styled } from "gatsby-theme-stitches/src/stitches.config";

import { ReactComponent as DaangnLogo } from "~/image/daangn-ad_logo.svg"
import { ReactComponent as IconCall } from "~/image/icon_call.svg";
import { rem } from "polished";

import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export const BannerTitle = () => {
  const [isWhite, setWhite] = React.useState<boolean>(false);
  const [mobile, setMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () =>
    window.pageYOffset > 0 ? setWhite(true) : setWhite(false);

  return (
    <Wrapper color={isWhite ? "white" : "default"}>
      <DaangnLogo />
      <QuestionInfo>
        <IconCall />
        <TelLink
          href="tel://1644-9736"
        >
          <p>
            광고문의 <mark>1644-9736</mark>
          </p>
        </TelLink>
      </QuestionInfo>
    </Wrapper>
  );
};

const Wrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: 68,
  paddingX: rem(24),
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  transition: "0.5s",
  variants: {
    color: {
      white: {
        backgroundColor: "$white",
      },
      default: {
        transparent: {
          backgroundColor: "transparent",
        },
      },
    },
  },
  "@md": {
    paddingX: rem(140),
  },
});

const QuestionInfo = styled("div", {
  display: "flex",
  alignItems: "center",
  typography: "$body2",
  fontWeight: "bold",

  p: { marginX: 8 },
  mark: {
    backgroundColor: "transparent",
    color: "$carrot500",
    display: "none",
    "@md": {
      display: "inline",
    },
  },
});

const TelLink = styled("a", {
  color: "$black",
  textDecoration: "none",
});
