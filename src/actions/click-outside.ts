/**
 * Attaches a click event listener to the document, invoking the provided callback when a click occurs outside of the specified HTML element.
 * @param node The HTML element to track clicks outside of.
 * @param callback The callback function to invoke when a click occurs outside of the specified element.
 * @returns An object with a `destroy` method to remove the event listener when it's no longer needed.
 */
export function clickOutside(node: HTMLElement, callback: () => void) {
  // Function to handle click events
  const handleClick = (e: MouseEvent) => {
    // Check if the click target is outside of the provided HTML element
    if (!node.contains(e.target as HTMLElement)) {
      // Invoke the callback if the click is outside the element
      callback();
    }
  };

  // Add the click event listener to the document, capturing phase to ensure it's triggered before any other click event handlers
  document.addEventListener('click', handleClick, true);

  // Return an object with a `destroy` method to remove the event listener when it's no longer needed
  return {
    destroy() {
      // Remove the click event listener from the document
      document.removeEventListener('click', handleClick, true);
    },
  };
}
