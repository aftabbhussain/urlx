import { nanoid } from "nanoid";

export function generateId(length: number = 8): string{
    const res = nanoid(length);
    return res;
}