import Decimal from "decimal.js";

import { toDecimal } from 'utils/decimal/decimal.utils';
import { parseScript } from "utils/parseScript";

import { BodyType, IReferencedSection, ISection } from "types/section";
import { NOT_AVAILABLE } from 'constants/global.constant';

export type ISectionsArray = Array<ISection | IReferencedSection>;

 export const getHubspotFormDetails = (embedForm: BodyType | undefined) => {
    if (!embedForm) return { formId: '', portalId: '' };

    const [formProps] = parseScript(embedForm);
    return {
      formId: formProps.formId,
      portalId: formProps.portalId,
    };
  };

  export const getTrendArrow = (value: Decimal|number): string => {
    if(!(value instanceof Decimal)) value = toDecimal(value);
    if (!value || !value.isFinite()) {
      return NOT_AVAILABLE;
    }

    return (value >= toDecimal(0) ? '▲' : '▼')+value;
  };

  export const getInDollar = (value: Decimal|number|string): string => {
    return '$'+value;
  };
  export const getInPercent = (value: Decimal|number|string): string => {
    return value+'%';
  };

  export const getInX = (value: Decimal|number|string): string => {
    if(value === NOT_AVAILABLE) return NOT_AVAILABLE;
    return value+'x';
  };


