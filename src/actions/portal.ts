/**
 * Attaches the provided HTML element as a portal to another DOM element specified by either its reference or a CSS selector.
 * Usage: <div use:portal={'css selector'}> or <div use:portal={document.body}>
 * @param el The HTML element to be attached as a portal.
 * @param target The target DOM element where the portal will be attached. Can be either an HTMLElement or a CSS selector.
 */
export function portal(el: HTMLElement, target: HTMLElement | string = 'body') {
  let targetEl: HTMLElement;

  /**
   * Updates the target element of the portal.
   * @param newTarget The new target element where the portal will be attached. Can be either an HTMLElement or a CSS selector.
   */
  async function update(newTarget: HTMLElement | string) {
    target = newTarget;

    if (typeof target === 'string') {
      // If the target is a string, attempt to find the matching element using the CSS selector
      targetEl = document.querySelector(target);

      // If no element is found on the first attempt, wait for the next tick and try again
      if (targetEl === null) {
        await tick();
        targetEl = document.querySelector(target);
      }

      // If still no element is found, throw an error
      if (targetEl === null) {
        throw new Error(`No element found matching css selector: "${target}"`);
      }
    } else if (target instanceof HTMLElement) {
      // If the target is already an HTMLElement, use it directly
      targetEl = target;
    } else {
      // If the target type is neither string nor HTMLElement, throw a TypeError
      throw new TypeError(
        `Unknown portal target type: ${
          target === null ? 'null' : typeof target
        }. Allowed types: string (CSS selector) or HTMLElement.`,
      );
    }

    // Attach the portal element to the target element and make it visible
    targetEl.appendChild(el);
    el.hidden = false;
  }

  /**
   * Destroys the portal by removing its attached element from the DOM.
   */
  function destroy() {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }

  // Initial update to attach the portal to the target
  update(target);

  // Return an object with update and destroy methods
  return {
    update,
    destroy,
  };
}
