import { EventEmitter } from '../../stencil-public-runtime';
export declare class DsInteractiveMap {
  clickedContinent: EventEmitter<MouseEvent>;
  continent: EventEmitter<string>;
  clickedContinentHandler(event: CustomEvent): void;
  componentDidRender(): void;
  render(): any;
}
