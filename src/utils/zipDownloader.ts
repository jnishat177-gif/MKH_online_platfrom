/**
 * Utility to reliably download the project ZIP archive using Fetch Blob
 * Works on localhost as well as relative GitHub Pages subpaths
 */
export const downloadProjectZip = async (onProgress?: (status: string) => void): Promise<boolean> => {
  const zipPath = './marketinghub-project.zip';
  try {
    if (onProgress) onProgress('Downloading project archive...');

    const response = await fetch(zipPath, {
      headers: {
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch zip: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'marketinghub-project.zip';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }, 200);

    if (onProgress) onProgress('Complete');
    return true;
  } catch (error) {
    console.warn('Blob download fallback triggered:', error);
    const fallbackLink = document.createElement('a');
    fallbackLink.href = zipPath;
    fallbackLink.download = 'marketinghub-project.zip';
    fallbackLink.target = '_blank';
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    document.body.removeChild(fallbackLink);
    return false;
  }
};
