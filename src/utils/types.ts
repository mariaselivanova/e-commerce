export enum EnvVars {
  auth_url = 'REACT_APP_AUTH_URL',
  api_url = 'REACT_APP_API_URL',
  project_key = 'REACT_APP_PROJECT_KEY',
  client_id = 'REACT_APP_CLIENT_ID',
  client_secret = 'REACT_APP_CLIENT_SECRET',
  scopes = 'REACT_APP_SCOPES',
}

export interface LoginUserSubmitForm {
  email: string;
  password: string;
}

export enum RouteLinks {
  Login = '/login',
  Register = '/register',
  Profile = '/profile',
  Catalog = '/catalog',
  Main = '/',
}

export interface IProductSubcategory {
  categoryName: string;
  id: string;
  key?: string;
}

export interface IProductCategory extends IProductSubcategory {
  sub: IProductSubcategory[];
}

export interface ImageModalProps {
  open: boolean;
  handleClose: () => void;
  images: string[];
  imageStep?: number;
}

export interface IProduct {
  name: string;
  description?: string;
  urls: string[];
  price: number;
  discountedPrice?: number;
}
