import React from "react";
import { Box } from "@mantine/core";

import imgNotepad from "@addyi/assets/images/c1c538fafc963f2f9a58eef4aac8d51e3aa020b2.png";

import * as classes from "@addyi/components/SearchSend/SearchSend.module.css";

// Source: SearchSend component
export const SearchSend: React.FC = () => {
  return (
    <Box className={classes.searchSendSection}>
      <Box className={classes.searchSendContainer}>
        <Box className={classes.leftColumn}>
    <Box className={classes.emrSearchSection}>
      <h3 className={classes.emrSearchTitle}>
        SEARCH "PHILRX" IN THE EMR'S RETAIL PHARMACY FINDER OR SEARCH BY:
      </h3>
      <Box className={classes.searchInfo}>
        <p className={classes.searchLine}>
          <span className={classes.searchLabel}>Phone:</span>{" "}
          <span className={classes.searchValue}>(855) 977-0975</span>
        </p>
        <p className={classes.searchLine}>
          <span className={classes.searchLabel}>NPI:</span>{" "}
          <span className={classes.searchValue}>487163598</span>
        </p>
        <p className={classes.searchLine}>
          <span className={classes.searchLabel}>Address:</span>{" "}
          <span className={classes.searchValue}>
            150 E. Campus View Blvd, Suite 210, Columbus OH 43235
          </span>
        </p>
      </Box>
            <Box className={classes.sendRxSection}>
              <h3 className={classes.sendRxTitle}>
                SEND AN RX VIA PHONE OR FAX:
              </h3>
              <Box className={classes.contactInfo}>
                <p className={classes.contactLine}>
                  <span className={classes.contactLabel}>Phone:</span>{" "}
                  <span className={classes.contactValue}>
                    (855) 977-0975, Option 1
                  </span>
                </p>
                <p className={classes.contactLine}>
                  <span className={classes.contactLabel}>Fax:</span>{" "}
                  <span className={classes.contactValue}>(888) 975-0603</span>
                </p>
              </Box>
            </Box>
    </Box>
        </Box>
        <Box className={classes.rightColumn}>
          <Box className={classes.notepadContainer}>
            <img
              src={imgNotepad}
              alt="addyi"
              className={classes.notepadImage}
            />
            <Box className={classes.philrxOverlay}>
              <span className={classes.philrxText}>PHILRX</span>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
