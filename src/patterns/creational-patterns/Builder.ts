type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export class RequestBuilder {
  private _method: Method = "GET";
  private _url: string;
  private _query: Record<string, string> = {};
  private _headers: Record<string, string> = {};
  private _body?: string;

  constructor(baseUrl: string) {
    this._url = baseUrl;
  }

  method(m: Method) {
    this._method = m;
    return this;
  }
  query(k: string, v: string) {
    this._query[k] = v;
    return this;
  }
  header(k: string, v: string) {
    this._headers[k] = v;
    return this;
  }
  json(obj: unknown) {
    this._body = JSON.stringify(obj);
    this.header("Content-Type", "application/json");
    return this;
  }

  build(): { url: string; init: RequestInit } {
    const qs = Object.entries(this._query)
      .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");
    const url = qs ? `${this._url}?${qs}` : this._url;
    return {
      url,
      init: { method: this._method, headers: this._headers, body: this._body },
    };
  }
}

const { url, init } = new RequestBuilder("https://jsonplaceholder.typicode.com/todos")
  .method("POST")
  .query("userId", "1")
  .json({ title: "delectus aut autem", completed: false })
  .build();

console.log(url, init.method, init.headers);
