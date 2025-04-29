import { BodyType, IReferencedSection, ISection } from "types/section";
import { parseScript } from "utils/parseScript";

export type ISectionsArray = Array<ISection | IReferencedSection>;

/**
 * Separates an array of sections into two arrays: left and right.
 *
 * @param sections - An array of sections, each of which is either an `ISection` or an `IReferencedSection`.(renderOptions.layoutOptions.numberOfColumns is checked as a flag)
 * @returns left sections and right sections array
 */


export const getLeftRightArrayFromSections = (sections : ISectionsArray) => {
const { leftSection, rightSection } = sections.reduce(
  (acc: { leftSection: ISectionsArray; rightSection: ISectionsArray }, section) => {
    if (section?.renderOptions?.layoutOptions?.numberOfColumns && section.renderOptions.layoutOptions.numberOfColumns === 1) {
      acc.rightSection.push(section);
    } else {
      acc.leftSection.push(section);
    }
    return acc;
  },
  { leftSection: [], rightSection: [] } as { leftSection: ISectionsArray; rightSection: ISectionsArray }
);

  return {
    leftSection,
    rightSection,
  };

}

 export const getHubspotFormDetails = (embedForm: BodyType | undefined) => {
    if (!embedForm) return { formId: '', portalId: '' };

    const [formProps] = parseScript(embedForm);
    return {
      formId: formProps.formId,
      portalId: formProps.portalId,
    };
  };

