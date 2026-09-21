declare module 'sql.js' {
  const initSqlJs: (options?: any) => Promise<any>;
  export default initSqlJs;
}

declare module 'sql.js/dist/sql-wasm.wasm?url' {
  const url: string;
  export default url;
}
