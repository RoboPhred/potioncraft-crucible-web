interface Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  __REDUX_DEVTOOLS_EXTENSION__?: any;
  showSaveFilePicker?(opts: ShowSaveFilePickerOpts): Promise<FileHandle>;
}

interface ShowSaveFilePickerOpts {
  suggestedName?: string;
  types: {
    description: string;
    accept: Record<string, string[]>;
  }[];
}
interface FileHandle {
  // Not sure on these two, but they exist in chrome.
  kind: "file";
  name: string;

  // This is in the moz docs, but getFile().name seems to be undefined.
  getFile(): File;

  createWritable(): Promise<FileSystemWritableStream>;
}

interface FileSystemWritableStream {
  write(contents: any): Promise<void>;
  close(): Promise<void>;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
