// // <credit src="https://github.com/type-challenges/type-challenges/issues/13" />
// export type ReadonlyKey<T> = {
//     [K in keyof T]: (() => Pick<T, K>) extends (() => Readonly<Pick<T, K>>) ? K : never;
// }[keyof T];

// type A = (() => { foo: 1 }) extends (() => { readonly foo: 1 }) ? true : false;
