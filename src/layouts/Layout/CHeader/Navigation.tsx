import React, { useState, useEffect, useRef } from "react";
import * as classes from "./navigation.module.css";
import cx from "clsx";
import { ContentfulPage } from "types/page";
import { Link } from "gatsby";
import { getPathForSectionAndPage } from "utils/links";

export function Navigation({ pages }: { pages: ContentfulPage[] }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // Handle click outside to close the dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  return (
    <nav className={classes.navbar} ref={menuRef}>
      <div className={classes.navContainer}>
        <ul className={classes.navMenu}>

          {pages
            .filter((page) => page.title !== "Home")
            .map((page, index) => (
              <>
              <li key={index} className={classes.navItem}>
      
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMenu(page.title);
                  }}
                  className={cx(classes.navLink, {
                    [classes.active]: openMenu === page.title,
                  })}
                >
                  {page.title}
                </button>
                {openMenu === page.title && (
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
                          <>
              <div className={classes.indicator}></div>

                          <li key={subIndex} className={classes.dropdownItem}>
                            <Link to={path} className={classes.dropdownLink}>
                              {section.header ?? section.title}
                            </Link>
                          </li>
                          </>

                        );
                      })}
                  </ul>
                )}
              </li>
              </>
            ))}
        </ul>
      </div>
    </nav>
  );
}
