import React, { useState, useEffect, useRef } from "react";
import * as classes from "./navigation.module.css";
import cx from "clsx";
import { ContentfulPage } from "types/page";
import { Link, navigate } from "gatsby";
import { getPathForSectionAndPage } from "utils/links";
import {  PATH, SLUGS } from "constants/routes";

export function Navigation({ pages }: { pages: ContentfulPage[] }) {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);

  return (
    <nav className={classes.navbar} >
      <div className={classes.navContainer}>
        <ul className={classes.navMenu}>
          {pages
            .filter((page) => page.title !== "Home")
            .map((page, index) => (
              <>
                <li key={index} className={classes.navItem}   onMouseEnter={() => setVisibleIndex(index)}
                onMouseLeave={() => setVisibleIndex(null)}
          >
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); 
                      if(page.slug === SLUGS.SOLUTION){ 
                        navigate(PATH.SOLUTION);
                      }
                    }}
                    className={cx(classes.navLink, {
                    
                    })}
                  >
                    {page.title}
                  </button>
                  {visibleIndex === index && (
                    <div className={classes.dropdownContainer}>
                    <ul className={classes.dropdown}>
                      {page.sections
                        .filter(
                          (section) =>
                            (section.header?.length ?? section.title?.length) &&
                            !section.hideNavigationAnchor &&
                            !section.isHidden,
                        )
                        .map((section, subIndex) => {
                          const path = getPathForSectionAndPage(
                            page.title,
                            section.header ?? section.title,
                            page.slug,
                            section.slug,
                          );

                          return (
                            <div>
                              <div className={classes.indicator}></div>

                              <li
                                key={subIndex}
                                className={classes.dropdownItem}
                              >
                                <Link
                                  to={path}
                                  className={classes.dropdownLink}
                                >
                                  {section.header ?? section.title}
                                </Link>
                              </li>
                            </div>
                          );
                        })}
                    </ul>
                    </div>
                  )}
                </li>
              </>
            ))}
        </ul>
      </div>
    </nav>
  );
}
