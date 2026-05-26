export async function onPageTransitionEnd() {
  document.body.classList.remove("page-transition");

  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
  });
}
