import { Product } from './product.model';

export default interface User {
  facebookId: string;
  email: string;
  name: string;
  image: string;
  like: Product[];
  dislike: Product[];
  neverTried: Product[];
  recommended: Product[];
  userMatch: User[];
}
