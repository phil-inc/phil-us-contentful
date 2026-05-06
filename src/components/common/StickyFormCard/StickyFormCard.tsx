import React from "react";
import HubspotFormV2 from "components/common/HubspotForm/HubspotFormV2";
import * as classes from "./stickyFormCard.module.css";

type StickyFormCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  portalId: string;
  formId: string;
  onSubmit?: () => void;
};

const StickyFormCard: React.FC<StickyFormCardProps> = ({
  eyebrow,
  title,
  description,
  portalId,
  formId,
  onSubmit,
}) => (
  <aside className={classes.card}>
    <p className={classes.eyebrow}>{eyebrow}</p>
    <h3 className={classes.title}>{title}</h3>
    <p className={classes.desc}>{description}</p>
    <div className={classes.formWrap}>
      <HubspotFormV2
        portalId={portalId}
        formId={formId}
        callbackFn={onSubmit}
        classname={classes.hubspotForm}
      />
    </div>
    <div className={classes.trustRow}>
      <span className={classes.pill}>HIPAA Compliant</span>
      <span className={classes.pill}>SOC 2 Certified</span>
      <span className={classes.pill}>256-bit SSL</span>
    </div>
  </aside>
);

export default StickyFormCard;
