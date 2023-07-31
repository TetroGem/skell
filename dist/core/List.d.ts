import { $$Optional } from './Optional';
import { Skell, Readable, Mutable, Owned } from './skell';
declare class _List<T> extends Skell<typeof List> {
    private readonly array;
    constructor();
    $pushOne(element: T): number;
    $pushMany(...elements: T[]): number;
    at(index: number): $$Optional<T>;
}
export interface List<T> extends Readable<_List<T>> {
}
export interface $List<T> extends Mutable<_List<T>> {
}
export interface $$List<T> extends Owned<_List<T>> {
}
export declare namespace List {
    const KIND: unique symbol;
    function New<T>(): $$List<T>;
}
export {};
