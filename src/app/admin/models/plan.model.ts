import { Service } from './service.model';
import { Agency } from './agency.model';

export class Plan {
    id?: any;
    name: string;
    description?: string;
    totalvalue?: any;
    discount?: any;
    agency: Agency[];
    services: Service[];
}
