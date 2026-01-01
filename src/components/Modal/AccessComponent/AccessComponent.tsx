import React from "react";
import { ContentfulModal } from "types/modal";
import { Options } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS, Node } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
import { Text } from "@mantine/core";

import Asset from "components/common/Asset/Asset";
import HubspotFormV2 from "components/common/HubspotForm/HubspotFormV2";
import { SessionModalRef } from "components/SessionModal/SessionModal";

import { getHubspotFormDetails } from "utils/utils";

import * as classes from "./AccessComponent.module.css";

type AccessComponentProps = {
  modalData: ContentfulModal;
  modalRef?: React.RefObject<SessionModalRef | null>;
};

const AccessComponent: React.FC<AccessComponentProps> = ({
  modalData,
  modalRef,
}) => {
  const { logo, body, embedForm } = modalData;
  const { formId, portalId } = getHubspotFormDetails(embedForm);

  const options: Options = {
    renderMark: {
      [MARKS.BOLD]: (text) => <span className={classes.extraText}>{text}</span>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH](node: Node, children: React.ReactNode) {
        return <div className={classes.paragraph}>{children}</div>;
      },
      [BLOCKS.HEADING_3](node: Node, children: React.ReactNode) {
        return <Text className={classes.h3}>{children}</Text>;
      },
    },
  };

  return (
    <section className={classes.accessSection}>
      <>
        {logo && (
          <div className={classes.logo}>
            <Asset asset={logo} objectFit="contain" />
          </div>
        )}
        <div className={classes.msg}>{renderRichText(body, options)}</div>
        {Boolean(embedForm) && (
          <div>
            <HubspotFormV2
              formId={formId}
              portalId={portalId}
              callbackFn={() => modalRef?.current?.closeModal()}
              classname="DTP-resource-form"
            />
          </div>
        )}
      </>
    </section>
  );
};

export default AccessComponent;
