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
