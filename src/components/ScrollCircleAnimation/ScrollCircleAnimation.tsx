import React, { useEffect, useRef, useState } from 'react';
import Asset from 'components/common/Asset/Asset';
import useDeviceType from 'hooks/useView';
import { TAsset } from 'types/asset';
import * as styles from './ScrollCircleAnimation.module.css';

// ─── SVG Path Data (from Figma export) ────────────────────────────────────────

const SVG = {
  // e-Prescribing (laptop icon)
  ePrescribing1: 'M42.5283 23.5263H39.8138V3.61945C39.8138 1.62331 38.1905 0 36.1943 0H7.23893C5.24279 0 3.61948 1.62323 3.61948 3.61945V23.5263H0.904909C0.404834 23.5263 0.000108719 23.931 0.000108719 24.4311V25.336C0.000108719 27.3321 1.62334 28.9555 3.61956 28.9555H39.8138C41.81 28.9555 43.4332 27.3321 43.4332 25.336V24.4311C43.4332 23.931 43.0285 23.5263 42.5283 23.5263ZM5.42925 3.61945C5.42925 2.62185 6.24133 1.80977 7.23893 1.80977H36.1943C37.1919 1.80977 38.004 2.62185 38.004 3.61945V23.5263H5.42925V3.61945ZM39.8138 27.1457H3.61956C2.62196 27.1457 1.80988 26.3336 1.80988 25.336H16.8177L17.4575 25.9758C17.6272 26.1455 17.8569 26.2409 18.0973 26.2409H25.3361C25.5764 26.2409 25.8062 26.1455 25.9759 25.9758L26.6156 25.336H41.6235C41.6235 26.3336 40.8115 27.1457 39.8138 27.1457Z',
  ePrescribing2: 'M23.4581 7.00085H17.6958V18.5084H20.6632V9.50223H23.0954C23.8208 9.50223 24.4362 10.0757 24.4421 10.8011C24.4481 11.5846 23.8601 12.0898 23.0622 12.0898H21.9126V14.6091H23.4581C26.0457 14.6091 27.4607 12.9014 27.4607 10.831C27.4607 8.76061 26.0466 7.00085 23.4581 7.00085Z',
  // Fast Enrollment (phone icon paths)
  fastEnroll1: 'M2.3718 30.7351L1.83938 30.2027C1.57326 29.9366 1.36217 29.6207 1.21815 29.273C1.07413 28.9253 1 28.5526 1 28.1763C1 27.7999 1.07413 27.4273 1.21815 27.0796C1.36217 26.7319 1.57326 26.416 1.83938 26.1499L2.3718 25.6174C2.63791 25.3513 2.84901 25.0354 2.99303 24.6877C3.13705 24.34 3.21117 23.9673 3.21117 23.591C3.21117 23.2147 3.13705 22.842 2.99303 22.4943C2.84901 22.1466 2.63791 21.8307 2.3718 21.5646L1.83938 21.0322C1.57326 20.766 1.36217 20.4501 1.21815 20.1024C1.07413 19.7547 1 19.3821 1 19.0057C1 18.6294 1.07413 18.2567 1.21815 17.909C1.36217 17.5613 1.57326 17.2454 1.83938 16.9793L2.3718 16.4469C2.63791 16.1808 2.84901 15.8648 2.99303 15.5171C3.13705 15.1694 3.21117 14.7968 3.21117 14.4204C3.21117 14.0441 3.13705 13.6714 2.99303 13.3238C2.84901 12.9761 2.63791 12.6601 2.3718 12.394L1.83938 11.8616C1.57326 11.5955 1.36217 11.2796 1.21815 10.9319C1.07413 10.5842 1 10.2115 1 9.83516C1 9.45882 1.07413 9.08616 1.21815 8.73847C1.36217 8.39077 1.57326 8.07485 1.83938 7.80874L2.3718 7.27631',
  fastEnroll2: 'M30.7469 30.7351L31.2794 30.2027C31.5455 29.9366 31.7566 29.6207 31.9006 29.273C32.0446 28.9253 32.1187 28.5526 32.1187 28.1763C32.1187 27.7999 32.0446 27.4273 31.9006 27.0796C31.7566 26.7319 31.5455 26.416 31.2794 26.1499L30.7469 25.6174C30.4808 25.3513 30.2697 25.0354 30.1257 24.6877C29.9817 24.34 29.9076 23.9673 29.9076 23.591C29.9076 23.2147 29.9817 22.842 30.1257 22.4943C30.2697 22.1466 30.4808 21.8307 30.7469 21.5646L31.2794 21.0322C31.5455 20.766 31.7566 20.4501 31.9006 20.1024C32.0446 19.7547 32.1187 19.3821 32.1187 19.0057C32.1187 18.6294 32.0446 18.2567 31.9006 17.909C31.7566 17.5613 31.5455 17.2454 31.2794 16.9793L30.7469 16.4469C30.4808 16.1808 30.2697 15.8648 30.1257 15.5171C29.9817 15.1694 29.9076 14.7968 29.9076 14.5C29.9076 14.0441 29.9817 13.6714 30.1257 13.3238C30.2697 12.9761 30.4808 12.6601 30.7469 12.394L31.2794 11.8616C31.5455 11.5955 31.7566 11.2796 31.9006 10.9319C32.0446 10.5842 32.1187 10.2115 32.1187 9.83516C32.1187 9.45882 32.0446 9.08616 31.9006 8.73847C31.7566 8.39077 31.5455 8.07485 31.2794 7.80874L30.7469 7.27631',
  fastEnroll3: 'M25.9242 34.6243V3.30865C25.9242 2.69636 25.681 2.10914 25.248 1.67619C24.8151 1.24323 24.2279 1 23.6156 1H9.50305C8.89076 1 8.30355 1.24323 7.8706 1.67619C7.43764 2.10914 7.19441 2.69636 7.19441 3.30865V34.6616C7.19441 35.2739 7.43764 35.8611 7.8706 36.294C8.30355 36.727 8.89076 36.9702 9.50305 36.9702H23.5784C24.2005 36.9702 24.7972 36.7231 25.2371 36.2831C25.6771 35.8432 25.9242 35.2465 25.9242 34.6243Z',
  fastEnroll4: 'M16.5405 35.0153C17.1883 35.0153 17.7134 34.4902 17.7134 33.8424C17.7134 33.1946 17.1883 32.6694 16.5405 32.6694C15.8927 32.6694 15.3675 33.1946 15.3675 33.8424C15.3675 34.4902 15.8927 35.0153 16.5405 35.0153Z',
  // Circle background (shared by PA Submission & Covered Dispenses)
  circleBg: 'M0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40Z',
  // PA Submission (hub/network icon)
  paSubmission: 'M56.1848 35.7967C54.112 35.7967 52.3763 37.228 51.9634 39.1292H47.4658C47.2936 37.6157 46.6778 36.2313 45.7485 35.1009L49.5133 31.4336C50.0452 31.7372 50.6521 31.8995 51.2847 31.8996C52.2232 31.8996 53.1058 31.5436 53.7699 30.897C55.1396 29.5624 55.1396 27.3909 53.7697 26.0564C53.1059 25.4099 52.2234 25.0538 51.2848 25.0538C50.3462 25.0538 49.4638 25.4098 48.8001 26.0564C48.1363 26.7029 47.7708 27.5624 47.7708 28.4768C47.7708 29.0931 47.9374 29.6841 48.249 30.2022L44.4841 33.8695C43.3235 32.9643 41.9023 32.3646 40.3485 32.1967V27.8153C42.3003 27.4131 43.7697 25.7224 43.7697 23.7032C43.7697 21.3856 41.834 19.5 39.4548 19.5C37.0753 19.5 35.1396 21.3856 35.1396 23.7033C35.1396 25.7224 36.6089 27.4131 38.5605 27.8153V32.1965C37.0067 32.3643 35.5854 32.9641 34.4249 33.8694L31.2419 30.7689C31.6957 30.0927 31.9397 29.3029 31.9397 28.4763C31.9397 27.3537 31.4907 26.2981 30.6757 25.5042C29.8607 24.7103 28.7771 24.2732 27.6244 24.2732C26.4719 24.2732 25.3882 24.7103 24.5733 25.5042C22.891 27.143 22.8909 29.8097 24.5731 31.4485C25.3881 32.2424 26.4719 32.6797 27.6245 32.6797C28.4728 32.6797 29.2835 32.4422 29.9774 32.0005L33.1605 35.1011C32.2313 36.2317 31.6156 37.616 31.4435 39.1295L25.8215 39.1294C25.4331 37.8199 24.1921 36.8591 22.7241 36.8591C20.9467 36.8592 19.5004 38.2681 19.5 39.9999C19.5004 41.7315 20.9467 43.1404 22.7242 43.1404C24.1917 43.1404 25.4325 42.1801 25.8212 40.8712L31.4435 40.8713C31.6158 42.3848 32.2315 43.769 33.1609 44.8995L29.978 47.9998C29.2838 47.5579 28.4729 47.3201 27.6243 47.3201C26.4716 47.3201 25.388 47.7574 24.573 48.5514C22.8908 50.1903 22.8909 52.8567 24.5731 54.4955C25.3881 55.2893 26.4719 55.7267 27.6245 55.7267C28.7769 55.7267 29.8607 55.2895 30.6755 54.4956C32.1411 53.068 32.3296 50.8608 31.2418 49.232L34.4254 46.1311C35.5859 47.0361 37.007 47.636 38.5608 47.8037V52.1847C36.6089 52.5868 35.1394 54.2776 35.1394 56.2968C35.1394 58.6143 37.075 60.4998 39.4542 60.5C41.8335 60.4998 43.7695 58.6141 43.7695 56.2968C43.7695 54.2778 42.3003 52.5871 40.3488 52.1848V47.8036C41.9024 47.6357 43.3237 47.036 44.4842 46.1308L47.6675 49.2317C46.5794 50.8604 46.7676 53.0682 48.2334 54.4958C49.0482 55.2895 50.1319 55.7267 51.2845 55.7268C52.4368 55.7268 53.5208 55.2897 54.3362 54.4957C56.0183 52.8566 56.0182 50.19 54.3361 48.5515C53.521 47.7575 52.4373 47.3203 51.2847 47.3203C50.4363 47.3203 49.6256 47.5579 48.9314 47.9996L45.7485 44.8991C46.6778 43.7687 47.2936 42.3843 47.4658 40.8708H51.9634C52.3763 42.772 54.112 44.2033 56.1848 44.2033C58.5642 44.2033 60.5 42.3177 60.5 40C60.5 37.6823 58.5642 35.7967 56.1848 35.7967Z',
  // Covered Dispenses (map/pin icon)
  coveredDispenses: 'M21.3697 27.5797C20.9672 27.2439 20.4597 26.7531 20.164 26.6112C19.3036 26.2639 19.1719 28.0549 19.0932 28.5812C19.0767 30.9221 17.4943 32.8713 17.2935 35.1772C17.17 36.4368 17.8759 37.5255 18.2215 38.6801C18.5616 39.935 18.4082 41.3857 19.0748 42.5479C19.5215 43.3466 20.2929 43.763 20.9189 44.3952C21.8736 45.543 22.1799 45.8233 23.6956 46.1306C24.7799 46.2837 25.6107 46.7827 26.4976 47.4193C27.0625 47.7852 27.6501 48.0909 28.2922 48.1644C30.5101 48.2392 31.2361 46.5403 32.7903 49.2031C33.42 50.2728 34.3457 51.2853 35.6437 50.7874C36.0022 50.6823 36.3554 50.4741 36.6929 50.8926C37.0498 51.3352 37.2862 51.8426 37.5206 52.3488C37.9855 53.2985 38.6398 54.8754 39.8369 54.9927C41.2 54.9948 41.4583 53.8131 41.6681 52.7377C42.5381 49.675 44.6914 51.5282 46.6739 50.496C47.9301 49.7713 47.579 47.9008 49.302 48.5916C50.729 49.2479 52.4824 48.3012 53.5099 49.5097C54.3553 50.497 55.0169 51.6278 55.8382 52.6193C56.3926 53.2774 57.2791 53.4397 57.8138 52.6358C58.287 51.9754 57.793 50.7824 57.522 50.1804C56.9671 48.7518 55.1923 47.1367 55.3171 45.4515C56.3196 43.1832 60.3443 42.4179 58.4576 39.2794C57.285 37.5213 58.6951 37.2291 59.3267 35.7919C59.5877 35.2486 59.2708 34.6773 59.5261 34.1439C59.9682 33.4824 60.6956 33.1113 60.9938 32.3306C61.4319 30.8405 60.1456 30.916 61.7707 29.4644C62.2472 28.9499 62.9269 28.3012 62.6604 27.536C62.5716 27.3289 62.3733 27.1098 62.2736 26.9629C62.038 26.6189 61.8517 26.1346 61.58 25.7556C61.1944 25.1924 60.4588 24.7343 59.8135 25.1979C58.5263 26.1004 59.0013 27.4676 58.1032 28.3567C57.6153 28.7785 57.0128 29.047 56.5692 29.5246C56.0773 30.0312 55.9321 30.761 55.5051 31.3106C55.0201 31.8771 54.2895 32.0875 53.7018 32.518C52.9907 33.0329 52.5607 33.9222 51.5475 33.6805C49.9685 33.4947 49.9731 35.0825 48.9363 34.671C48.0812 33.938 49.2363 31.2483 47.894 30.9358C47.1402 30.8644 46.5125 31.0397 45.8273 30.7221C45.2484 30.3057 45.4111 29.2522 44.4084 29.0414C43.7498 28.8978 43.0763 29.0877 42.414 28.9559C41.1784 28.6798 40.0796 28.0651 38.7851 28.0542C36.6624 28.0377 34.8788 28.5812 32.694 28.3073C30.5342 28.0356 28.229 27.7243 26.1245 27.1689C24.4769 26.8101 21.5734 24.5438 21.3697 27.5797Z',
  // Transparent Costs (price tag icon paths)
  transparentCosts1: 'M33.5623 6.71347V23.6785M37.8036 9.25823H31.4417C30.6543 9.25823 29.8992 9.57102 29.3424 10.1278C28.7856 10.6846 28.4728 11.4397 28.4728 12.2271C28.4728 13.0145 28.7856 13.7697 29.3424 14.3264C29.8992 14.8832 30.6543 15.196 31.4417 15.196H35.683C36.4704 15.196 37.2255 15.5088 37.7823 16.0656C38.3391 16.6223 38.6519 17.3775 38.6519 18.1649C38.6519 18.9523 38.3391 19.7074 37.7823 20.2642C37.2255 20.821 36.4704 21.1338 35.683 21.1338H28.4728',
  transparentCosts2: 'M24.1621 11.6632L23.7896 12.0357C23.6035 12.2218 23.3825 12.3695 23.1392 12.4703C22.896 12.571 22.6353 12.6229 22.372 12.6229C22.1087 12.6229 21.848 12.571 21.6048 12.4703C21.3616 12.3695 21.1406 12.2218 20.9544 12.0357L20.582 11.6632C20.3958 11.4771 20.1748 11.3294 19.9315 11.2286C19.6883 11.1279 19.4276 11.076 19.1643 11.076C18.9011 11.076 18.6404 11.1279 18.3971 11.2286C18.1539 11.3294 17.9329 11.4771 17.7467 11.6632L17.3743 12.0357C17.1881 12.2218 16.9671 12.3695 16.7239 12.4703C16.4806 12.571 16.22 12.6229 15.9567 12.6229C15.6934 12.6229 15.4327 12.571 15.1895 12.4703C14.9462 12.3695 14.7252 12.2219 14.5391 12.0357L14.1666 11.6632C13.9804 11.4771 13.7594 11.3294 13.5162 11.2286C13.273 11.1279 13.0123 11.076 12.749 11.076C12.4857 11.076 12.225 11.1279 11.9818 11.2286C11.7386 11.3294 11.5176 11.4771 11.3314 11.6632L10.9589 12.0357C10.7728 12.2219 10.5518 12.3695 10.3085 12.4703C10.0653 12.571 9.80461 12.6229 9.54134 12.6229C9.27806 12.6229 9.01737 12.571 8.77414 12.4703C8.5309 12.3695 8.3099 12.2219 8.12373 12.0357L7.75127 11.6632',
  transparentCosts3: 'M24.1621 19.2488L23.7896 19.6212C23.6035 19.8074 23.3825 19.9551 23.1392 20.0558C22.896 20.1566 22.6353 20.2084 22.372 20.2084C22.1087 20.2084 21.848 20.1566 21.6048 20.0558C21.3616 19.9551 21.1406 19.8074 20.9544 19.6212L20.582 19.2488C20.3958 19.0626 20.1748 18.9149 19.9315 18.8142C19.6883 18.7134 19.4276 18.6616 19.1643 18.6616C18.9011 18.6616 18.6404 18.7134 18.3971 18.8142C18.1539 18.9149 17.9329 19.0626 17.7467 19.2488L17.3743 19.6212C17.1881 19.8074 16.9671 19.9551 16.7239 20.0558C16.4806 20.1566 16.22 20.2084 15.9567 20.2084C15.6934 20.2084 15.4327 20.1566 15.1895 20.0558C14.9462 19.9551 14.7252 19.8074 14.5391 19.6212L14.1666 19.2488C13.9804 19.0626 13.7594 18.9149 13.5162 18.8142C13.273 18.7134 13.0123 18.6616 12.749 18.6616C12.4857 18.6616 12.225 18.7134 11.9818 18.8142C11.7386 18.9149 11.5176 19.0626 11.3314 19.2488L10.9589 19.6212C10.7728 19.8074 10.5518 19.9551 10.3085 20.0558C10.0653 20.1566 9.80461 20.2084 9.54134 20.2084C9.27806 20.2084 9.01737 20.1566 8.77414 20.0558C8.5309 19.9551 8.3099 19.8074 8.12373 19.6212L7.75127 19.2488',
  // Home Delivery (truck icon)
  homeDelivery: 'M25.8 24.6151V4.37358C25.8 3.47885 25.4523 2.62077 24.8335 1.9881C24.2146 1.35543 23.3752 1 22.5 1H4.3C3.42479 1 2.58542 1.35543 1.96655 1.9881C1.34768 2.62077 1 3.47885 1 4.37358V22.9283C1 23.3757 1.17384 23.8047 1.48327 24.121C1.79271 24.4374 2.21239 24.6151 2.65 24.6151H5.95M5.95 24.6151C5.95 26.4783 7.42746 27.9887 9.25 27.9887C11.0725 27.9887 12.55 26.4783 12.55 24.6151M5.95 24.6151C5.95 22.7519 7.42746 21.2415 9.25 21.2415C11.0725 21.2415 12.55 22.7519 12.55 24.6151M27.45 24.6151H12.55M27.45 24.6151C27.45 26.4783 28.9275 27.9887 30.75 27.9887C32.5725 27.9887 34.05 26.4783 34.05 24.6151M27.45 24.6151C27.45 22.7519 28.9275 21.2415 30.75 21.2415C32.5725 21.2415 34.05 22.7519 34.05 24.6151M34.05 24.6151H37.35C37.7876 24.6151 38.2073 24.4374 38.5167 24.121C38.8262 23.8047 39 23.3757 39 22.9283V16.7715C38.9993 16.3887 38.8713 16.0175 38.637 15.7189L32.895 8.3814C32.7407 8.18385 32.5449 8.02428 32.3221 7.91449C32.0994 7.80471 31.8553 7.74753 31.608 7.74717H25.8',
  // Simple Refills (person icon)
  simpleRefills1: 'M11.1381 20.2119C8.02129 20.2119 5.48648 17.6771 5.48648 14.5603C5.48648 11.4435 8.02129 8.90866 11.1381 8.90866C14.2549 8.90866 16.7897 11.4446 16.7897 14.5603C16.7897 17.6759 14.2549 20.2119 11.1381 20.2119ZM11.1381 10.311C8.79493 10.311 6.88886 12.2171 6.88886 14.5603C6.88886 16.9034 8.79493 18.8095 11.1381 18.8095C13.4812 18.8095 15.3873 16.9034 15.3873 14.5603C15.3873 12.2171 13.4812 10.311 11.1381 10.311ZM21.975 33.7729C21.975 35.3623 20.6825 36.6548 19.0931 36.6548H3.1819C1.59253 36.6548 0.3 35.3623 0.3 33.7729V33.2505C0.3 27.2752 5.16159 22.4136 11.1369 22.4136C17.1122 22.4136 21.9738 27.2752 21.9738 33.2505V33.7729H21.975ZM20.5726 33.2505C20.5726 28.0477 16.3397 23.816 11.1381 23.816C5.93524 23.816 1.70355 28.0488 1.70355 33.2505V33.7729C1.70355 34.5886 2.36735 35.2524 3.18307 35.2524H19.0943C19.91 35.2524 20.5738 34.5886 20.5738 33.7729V33.2505H20.5726Z',
  simpleRefillsDot: 'M29.0967 5.31282V12.5047M32.6926 8.90865L25.5008 8.90865',
  // Arrow connector
  arrow: 'M5 12H19M19 12L12 5M19 12L12 19',
};

