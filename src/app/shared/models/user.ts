import { Photo } from './photo';

export interface User {
    id: number;
    name: string;
    gender: string;
    age: number;
    knownAs: string;
    dateOfBirth: Date;
    created: Date;
    lastActive: Date;
    introduction?: string;
    lookingFor?: string;
    interests?: string;
    city: string;
    country: string;
    photoUrl: string;
    photos?: Photo[];
    isActive?: boolean;
}
