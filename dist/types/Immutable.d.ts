export type Immutable<T> = T & {
    readonly [P in keyof T]: Immutable<T[P]>;
};