// ─── Circle data ──────────────────────────────────────────────────────────────

interface CircleData {
  label: string;
  desc: string;
  bgVariant: 'light' | 'teal' | 'svg';
  icon: React.ReactNode;
}

const CIRCUMFERENCE = 2 * Math.PI * 42; // ≈ 263.8

// ─── Individual icons ─────────────────────────────────────────────────────────

function EPrescribingIcon() {
  return (
    <svg width="43" height="29" viewBox="0 0 43.4332 28.9557" fill="none">
      <path d={SVG.ePrescribing1} fill="#00827E" />
      <path d={SVG.ePrescribing2} fill="#00827E" />
    </svg>
  );
}

function FastEnrollIcon() {
  return (
    <svg width="33" height="38" viewBox="0 0 33.1187 37.9702" fill="none">
      <path d={SVG.fastEnroll1} stroke="#D5F1F0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={SVG.fastEnroll2} stroke="#D5F1F0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={SVG.fastEnroll3} stroke="#D5F1F0" strokeMiterlimit="10" strokeWidth="2" />
      <path d={SVG.fastEnroll4} fill="#D5F1F0" />
    </svg>
  );
}

function PASubmissionIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <path d={SVG.circleBg} fill="#D5F1F0" />
      <path d={SVG.paSubmission} fill="#00827E" stroke="#00827E" strokeWidth="0.3" />
    </svg>
  );
}

function CoveredDispensesIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <path d={SVG.circleBg} fill="#00827E" />
      <path d={SVG.coveredDispenses} fill="#D5F1F0" fillRule="evenodd" clipRule="evenodd" stroke="#D5F1F0" />
    </svg>
  );
}

function TransparentCostsIcon() {
  return (
    <svg width="47" height="30" viewBox="0 0 46.8704 30.392" fill="none">
      <path d={SVG.transparentCosts1} stroke="#00827E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <rect height="28.392" rx="1.86817" stroke="#00827E" strokeWidth="2" width="44.8704" x="1" y="1" />
      <path d={SVG.transparentCosts2} stroke="#00827E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={SVG.transparentCosts3} stroke="#00827E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function HomeDeliveryIcon() {
  return (
    <svg width="40" height="29" viewBox="0 0 40 28.9887" fill="none">
      <path d={SVG.homeDelivery} stroke="#D5F1F0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  );
}

function SimpleRefillsIcon() {
  return (
    <svg width="37" height="37" viewBox="0 0 37.6916 36.9548" fill="none">
      <path d={SVG.simpleRefills1} fill="#00827E" stroke="#00827E" strokeWidth="0.6" />
      <circle cx="28.7829" cy="8.90866" r="8.05866" stroke="#00827E" strokeWidth="1.7" />
      <path d={SVG.simpleRefillsDot} stroke="#00827E" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

// ─── Circle definitions ───────────────────────────────────────────────────────

const CIRCLES: CircleData[] = [
  { label: 'e-Prescribing', desc: 'Familiar workflow with existing EMRs', bgVariant: 'light', icon: <EPrescribingIcon /> },
  { label: 'Fast Enrollment', desc: '< 1-minute patient signup', bgVariant: 'teal', icon: <FastEnrollIcon /> },
  { label: 'PA Submission', desc: 'Pre-filled forms for fewer clicks', bgVariant: 'svg', icon: <PASubmissionIcon /> },
  { label: 'Covered Dispenses', desc: 'Broad network maximizes coverage', bgVariant: 'svg', icon: <CoveredDispensesIcon /> },
  { label: 'Transparent Costs', desc: 'Clear coverage and cost details', bgVariant: 'light', icon: <TransparentCostsIcon /> },
  { label: 'Home Delivery', desc: 'Scheduled delivery options', bgVariant: 'teal', icon: <HomeDeliveryIcon /> },
  { label: 'Simple Refills', desc: 'Easy enrollment in patient refills', bgVariant: 'light', icon: <SimpleRefillsIcon /> },
];

// ─── Scroll lock / unlock ─────────────────────────────────────────────────────

function lockScroll(): number {
  const y = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${y}px`;
  document.body.style.width = '100%';
  document.body.style.overflowY = 'scroll';
  return y;
}

function unlockScroll(savedY: number) {
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  document.body.style.overflowY = '';
  window.scrollTo({ top: savedY, behavior: 'instant' as ScrollBehavior });
}

// Total accumulated wheel deltaY (px) to drive animation from 0 → 1
const WHEEL_TOTAL = 8000;

// ─── Main component ───────────────────────────────────────────────────────────

type Props = {
  mobileImage?: TAsset;
};

export default function ScrollCircleAnimation({ mobileImage }: Props) {
  const isMobile = useDeviceType('maxSm');
  const isUsingMobileFallback = isMobile && Boolean(mobileImage);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastScrollYRef = useRef<number>(0);

  // Authoritative progress (0–1). Kept as a ref so wheel handler always
  // reads the latest value without stale-closure issues.
  const progressRef = useRef(0);
  const lockedRef = useRef(false);      // is scroll currently locked?
  const savedScrollY = useRef(0);
  const centerTriggered = useRef(false); // has lock fired for this approach?
  const cooldownRef = useRef(false);    // suppress re-lock after unlock (Safari fix)

  // React state drives the render; synced from progressRef inside events.
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (isUsingMobileFallback) return;
    const el = sectionRef.current;
    if (!el) return;
    lastScrollYRef.current = window.scrollY;

    // ── Phase A: detect section centre reaching viewport centre ────────────
    const handleScroll = () => {
      if (lockedRef.current || cooldownRef.current) return;
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportH / 2;
        const dist = Math.abs(sectionCenter - viewportCenter);

        // Reset trigger once section is well away from centre (scroll up / down past)
        if (dist > rect.height * 0.4) {
          centerTriggered.current = false;
          // Also reset progress and render so rings clear on a new approach
          if (progressRef.current > 0) {
            progressRef.current = 0;
            setScrollProgress(0);
          }
        }

        // Fire lock only when scrolling DOWN into the section
        const threshold = Math.max(40, rect.height * 0.1);
        if (!centerTriggered.current && isScrollingDown && dist < threshold) {
          centerTriggered.current = true;
          lockedRef.current = true;
          savedScrollY.current = lockScroll();
        }
      });
    };

    // ── Phase B: wheel drives animation while locked ───────────────────────
    const handleWheel = (e: WheelEvent) => {
      if (!lockedRef.current) return;
      e.preventDefault(); // suppress any browser scroll while locked

      const delta = e.deltaY / WHEEL_TOTAL;
      const next = Math.max(0, Math.min(1, progressRef.current + delta));
      progressRef.current = next;

      // Batch state update with next paint frame (smoother in Safari)
      requestAnimationFrame(() => {
        setScrollProgress(next);
      });

      if (next >= 1) {
        // Animation complete — unlock and allow scrolling down
        cooldownRef.current = true;
        lockedRef.current = false;
        unlockScroll(savedScrollY.current);
        setTimeout(() => { cooldownRef.current = false; }, 500);
      } else if (next <= 0 && delta < 0) {
        // User scrolled back to start — unlock and allow scrolling up
        cooldownRef.current = true;
        lockedRef.current = false;
        centerTriggered.current = false; // re-arm for next approach
        unlockScroll(savedScrollY.current);
        setTimeout(() => { cooldownRef.current = false; }, 500);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Must be non-passive so we can call preventDefault inside handleWheel
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (document.body.style.position === 'fixed') {
        unlockScroll(savedScrollY.current);
      }
    };
  }, [isUsingMobileFallback]);

  if (isMobile) {
    return mobileImage ? (
      <section className={styles.mobileFallback}>
        <Asset asset={mobileImage} />
      </section>
    ) : null;
  }

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.scaleWrap}>
        <div className={styles.card}>

          {/* ── Header pills ── */}
          <div className={styles.headerPills}>
            <div className={styles.pill}>Digital Hub Services</div>
            <div className={styles.pill}>Integrated Dispense Network</div>
          </div>

          {/* ── Circles row ── */}
          <div className={styles.circlesRow}>
            {CIRCLES.map((circle, i) => {
              const N = CIRCLES.length;
              // Each circle gets an equal 1/N slice of the overall progress
              const circleProgress = Math.max(0, Math.min(1, scrollProgress * N - i));
              const isActive = circleProgress > 0 && circleProgress < 1;
              const isDone = circleProgress >= 1;
              const ringOffset = CIRCUMFERENCE * (1 - circleProgress);

              return (
                <React.Fragment key={i}>
                  {/* Circle item */}
                  <div className={styles.circleItem}>
                    {/* Ring + icon */}
                    <div
                      className={[
                        styles.circleRingWrap,
                        isActive ? styles.active : '',
                      ].join(' ')}
                    >
                      {/* Progress ring SVG */}
                      <svg
                        className={styles.progressRingSvg}
                        viewBox="0 0 88 88"
                      >
                        <circle className={styles.ringTrack} cx="44" cy="44" r="42" />
                        <circle
                          className={styles.ringFill}
                          cx="44"
                          cy="44"
                          r="42"
                          style={{ strokeDashoffset: ringOffset }}
                        />
                      </svg>

                      {/* Icon circle */}
                      {circle.bgVariant === 'svg' ? (
                        <div
                          className={[
                            styles.iconCircle,
                            isActive ? styles.active : '',
                            isDone ? styles.done : '',
                          ].join(' ')}
                          style={{ background: 'transparent' }}
                        >
                          {circle.icon}
                        </div>
                      ) : (
                        <div
                          className={[
                            styles.iconCircle,
                            circle.bgVariant === 'teal' ? styles.tealBg : styles.lightBg,
                            isActive ? styles.active : '',
                            isDone ? styles.done : '',
                          ].join(' ')}
                        >
                          {circle.icon}
                        </div>
                      )}
                    </div>

                    {/* Text */}
                    <div className={styles.circleLabel}>{circle.label}</div>
                    <div className={styles.circleDesc}>{circle.desc}</div>
                  </div>

                  {/* Arrow connector between circles */}
                  {i < CIRCLES.length - 1 && (
                    <div className={[styles.arrowWrap, isDone ? styles.lit : ''].join(' ')}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d={SVG.arrow}
                          stroke="#00827E"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* ── Footer badge ── */}
          <div className={styles.footerBadge}>
            <p>End-to-end data &amp; insights at the script, provider, payer, and program level</p>
          </div>
        </div>
      </div>
    </section>
  );
}
