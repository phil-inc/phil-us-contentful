import React from "react";

export type PageContextType = {
    title: string;
}

const PageContext = React.createContext({} as PageContextType);

export default PageContext;
