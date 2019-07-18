export default interface User {
  facebookId: string;
  email: string;
  name: string;
  image: string;
  like: string[];
  dislike: string[];
  neverTried: string[];
  shoppingList: string[];
  userMatch: User[];
}
