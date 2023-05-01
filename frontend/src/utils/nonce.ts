/**
 * Fetch nonce from server
 * @returns nonce
 */
export async function getNonce() {
    /// Get environment variables
    const VITE_API_URL: string | undefined = import.meta.env.VITE_API_URL;
    if (!VITE_API_URL) {
        throw new Error('VITE_API_URL is undefined');
    }

    /// Fetch nonce from server
    const response = await fetch(`${VITE_API_URL}/nonce`);
    const nonce = await response.text();
    return nonce;
}
