import { Interface } from './Interface';
export type Prettify<T> = unknown extends T ? unknown : Interface<T> extends T ? {
    [P in keyof T]: Prettify<T[P]>;
} : T;
