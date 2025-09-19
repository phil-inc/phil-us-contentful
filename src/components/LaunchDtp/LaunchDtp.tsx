import React from "react";
import { navigate } from "gatsby";
import { Button } from "@mantine/core";
import { Options } from "@contentful/rich-text-react-renderer";
import { IconX } from "@tabler/icons-react";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { BLOCKS, MARKS, Node } from "@contentful/rich-text-types";
import { ContentfulModal } from "types/modal";
import { IconArrowRight } from "@tabler/icons";

import Asset from "components/common/Asset/Asset";

import * as classes from "./LaunchDtp.module.css";

type LaunchDtpProps = {
  modalData: ContentfulModal;
  closeModal: () => void;
};
const LaunchDtp: React.FC<LaunchDtpProps> = ({ modalData, closeModal }) => {
  const { logo, body, image, hyperlink } = modalData;

  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <span className={classes.extraText}>{text}</span>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH](node: Node, children: React.ReactNode) {
        return <div className={classes.paragraph}>{children}</div>;
      },
      [BLOCKS.HEADING_3](node: Node, children: React.ReactNode) {
        return <div className={classes.h3}>{children}</div>;
      },
    },
  };

  const onDtpClick = () => {
    closeModal();
    navigate(`/${hyperlink?.internalContent?.slug}`);
  };

  return (
    <>
      <section className={classes.launchSection}>
        <div className={classes.closeBtn} onClick={closeModal}>
          <IconX size={24} stroke={1} color="#09AAA5" />
        </div>
        <div className={classes.launchContainer}>
          <div className={classes.left}>
            <>
              {logo && (
                <div>
                  <Asset asset={logo} objectFit="contain" />
                </div>
              )}
              <div className={classes.msg}>{renderRichText(body, options)}</div>
              {Boolean(hyperlink?.internalContent) && (
                <Button radius={0} className={classes.btn} onClick={onDtpClick}>
                  <div className={classes.buttonText}>
                    <span> {hyperlink?.linkLabel || ""}</span>
                    <IconArrowRight size={16} />
                  </div>
                </Button>
              )}
            </>
          </div>
          <div className={classes.right}>
            <div className={classes.imageWrapper}>
              {image && <Asset asset={image} objectFit="fill" />}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LaunchDtp;
