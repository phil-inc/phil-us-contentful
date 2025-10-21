import { BodyType, IReferencedSection, ISection } from "types/section";
import { parseScript } from "utils/parseScript";

export type ISectionsArray = Array<ISection | IReferencedSection>;

 export const getHubspotFormDetails = (embedForm: BodyType | undefined) => {
    if (!embedForm) return { formId: '', portalId: '' };

    const [formProps] = parseScript(embedForm);
    return {
      formId: formProps.formId,
      portalId: formProps.portalId,
    };
  };


