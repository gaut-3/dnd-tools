export interface Character {
    name: string;
    initiative: number;
    armorClass: string;
    healthPoints?: number;
    maxHealthPoints?: number;
    conditions?: string;
    comments?: string;
}