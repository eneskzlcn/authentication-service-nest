import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HashService {
    saltRounds: number;

    constructor(private readonly configService: ConfigService) {
        this.saltRounds = parseInt(configService.get('BCRYPT_SALT_ROUNDS'));
    }

    async encrypt(data: string): Promise<string> {
        const salt = await this.generateSalt();
        return hash(data, salt);
    }

    async compareDataWithEncryptedData(
        data: string,
        encryptedData: string
    ): Promise<boolean> {
        return compare(data, encryptedData);
    }

    async generateSalt(): Promise<string> {
        return genSalt(this.saltRounds);
    }
}
