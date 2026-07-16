import { LogLevel } from "./types";

const LOG_LEVELS = [
    'DEBUG',
    'INFO',
    'WARNING',
    'ERROR',
    'CRITICAL'
] as const;

export default function isLogLevel(value: string): value is LogLevel {
    return LOG_LEVELS.includes(value as LogLevel);
}