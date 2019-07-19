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

export const deleteProductFromUser = (
  facebookId: string,
  vote: 'like' | 'dislike' | 'neverTried' | 'shoppingList' | 'userMatch',
  productId: string[] | string,
) => {
  fetch(
    `http://traderjoeprojectbackend-env.ybsmmpegn5.us-west-2.elasticbeanstalk.com/${facebookId}`,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        [vote]: productId,
      }),
    },
  )
    .then(response => response.json())
    .catch(error => console.log(error));
  console.log('IN DELETE PRODUCT FROM USER');
};
