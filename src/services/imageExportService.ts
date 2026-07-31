import { toPng } from 'html-to-image';

export const exportCardAsPng = async (elementId: string, fileName: string): Promise<boolean> => {
  try {
    const node = document.getElementById(elementId);
    if (!node) {
      console.error(`Element with id ${elementId} not found`);
      return false;
    }

    // Force a specific resolution for high quality share card
    const dataUrl = await toPng(node, {
      quality: 1,
      pixelRatio: 2, // Retina quality
      skipFonts: false,
    });

    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = dataUrl;
    link.click();
    
    return true;
  } catch (error) {
    console.error('Error generating image:', error);
    return false;
  }
};
