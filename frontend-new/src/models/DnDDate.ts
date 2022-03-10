export interface DnDDates  {
    _id: string,
    uuid:  string,
    dates: DnDDate[],
}

export interface DnDDate  {
    date: string
    players: string,
    comment: string,
}