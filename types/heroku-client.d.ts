declare module 'heroku-client' {
  interface HerokuOptions {
    token: string;
  }

  interface RequestOptions{
  }

  class Heroku {
    constructor(options?: HerokuOptions);

    request<T = {}>(options?: RequestOptions): Promise<T>;
    get<T = {}>(path: string, options?: RequestOptions): Promise<T>;
    put<T = {}>(path: string, options?: RequestOptions): Promise<T>;
    post<T = {}>(path: string, options?: RequestOptions): Promise<T>;
    patch<T = {}>(path: string, options?: RequestOptions): Promise<T>;
    delete<T = {}>(path: string, options?: RequestOptions): Promise<T>;
  }

  export = Heroku;
}

