declare module 'js-cookie' {
  export function get(name: string): string | undefined;
  export function set(name: string, value: string, options?: CookieAttributes): void;
  export function remove(name: string, options?: CookieAttributes): void;
}
