export type Immutable<T> = T extends Function ? T : {
    readonly [P in keyof T]: Immutable<T[P]>;
}
