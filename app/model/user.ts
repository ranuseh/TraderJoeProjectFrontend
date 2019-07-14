interface User {
  facebookId: string;
  email: string;
  name: string;
  like: Product[];
  dislike: Product[];
  neverTried: Product[];
  recommended: Product[];
  // userMatch: User[];
}
