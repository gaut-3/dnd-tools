import { format, parseISO } from "date-fns";

export const formatISODateToDateTimeString = (date: string) => {
    const isoDate = parseISO(date);
    return format(isoDate, "dd.MM.yyyy HH:mm");
};

export const formatISODateToDateString = (date: string) => {
    const isoDate = parseISO(date);
    return format(isoDate, "dd.MM.yyyy");
};

export const formatDateToString = (date: Date) => {
    return format(date, "dd.MM.yyyy hh:mm");
};

/*
export const timestampFirebaseToDate = (timestamp: FirebaseTimestampDate) => {
    if (timestamp && ((timestamp.seconds && timestamp.nanoseconds) || timestamp.nanoseconds === 0)) {
        return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    }
    return new Date();
};
*/
