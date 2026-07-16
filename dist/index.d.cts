type LogLevel = 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';
interface DiscordLogOptions {
    level?: string;
}

declare class DiscordLog {
    private readonly webhookUrl;
    private readonly level;
    private readonly levels;
    constructor(webhookUrl: string, options?: DiscordLogOptions);
    debug(message: string, error?: Error | unknown): void;
    info(message: string, error?: Error | unknown): void;
    warning(message: string, error?: Error | unknown): void;
    error(message: string, error?: Error | unknown): void;
    critical(message: string, error?: Error | unknown): void;
    log(message: string, level?: string, error?: Error | unknown): void;
    private sendLog;
    getColour(level: LogLevel): number;
}

// @ts-ignore
export = DiscordLog;
export { DiscordLog, type DiscordLogOptions, type LogLevel };
