import React, { Fragment } from "react";
import Content from "./../Content";
import Navigation from "./../Navigation";
import { usePageContent, useImages } from "./../../../hooks/useWiki.js";
import { SkeletonTheme } from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import "lazysizes";
import "./style.sass";

export const ImagesContext = React.createContext(null);

const Article = ({ force_title }) => {
  let title = force_title ? force_title : useParams()?.title;
  // title = "New_York_City";
  const pageContent = usePageContent(title);
  const images = useImages(title);

  React.useEffect(() => {
    let toggle = document.getElementById("theme-switch");

    let switcher = function(e) {
      e.preventDefault();
      if (document.body.classList.contains("funky")) {
        toggle.innerText = "LIGHT MODE";
        document.body.classList.remove("funky");
      } else {
        toggle.innerText = "DARK MODE";
        document.body.classList.add("funky");
      }
    };
    toggle?.addEventListener("click", switcher);

    return () => toggle.removeEventListener("click", switcher);
  }, []);

  return (
    <ImagesContext.Provider value={{ images }}>
      <Fragment>
        <SkeletonTheme color="transparent">
          <div className="article">
            <div className="hero">
              <div className="hero__title">{title.replace(/_/g, " ")}</div>
              <div className="hero__credit">
                From Wikipedia, the free encyclopedia
              </div>
              <Content content={pageContent?.children} />
            </div>
          </div>
        </SkeletonTheme>
        <Navigation headings={pageContent?.headings} />
      </Fragment>
    </ImagesContext.Provider>
  );
};

export default Article;
