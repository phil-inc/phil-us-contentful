import React, { Ref } from 'react';

// Lazily import the PDFViewer component
const LazyPDFViewer = React.lazy(() => import('./PDFViewer'));

interface ClientSidePDFViewerProps {
  url: string;
  width: number;
}

const ClientSidePDFViewer = React.forwardRef<HTMLDivElement, ClientSidePDFViewerProps>(
  ({ url, width }, ref: Ref<HTMLDivElement>) => {
    // Check if the code is running on the server or the client
    const isSSR = typeof window === 'undefined';

    return (
      <>
        {/* Render the PDFViewer only on the client-side */}
        {!isSSR && (
          <React.Suspense fallback={<div>Loading PDF...</div>}>
            <LazyPDFViewer url={url} width={width} ref={ref} />
          </React.Suspense>
        )}
      </>
    );
  }
);

export default ClientSidePDFViewer;
