/**
 * Shared state for "is the TOC currently blocked from showing?"
 *
 * Each `ExpandOnScroll` instance participates: it contributes a block while
 * the user is *before or inside* that expand (approach + pin + hold + short
 * buffer past release). It stops contributing once the user has scrolled
 * clearly past the card. The TOC is shown only when no instance is blocking,
 * i.e. the reader is in the "normal text after all expands" zone.
 *
 * The `<html data-toc-blocked>` attribute drives the CSS fade in globals.css.
 */

let blockCount = 0;

function update() {
  if (typeof document === "undefined") return;
  if (blockCount > 0) {
    document.documentElement.dataset.tocBlocked = "true";
  } else {
    delete document.documentElement.dataset.tocBlocked;
  }
}

export function markTocBlocked(block: boolean) {
  blockCount += block ? 1 : -1;
  if (blockCount < 0) blockCount = 0;
  update();
}
