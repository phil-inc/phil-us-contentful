import React, { useState } from "react";
import * as classes from "./navigation.module.css";
import cx from "clsx";

export function Navigation() {
  const [openMenu, setOpenMenu] = useState(null);

  // Navigation Data
  const navItems = [
    { title: "Who We Serve", subNav: ["For Pharma", "For Patients", "For Providers"] },
    { title: "Our Solutions", subNav: ["Patient/HCP Experience", "Advanced PA Process", "Integrated Pharmacy Network", "Script Data + Insights"] },
    { title: "About Us", subNav: ["Company", "Careers", "Leadership", "Contact"] },
    { title: "News And Insights", subNav: ["Resource", "Events", "Case Study", "Phil Blog"] }
  ];

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.navContainer}>
        {/* <p className={classes.logo}>PHIL</p> */}

        <ul className={classes.navMenu}>
          {navItems.map((nav, index) => (
            <li key={index} className={classes.navItem}>
              <button onClick={() => toggleMenu(nav.title)} className={classes.navLink}>
                {nav.title}
              </button>
              {openMenu === nav.title && (
                <ul className={classes.dropdown}>
                  {nav.subNav.map((subItem, subIndex) => (
                    <li key={subIndex} className={classes.dropdownItem}>{subItem}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* <div className={classes.navButtons}>
          <button className={cx(classes.btn, classes.login)}>Patient Login</button>
          <button className={cx(classes.btn, classes.demo)}>Book a Demo</button>
        </div> */}
      </div>
    </nav>
  );
}
