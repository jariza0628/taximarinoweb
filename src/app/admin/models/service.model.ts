export class Service {
  id?: any;
  description?: string;
  name: string;
  publicvalue: number;
  agencyvalue?: any;
  status?: "Activo" | "Usado";
  userVerify?: any;
  typeverify: any;
  department?: any;
  code?: string;
  verificador?: any;
  codebar?: any;
}

export class ServiceCopy {
  id?: any;
  description?: string;
  name: string;
  publicvalue: number;
  agencyvalue?: any;
  status?: "Activo" | "Usado";
  userVerify?: any;
  typeverify: any;
  department?: any;
  code?: string;
  verificador?: any;
  codebar?: any;
  nameClient?: any;
  vaucher?: any;
  seller?: any;
  date: any;
  typepay?: any

}

export class GeneralReport {
  efecty?: number;
  bank?: number;
  vaucher?: number;
  seller?: string;
}
