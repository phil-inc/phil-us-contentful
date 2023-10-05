import React from 'react';
import type {ContentfulPage} from 'types/page';

const PageContext = React.createContext({} as {title: string});

export default PageContext;
