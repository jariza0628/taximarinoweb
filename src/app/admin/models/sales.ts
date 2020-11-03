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
  total?: any;
  date?: Date;
  vaucher?: any;
  typepay?: any;
  efecty?: any;
  tarjeta?: any;
}
