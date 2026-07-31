export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      
      // Make the textarea out of viewport
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      return new Promise((res, rej) => {
        if (document.execCommand('copy')) {
          res(true);
        } else {
          rej(false);
        }
        textArea.remove();
      });
    }
  } catch (error) {
    console.error('Failed to copy text: ', error);
    return false;
  }
};
