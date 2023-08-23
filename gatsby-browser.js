import '@fontsource/raleway'; // Defaults to 400
import '@fontsource/raleway/700.css';
import "@fontsource/lato"; // Defaults to 400
import '@fontsource/lato/700.css';

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();