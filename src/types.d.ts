interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  __REDUX_DEVTOOLS_EXTENSION__?: any;
  loadMockSave?: Function;
  loadMockError?: Function;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
