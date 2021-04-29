
// AUTH

export interface User {
    id: string; 
    name: string;
    email: string;
}

// FAIRY

export interface Fairy {
    id: string | null | undefined; 
    name: string;
    email: string;
    birthday: string;
}

// TWIN

export interface Twin {
    id: string; 
    owner?: string;
    name: string; 
    age: number; 
    birthday: string;
    address: string; 
    cake_tags: string[]; 
    match?: string; 
}

// CAKE

export interface Cake {
    id: string;
    tag: string;
    name: string;
    price: number;
    image: string;
}

// ORDER

export interface Order {
    id: string;
    cakeID: number;
    address: string;
    complete?: boolean;
}