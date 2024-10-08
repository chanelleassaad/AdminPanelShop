export interface IAddress {
  id: number;
  street: string;
  city: string;
  zip: string;
}

export interface IOrder {
  orderId: number;
  date: string;
  total: number;
  status: string;
}

export interface ICustomer {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  addresses: IAddress[];
  orders: IOrder[];
}

export interface IAddOn {
  id: number;
  name: string;
  price: number;
}

export interface IProduct {
  id: number;
  productName: string;
  price: number;
  available: boolean;
  image: string;
  addOns: IAddOn[];
}

export interface IShop {
  id: number;
  name: string;
  image: string;
  open: boolean;
  currency: string;
  products: number[];
}

export interface ILoginCredentials {
  email: string;
  password: string;
}
