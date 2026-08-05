import { toBlob } from 'html-to-image';

export const SITE_URL = 'https://humanbenchmark.in';

export const INVITATION_COPY = {
  default: "🧠 I found an awesome set of cognitive games that test your brain power, reaction speed, memory, and aim! Check your scores and see where you rank:\n👉 https://humanbenchmark.in",
  game: (gameName: string, score: string | number, unit: string = '') => 
    `⚡ I scored ${score}${unit ? ` ${unit}` : ''} in the ${gameName} test on Human Benchmark!\n\nCan you beat my brain score? Test yourself free:\n👉 https://humanbenchmark.in`,
  scorecard: (percentile?: number) =>
    `🧠 I just tested my cognitive benchmarks on Human Benchmark${percentile ? ` and ranked Top ${100 - percentile}% globally` : ''}!\n\nThink your brain is faster? Test your reaction time, memory, aim & typing:\n👉 https://humanbenchmark.in`,
  battle: (gameName: string, roomCode: string) =>
    `⚔️ Join my live ${gameName} battle on Human Benchmark! Room Code: ${roomCode}\n\nCompete on the live leaderboard and see who's fastest:\n👉 https://humanbenchmark.in/battle/${roomCode}`,
};

/**
 * Captures an HTML element into a high-resolution PNG Blob (2.5x scale for retina crispness).
 */
export async function captureElementAsBlob(element: HTMLElement, pixelRatio = 2.5): Promise<Blob> {
  try {
    // Wait a frame for any pending fonts/icons to render cleanly
    await new Promise(resolve => requestAnimationFrame(resolve));

    const blob = await toBlob(element, {
      pixelRatio,
      cacheBust: true,
      skipFonts: false,
      filter: (node) => {
        // Exclude elements with data-no-export attribute
        if (node instanceof HTMLElement && node.getAttribute('data-no-export') === 'true') {
          return false;
        }
        return true;
      }
    });

    if (!blob) {
      throw new Error('Failed to generate image blob from element');
    }

    return blob;
  } catch (error) {
    console.error('Error capturing element as image blob:', error);
    throw error;
  }
}

/**
 * Copies a PNG Blob to the user's system clipboard using the modern ClipboardItem API.
 */
export async function copyImageBlobToClipboard(blob: Blob): Promise<boolean> {
  try {
    if (typeof navigator === 'undefined' || !navigator.clipboard || !window.ClipboardItem) {
      return false;
    }
    const item = new ClipboardItem({ 'image/png': blob });
    await navigator.clipboard.write([item]);
    return true;
  } catch (err) {
    console.warn('Direct image clipboard copy failed or not supported:', err);
    return false;
  }
}

/**
 * Initiates a browser download for a PNG Blob.
 */
export function downloadImageBlob(blob: Blob, filename = 'human-benchmark-scorecard.png') {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Checks if the device supports native Web Share API with image file attachments (iOS Safari & Android Chrome).
 */
export function canShareFileNative(file: File): boolean {
  try {
    if (typeof navigator !== 'undefined' && 'canShare' in navigator && typeof navigator.canShare === 'function') {
      return navigator.canShare({ files: [file] });
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Triggers native system share sheet with image file, title, text, and URL attached.
 */
export async function shareNativeImage(
  file: File,
  title: string,
  text: string,
  url: string
): Promise<boolean> {
  try {
    if (navigator.share) {
      await navigator.share({
        files: [file],
        title,
        text,
        url,
      });
      return true;
    }
    return false;
  } catch (err: unknown) {
    if ((err as Error).name !== 'AbortError') {
      console.warn('Native share failed:', err);
    }
    return false;
  }
}
