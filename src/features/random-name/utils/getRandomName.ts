import {PREFIX, SUFFIX} from "../data/Data.ts";
import {getRandomNumber} from "../../core/utils/getRandomNumber.ts";

export function getRandomName(separator: string = "-"): string {
    const prefix = PREFIX[Math.floor(getRandomNumber(0, PREFIX.length - 1))];
    const suffix = SUFFIX[Math.floor(getRandomNumber(0, SUFFIX.length - 1))];
    return `${prefix}${separator}${suffix}`;
}