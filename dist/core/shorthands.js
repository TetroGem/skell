import { Optional } from './Optional';
import { Result } from './Result';
export const Ok = Result.Ok.With;
export const Bad = Result.Bad.With;
export const Present = Optional.Present.With;
export const Empty = Optional.Empty.Def;
