 
export class Inventory {
    id?: any;
    date: string;
    hour: string;
    seller: any;
    id_seller: any;
    range_1: number;
    range_2:number;
    bracelet: Array<Bracelets>
    type: 'Agencia' | 'Normal';
    agency?: any;
    agency_id?: string;
}
export class Bracelets {
    codebar: string;
    status: string;
    dateUsage?: string;
    hour?: string;
}

