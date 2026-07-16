export type LogLevel =
    | 'DEBUG'
    | 'INFO'
    | 'WARNING'
    | 'ERROR'
    | 'CRITICAL';

export interface DiscordLogOptions {
    level?: string;
}