/**
 * Custom Astro client directive for TinaCMS Visual Editing.
 * Only hydrates the React component when the page is loaded inside
 * the TinaCMS admin iframe. On the normal website, NO React JS is loaded.
 *
 * @type {import('astro').ClientDirective}
 */
export default async (load, options, el) => {
  try {
    const isInIframe = window.self !== window.top;
    if (!isInIframe) {
      return;
    }

    const hydrate = await load();
    await hydrate();
  } catch (error) {
    console.error("An error occurred in the Tina client directive:", error);
  }
};
