import { BACK_END_APP_URL } from "../../config/env";
import { getAppStoreState } from "../../config/storeAccessor";
import InternalServerException from "../exceptions/InternalServerException";
import type { HttpClient, PostOptions } from "../gateway/HttpClient";

type TokenBundle = {
  accessToken: string | null;
  refreshToken: string | null;
};

class FetchHttpClient implements HttpClient {
  private readonly refreshPath = "/auth/refresh";
  private refreshPromise: Promise<string | null> | null = null;
  private runtimeTokens: TokenBundle = { accessToken: null, refreshToken: null };

  post(url: string, data: Object, options?: PostOptions): Promise<Response> {
    return this.fetchData(url, options?.includeCred ?? true, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: options?.signal,
      blob: options?.blob,
    });
  }

  get(url: string, options?: PostOptions): Promise<Response> {
    return this.fetchData(url, options?.includeCred ?? false, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: options?.signal,
    }).catch((err) => {
      if (err.name !== "AbortError") return err;
    });
  }

  private async fetchData(
    url: string,
    includeCred: boolean,
    requestInit?: RequestInit & { blob?: boolean },
  ): Promise<Response> {
    const fetchUrl = url.includes("http") ? url : BACK_END_APP_URL + url;
    const headers = new Headers(requestInit?.headers ?? {});
    const tokens = this.getTokens();

    if (tokens.accessToken) {
      headers.set("Authorization", `Bearer ${tokens.accessToken}`);
    }

    let response = await this.executeRequest(fetchUrl, includeCred, {
      ...requestInit,
      headers,
    });

    if (response.status === 401 && tokens.refreshToken && !this.isRefreshPath(fetchUrl)) {
      const refreshedAccessToken = await this.refreshAccessToken(
        tokens.refreshToken,
        includeCred,
      );

      if (refreshedAccessToken) {
        headers.set("Authorization", `Bearer ${refreshedAccessToken}`);
        response = await this.executeRequest(fetchUrl, includeCred, {
          ...requestInit,
          headers,
        });
      } else {
        this.persistTokens({ accessToken: null, refreshToken: null });
      }
    }

    if (response.status === 500 || response.status === 405) {
      throw new InternalServerException();
    }

    return response;
  }

  private executeRequest(
    url: string,
    includeCred: boolean,
    requestInit?: RequestInit & { blob?: boolean },
  ) {
    return fetch(url, {
      ...requestInit,
      redirect: "manual",
      signal: requestInit?.signal,
      credentials: includeCred ? "include" : undefined,
    });
  }

  private isRefreshPath(url: string) {
    return url.includes(this.refreshPath);
  }

  private async refreshAccessToken(
    refreshToken: string,
    includeCred: boolean,
  ): Promise<string | null> {
    if (this.refreshPromise) return this.refreshPromise;

    this.refreshPromise = this.doRefresh(refreshToken, includeCred).finally(() => {
      this.refreshPromise = null;
    });

    return this.refreshPromise;
  }

  private async doRefresh(
    refreshToken: string,
    includeCred: boolean,
  ): Promise<string | null> {
    const response = await this.executeRequest(
      BACK_END_APP_URL + this.refreshPath,
      includeCred,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      },
    );

    if (!response.ok) return null;

    const payload = await response.json().catch(() => ({}));
    const newAccessToken = payload?.accessToken ?? payload?.token ?? null;
    const newRefreshToken = payload?.refreshToken ?? refreshToken;

    if (!newAccessToken) return null;

    this.persistTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });
    return newAccessToken;
  }

  private getTokens(): TokenBundle {
    const state: any = getAppStoreState();
    const loginState = state?.loginReducer;
    return {
      accessToken: loginState?.accessToken ?? this.runtimeTokens.accessToken,
      refreshToken: loginState?.refreshToken ?? this.runtimeTokens.refreshToken,
    };
  }

  private persistTokens(tokens: TokenBundle): void {
    this.runtimeTokens = tokens;
  }
}

const httpClient = new FetchHttpClient();
export default httpClient;