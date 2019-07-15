import User from '../model/user.model';

export const getUser = (facebookId: string): Promise<User> => {
  return fetch(
    `http://traderjoeprojectbackend-env.ybsmmpegn5.us-west-2.elasticbeanstalk.com/users/${facebookId}`,
  )
    .then(response => response.json())
    .catch(error => {
      console.log(error);
    });
};

export const getOrCreateUser = async (
  facebookId: string,
  email: string,
  name: string,
  image: string,
): Promise<User> => {
  const user = await getUser(facebookId);

  if (user) {
    return user;
  } else {
    const newUser = addNewUser(facebookId, email, name, image);

    return newUser;
  }
};

export const addNewUser = async (
  facebookId: string,
  email: string,
  name: string,
  image: string,
): Promise<User> => {
  const user: User = {
    email,
    facebookId,
    name,
    image,
    like: [],
    dislike: [],
    neverTried: [],
    recommended: [],
  };

  try {
    const response = await fetch(
      'http://traderjoeprojectbackend-env.ybsmmpegn5.us-west-2.elasticbeanstalk.com/users/add',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      },
    );

    if (response.status >= 200 && response.status < 300) {
      return user;
    }
  } catch (errors) {
    console.log(errors);
  }
  return null;
};

export const updateUser = (
  facebookId: string,
  vote: 'like' | 'dislike' | 'neverTried',
  productId: string,
) => {
  fetch(
    `http://traderjoeprojectbackend-env.ybsmmpegn5.us-west-2.elasticbeanstalk.com/users/${facebookId}`,
    {
      method: 'PUT',
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
};