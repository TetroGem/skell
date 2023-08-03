// <credit src="https://stackoverflow.com/questions/59184570/get-index-type-of-an-array-literal" />
export type Indices<T extends readonly any[]> = Exclude<Partial<T>['length'], T['length']> & number;
