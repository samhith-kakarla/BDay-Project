
// AUTH

export interface User {
    id: number; 
    name: string;
    email: string;
}

// TWIN

export interface Twin {
    id: number; 
    name: string; 
    age: number; 
    birthday: string;
    address: string; 
    gift_tags: string[]; 
    cake_tags: string[]; 
    match: string; 
}

// CAKE

export interface Cake {
    tag: string;
    name: string;
    price: number;
    image: string;
}