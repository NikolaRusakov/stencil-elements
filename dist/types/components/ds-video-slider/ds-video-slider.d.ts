export declare class MyComponent {
  el: HTMLElement;
  videoIds: string;
  _videoIds: string[];
  componentWillLoad(): void;
  parsevideoIds(): void;
  stringToArray<T>(arg: T[] | string): T[];
  componentDidRender(): void;
  render(): any;
}
