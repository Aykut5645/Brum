import { Photo } from './photo';

export interface User {
    id: number;
    userName: string;
    email: string;
    name: string;
    lastName: string;
    age: number;
    gender: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    rules?: string;
    introduction?: string;
    photos?: Photo[];
    roles?: string[];
}
