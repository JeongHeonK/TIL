type Letters = "a" | "b" | "c";

type RemoveC<T> = T extends "c" ? never : T;

type TypeWithoutC = RemoveC<Letters>;
