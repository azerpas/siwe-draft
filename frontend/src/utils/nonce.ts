/**
 * Fetch nonce from server
 * @returns nonce
 */
export async function getNonce() {
    /// Get environment variables
    const NEXT_PUBLIC_API_URL: string | undefined = import.meta.env.NEXT_PUBLIC_API_URL;
    if (!NEXT_PUBLIC_API_URL) {
        throw new Error('NEXT_PUBLIC_API_URL is undefined');
    }

    /// Fetch nonce from server
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/nonce`);
    const nonce = await response.text();
    return nonce;
}
