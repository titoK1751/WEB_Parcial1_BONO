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

export async function fetcher<T> (endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

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

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
        return undefined as T;
    }

    const rawBody = await response.text();
    if (!rawBody) {
        return undefined as T;
    }

    return JSON.parse(rawBody) as T;
}