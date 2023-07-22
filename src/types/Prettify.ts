// <credit: https://twitter.com/mattpocockuk/status/1622730175266926592?lang=en />

import { Interface } from './Interface';

export type Prettify<T> =
    unknown extends T
        ? unknown
        : Interface<T> extends T
            ? { [P in keyof T]: Prettify<T[P]> }
            : T;
