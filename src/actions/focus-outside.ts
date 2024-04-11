/**
 * Attaches a focus event listener to the document, invoking the provided callback when focus moves outside of the specified HTML element.
 * @param node The HTML element to track focus outside of.
 * @param callback The callback function to invoke when focus moves outside of the specified element.
 * @returns An object with a `destroy` method to remove the event listener when it's no longer needed.
 */
export function focusOutside(node: HTMLElement, callback: () => void) {
  // Function to handle focus events
  function handleFocus(e: FocusEvent) {
    // Retrieve the target of the focus event
    const target = e.target as HTMLElement;

    // Check if the focused element is outside of the provided HTML element
    if (!node?.contains(target)) {
      // Invoke the callback if the focus is outside the element
      callback();
    }
  }

  // Add the focus event listener to the document, capturing phase to ensure it's triggered before any other focus event handlers
  document.addEventListener('focus', handleFocus, true);

  // Return an object with a `destroy` method to remove the focus event listener when it's no longer needed
  return {
    destroy() {
      // Remove the focus event listener from the document
      document.removeEventListener('focus', handleFocus, true);
    },
  };
}
