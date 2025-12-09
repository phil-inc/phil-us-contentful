import React, { useState, useEffect, useRef } from "react";
import { ContentfulPage } from "types/page";
import cx from "clsx";
import { Link } from "gatsby";

import * as classes from "./navigation.module.css";
import { getPathForSectionAndPage } from "utils/links";

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
                            section?.__typename,
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
                                  {section?.navbarTitle ?? (section?.header ?? section.title)}
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
