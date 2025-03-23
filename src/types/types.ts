export interface Child {
    _id: string;
    name: string;
    email?: string;  
    avatar: string;
    age?: number;
    balance: number;
    spendingLimit: number;
    active: boolean;
    password?: string;
}

export interface Activity {
    id: string;
    childName: string;
    action: string;
    item?: string;
    amount: number;
    date: string;
    status: string;
}


export interface FormData {
    name: string;
    email: string;
    password: string;
    dob: string;
    age: number | string;
    parent_id: string;
    spending_limit: number | string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
    rating: number;
}

export interface Message {
    sender: 'user' | 'assistant';
    text: string;
    audio?: string;
}

export interface CharacterVariants {
    idle: any;
    talking: any;
    listening: any;
}