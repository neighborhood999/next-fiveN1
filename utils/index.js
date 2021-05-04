export function createURL(page, queryParameters) {
  const url = new URL(process.env.API_URL);
  const firstRow = page * 30;
  const values = { ...queryParameters, firstRow };

  Object.keys(values).forEach(key => url.searchParams.append(key, values[key]));

  return url.toString();
}

export function pageView(url) {
  window.gtag('config', process.env.TRACKING_ID, {
    page_location: url,
  });
}
