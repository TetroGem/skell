import { Primitive } from './Primitive';

export type Stringifiable = Exclude<Primitive, symbol>;
export type Stringify<T> = T extends Stringifiable ? `${T}` : never;
