import { EventEmitter } from '../../stencil-public-runtime';
import { OneOfContinents } from '../../utils/one-of-continents';
export declare class DsInteractiveMap {
  clickedContinent: EventEmitter<OneOfContinents>;
  render(): any;
}
