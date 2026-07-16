import axios from "axios";
import { DiscordLogOptions, LogLevel } from "./types";
import isLogLevel from "./isLogLevel";

export default class DiscordLog {
    private readonly webhookUrl: string;
    private readonly level: LogLevel;
    private readonly levels: LogLevel[] = ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'];

    constructor(webhookUrl: string, options: DiscordLogOptions = {}) {
        if (!webhookUrl) throw Error('webhookURL is required');
        this.webhookUrl = webhookUrl;
        const level = options.level?.toUpperCase() ?? 'ERROR';

        if (isLogLevel(level)){
            this.level = level
        } else {
            throw Error('Valid minimum logging level required')
        }
    }

    debug(message: string, error: Error | unknown = null): void {
        this.log(message, 'DEBUG', error);
    }

    info(message: string, error: Error | unknown = null): void {
        this.log(message, 'INFO', error);
    }

    warning(message: string, error: Error | unknown = null): void {
        this.log(message, 'WARNING', error);
    }

    error(message: string, error: Error | unknown = null): void {
        this.log(message, 'ERROR', error);
    }

    critical(message: string, error: Error | unknown = null): void {
        this.log(message, 'CRITICAL', error);
    }

    log(message: string, level: string = 'INFO', error: Error | unknown = null): void {
        if (this.webhookUrl.toUpperCase() === 'DEV') return;
        if (typeof(level) != 'string') throw Error('Valid logging level required')

        const levelUpper = level?.toUpperCase() ?? 'INFO';

        let color = 0

        if (isLogLevel(levelUpper)) {
            if(this.levels.indexOf(levelUpper) < this.levels.indexOf(this.level)){
                return
            } else {
                color = this.getColour(levelUpper)
            }
        }

        this.sendLog(message, levelUpper, error)
        
        /* const timeStamp = new Date().toISOString();

        let errorMsg = '';
        if (error instanceof Error){
            errorMsg = `${error.stack}`;
        } else if (typeof error === 'string'){
            errorMsg = `${error}`;
        } else if (error){
            try {
                errorMsg = `${JSON.stringify(error, null, 2)}`;
            } catch {
                errorMsg = `[Unserialisable error: ${String(error)}]`;
            }
        }
        const payload = {
            "embeds": [{
                "title": `${levelUpper}`,
                "description": `${timeStamp} \n ${message}${error? '\n' + errorMsg : ''}`,
                "color": color
            }]
        }
        if (this.webhookUrl.toUpperCase() === 'DEV_CONSOLE') {
            const output = `DiscordLog \n --------- \n ${levelUpper} \n ${timeStamp} \n ${message}${error? '\n' + errorMsg : ''}`
            if (levelUpper === 'DEBUG') {
                console.debug(output)
            } else if (levelUpper === 'INFO') {
                console.info(output)
            } else if (levelUpper === 'WARNING') {
                console.warn(output)
            } else if (levelUpper === 'ERROR') {
                console.error(output)
            } else if (levelUpper === 'CRITICAL') {
                console.error(output)
            } 
            return
        }

        try {
            await axios.post(
                this.webhookUrl, 
                payload, 
                {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 10000
                }
            );
        } catch (e){
            console.error('Discord logging unsuccessful')
        } */
    }

    private async sendLog(message: string, levelUpper: string, error: unknown): Promise<void> {
        let color = 0

        if (isLogLevel(levelUpper)) {
            if(this.levels.indexOf(levelUpper) < this.levels.indexOf(this.level)){
                return
            } else {
                color = this.getColour(levelUpper)
            }
        }
        
        const timeStamp = new Date().toISOString();

        let errorMsg = '';
        if (error instanceof Error){
            errorMsg = `${error.stack}`;
        } else if (typeof error === 'string'){
            errorMsg = `${error}`;
        } else if (error){
            try {
                errorMsg = `${JSON.stringify(error, null, 2)}`;
            } catch {
                errorMsg = `[Unserialisable error: ${String(error)}]`;
            }
        }
        const payload = {
            "embeds": [{
                "title": `${levelUpper}`,
                "description": `${timeStamp} \n ${message}${error? '\n' + errorMsg : ''}`,
                "color": color
            }]
        }
        if (this.webhookUrl.toUpperCase() === 'DEV_CONSOLE') {
            const output = `DiscordLog \n --------- \n ${levelUpper} \n ${timeStamp} \n ${message}${error? '\n' + errorMsg : ''}`
            if (levelUpper === 'DEBUG') {
                console.debug(output)
            } else if (levelUpper === 'INFO') {
                console.info(output)
            } else if (levelUpper === 'WARNING') {
                console.warn(output)
            } else if (levelUpper === 'ERROR') {
                console.error(output)
            } else if (levelUpper === 'CRITICAL') {
                console.error(output)
            } 
            return
        }

        try {
            await axios.post(
                this.webhookUrl, 
                payload, 
                {
                    headers: { 'Content-Type': 'application/json' },
                    timeout: 10000
                }
            );
        } catch (e){
            console.error('Discord logging unsuccessful')
        }
    }

    getColour(level: LogLevel) {
        const colours = {
            DEBUG: 8421504,
            INFO: 3447003,
            WARNING: 16776960,
            ERROR: 16711680,
            CRITICAL: 10038562,
        }
        return colours[level] || 0;
    }
}
