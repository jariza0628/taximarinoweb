import {Plan} from './plan.model';
import {Service} from './service.model';

export interface Sales {
  id?: any;
  codebar?: string;
  detail?: Array<Service>;
  dicount?: string;
  dni?: string;
  name?: string;
  plans?: Array<Plan>;
  seller?: string;
  state?: 'Aprobada' | 'Denegada' | 'Cancelada' | 'Activa';
  total?: number;
  date?: Date;
  vaucher?: any;
  typepay?: any;
  efecty?: any;
  tarjeta?: any;
  commission?: any;
  idGeneralSale?: any;
  hour?: any;
  zone?: any;
  description?: any;
}

 