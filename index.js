import axios from "axios";

export default class DiscordLog {
    constructor(webhookURL, options = {}) {
        if (!webhookURL) throw Error('webhookURL is required');
        this.webhookURL = webhookURL;
        const level = typeof options === 'string' ? options : options.level || 'ERROR'
        this.level = level.toUpperCase();
        this.levels = ['DEBUG', 'INFO', 'WARNING', 'ERROR', 'CRITICAL'];
    }

    async debug(message, error = null) {
        this.log(message, 'DEBUG', error);
    }

    async info(message, error = null) {
        this.log(message, 'INFO', error);
    }

    async warning(message, error = null) {
        this.log(message, 'Warning', error);
    }

    async error(message, error = null) {
        this.log(message, 'ERROR', error);
    }

    async critical(message, error = null) {
        this.log(message, 'CRITICAL', error);
    }

    async log(message, level = 'INFO', error = null){
        if (this.webhookURL.toUpperCase() === 'DEV') return

        const levelUpper = level.toUpperCase();

        if (this.levels.indexOf(levelUpper) < this.levels.indexOf(this.level)) return;
        
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
                "color": this.getColour(levelUpper)
            }]
        }
        if (this.webhookURL.toUpperCase() === 'DEV_CONSOLE') {
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
                this.webhookURL, 
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

    getColour(level) {
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
