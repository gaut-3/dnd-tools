import {Character} from "./Character";

export interface EncounterModel {
    id: number;
    name: string;
    lastUpdated: Date;
    characters: Character[];
}