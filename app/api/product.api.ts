import Product from '../model/product.model';

export const getProduct = (productId: string): Promise<Product> => {
  return fetch(
    `http://traderjoeprojectbackend-env.ybsmmpegn5.us-west-2.elasticbeanstalk.com/products/${productId}`,
  )
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
};

export type UserList = 'like' | 'dislike' | 'neverTried' | 'shoppingList';
export type Vote = UserList | 'delete';

export const deleteProductFromUser = (
  facebookId: string,
  productId: string[] | string,
) => {
  return fetch(
    `http://traderjoeprojectbackend-env.ybsmmpegn5.us-west-2.elasticbeanstalk.com/${facebookId}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        productId,
      }),
    },
  )
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const incrementProduct = (
  // facebookId: string,
  productId: string[] | string,
) => {
  return fetch(
    `http://traderjoeprojectbackend-env.ybsmmpegn5.us-west-2.elasticbeanstalk.com/add/${productId}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        productId,
      }),
    },
  )
    .then(response => response.json())
    .catch(error => console.log(error));
};

export const decrementProduct = (
  // facebookId: string,
  productId: string[] | string,
) => {
  return fetch(
    `http://traderjoeprojectbackend-env.ybsmmpegn5.us-west-2.elasticbeanstalk.com/add/${productId}`,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        productId,
      }),
    },
  )
    .then(response => response.json())
    .catch(error => console.log(error));
};
