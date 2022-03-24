import mongoose, {Schema, Types} from "mongoose";

export interface DnDDates  {
    _id: string | null,
    uuid:  string,
    name:  string,
    dates: DnDDate[],
    userId: string | null
}

export interface DnDDate  {
    date: string
    players: string[],
    comment: string,
}