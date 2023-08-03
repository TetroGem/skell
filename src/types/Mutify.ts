export type Mutify<T> = { -readonly [P in keyof T]: T[P] };
