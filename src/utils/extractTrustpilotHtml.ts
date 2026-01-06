import { Paragraph } from '@contentful/rich-text-types';

  export const extractTrustpilotHtml = (node:Paragraph ) => {
    const textNode = node.content.find(item => item.nodeType === 'text')
    if (!textNode) return null
    
    const htmlContent = textNode.value
    if (htmlContent.includes('trustpilot-widget')) {
      return htmlContent
    }
    return null
  }
  
  export const extractTrustpilotHtmlFromString = (content:string ) => {
    if (content.includes('trustpilot-widget')) {
      return content
    }
    return null
  }

