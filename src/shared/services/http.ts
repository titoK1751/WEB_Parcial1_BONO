const API_BASE_URL = "https://gist.githubusercontent.com/caev03/cbe7d4f67f4f3655f876df7b312f9e0c/raw/483c4a692d5836457351c59a37c3f029d9711f5f/apartaments.json";

export class HttpError extends Error {
    status: number;
    detail?: string;

    constructor(status: number, message: string, detail?: string) {
        super(message);
        this.name = "HttpError";
        this.status = status;
        this.detail = detail;
    }
}

export async function fetcher<T> (endpoint: string = "", options?: RequestInit): Promise<T> {
    const url = endpoint ? `${API_BASE_URL}${endpoint}` : API_BASE_URL;

    const response = await fetch (url, {
        ... options,
        headers: {
            "Content-Type": "application/json",
            ... options?.headers,
        }
    });

    if (!response.ok) {
        const errorInfo = await response.json().catch(() => ({}));
        const detail =
            typeof errorInfo?.detail === "string"
                ? errorInfo.detail
                : undefined;
        throw new HttpError(
            response.status,
            detail || `Request error: ${response.status} ${response.statusText}`,
            detail
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    const rawBody = await response.text();
    if (!rawBody) {
        console.warn('[fetcher] Empty response body');
        return undefined as T;
    }

    try {
        const parsed = JSON.parse(rawBody);
        console.log('[fetcher] Successfully parsed JSON:', typeof parsed);
        return parsed as T;
    } catch (e) {
        console.error('[fetcher] Failed to parse JSON:', e);
        throw new HttpError(500, `Failed to parse JSON response: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
}