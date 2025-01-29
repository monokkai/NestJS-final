import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
    public async searchProducts(searchItem: string) {
        try {
            console.log("log from chat service")
            const response = await fetch(
                `http://products-service:3000/searchall?searchWord=${searchItem}`
            );

            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error('Ошибка при поиске продуктов:', error);
            throw error;
        }
    }
}