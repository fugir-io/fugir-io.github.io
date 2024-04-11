/**
 * Registers an HTML element to trap focus within its subtree.
 * @param node The HTML element whose subtree will trap focus.
 * @returns An object with a `destroy` method to unregister the element from focus trapping.
 */
export const trapFocus = (node: HTMLElement) => {
  // Add the provided HTML element to the list of elements that trap focus
  trapFocusList.push(node);
  // Return an object with a `destroy` method to remove the element from the focus trapping list
  return {
    destroy() {
      trapFocusList = trapFocusList.filter((element) => element !== node);
    },
  };
};

// List of HTML elements that trap focus within their subtrees
let trapFocusList: HTMLElement[] = [];

// Event listener function to trap focus within registered elements
const trapFocusListener = (event: KeyboardEvent) => {
  // Ignore events targeting the window itself
  if (event.target === window) {
    return;
  }

  // Get the event target element
  const eventTarget = event.target as Element;

  // Find the parent node in the trapFocusList that contains the event target
  const parentNode = trapFocusList.find((node) => node.contains(eventTarget));

  // If no parent node found, exit
  if (!parentNode) {
    return;
  }

  // Find all focusable elements within the parent node
  const focusable = parentNode.querySelectorAll<HTMLElement>(
    'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]',
  );

  // Determine the first and last focusable elements
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  // If Tab is pressed and the last focusable element is focused, focus the first element
  if (isNext(event) && event.target === last) {
    event.preventDefault();
    first.focus();
  }
  // If Shift+Tab is pressed and the first focusable element is focused, focus the last element
  else if (isPrevious(event) && event.target === first) {
    event.preventDefault();
    last.focus();
  }
};

// Add event listener for keyboard events to trap focus
document.addEventListener('keydown', trapFocusListener);

// Functions to check if the pressed key is Tab or Shift+Tab
const isNext = (event: KeyboardEvent) => event.key === 'Tab' && !event.shiftKey;
const isPrevious = (event: KeyboardEvent) => event.key === 'Tab' && event.shiftKey;
