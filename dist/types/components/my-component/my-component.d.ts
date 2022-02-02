export declare class MyComponent {
  videoIds: string;
  videoIdsChanged(source?: Array<string>): void;
  el: HTMLElement;
  options: string;
  _options: string[];
  componentWillLoad(): void;
  parseOptions(): void;
  stringToArray<T>(arg: T[] | string): T[];
  componentDidRender(): void;
  render(): any;
}
