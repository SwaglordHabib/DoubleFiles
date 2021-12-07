import { State } from './State';

export interface Loadable<T> {
  state: State;
  data: T;
}
