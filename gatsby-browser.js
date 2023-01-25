import React from 'react';
import mixpanel from 'mixpanel-browser';
import { MixpanelContext } from './src/contexts/MixpanelContext';
import '@fontsource/raleway'; // Defaults to 400
import '@fontsource/raleway/700.css';
import "@fontsource/lato"; // Defaults to 400
import '@fontsource/lato/700.css';



export const wrapRootElement = ({ element }) => {
  mixpanel.init(process.env.MIXPANEL_TOKEN);
  if (process.env.NODE_ENV !== 'production') {
    mixpanel.disable();
  }

  return (
    <MixpanelContext.Provider value={mixpanel}>
      {element}
    </MixpanelContext.Provider>
  );
};