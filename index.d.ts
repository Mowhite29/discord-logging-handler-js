declare module 'discord-logging-handler' {
    export type LogLevel = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

    export interface DiscordLogOptions {
        level?: LogLevel;
    }

    export default class DiscordLog {
        constructor(webhookURL: string, options?: DiscordLogOptions);
        constructor(webhookURL: string, level?: LogLevel)
        log(message: string, level?: LogLevel, error?: unknown): void;
        debug(message: string, error?: unknown): void;
        info(message: string, error?: unknown): void;
        warning(message: string, error?: unknown): void;
        error(message: string, error?: unknown): void;
        critical(message: string, error?: unknown): void;
    }
}