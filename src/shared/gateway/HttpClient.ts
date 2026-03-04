export interface PostOptions {
  signal?: AbortSignal;
  blob?: boolean;
  includeCred?: boolean;
}

export abstract class HttpClient {
  abstract post(
    url: string,
    data: Object,
    options?: PostOptions,
  ): Promise<Response>;

  abstract get(url: string, options?: PostOptions): Promise<Response>;
}
