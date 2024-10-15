declare module "extract-json-from-string" {
  import * as extractJson from "extract-json-from-string";

  type formDetails = {
    portalId: string;
    formId: string;
  };

  type TResponse = formDetails & {
    region?: string;
    custom?: {
      forms: {
        hcp: formDetails;
        manufacturer: formDetails;
        other: formDetails;
      };
    };
  };

  /**
   * ExtractJson extracts json from mixed string.
   * @param mixedString string to extract json from
   */
  export default function extractJson(mixedString: string): TResponse[];
}
