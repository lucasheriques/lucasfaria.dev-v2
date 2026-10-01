const ROOT_RELATIVE_PATHS = /(^|,\s*)(\/(?!\/)[^\s,]*)/g;

export const absoluteUrls = (html: string, site: URL) =>
  html.replace(
    /\b(src|href|srcset)="([^"]*)"/g,
    (_, attribute: string, value: string) =>
      `${attribute}="${value.replace(ROOT_RELATIVE_PATHS, (_, before: string, path: string) => before + new URL(path, site))}"`,
  );
