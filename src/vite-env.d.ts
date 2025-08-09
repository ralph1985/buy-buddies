/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_ENV?: string;
  readonly VITE_BUGSNAG_KEY?: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
