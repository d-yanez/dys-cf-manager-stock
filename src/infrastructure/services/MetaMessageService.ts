// src/infrastructure/services/MetaMessageService.ts

import axios from 'axios';

export class MetaMessageService {
    private metaToken: string;

    constructor(metaToken: string) {
        this.metaToken = metaToken;
    }

    async sendMessage(message: string): Promise<void> {
        await axios.post('https://graph.facebook.com/v13.0/me/messages', {
            message
        }, {
            headers: {
                Authorization: `Bearer ${this.metaToken}`
            }
        });
    }
}
