export interface UserRegister {
  name: string;
  lastName: string;
  password: string;
  email: string;
  avatar?: Blob;
}

export interface User {
  data?: {
    _id: string;
    name: string;
    lastName: string;
    avatar: string;
    bio: string;
    fallow?: number;
    blogs?: number;
    fallowers?: number;
    slug: string;
    social?: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
  };
  tokens?: {
    device_token?: string;
    refresh_token?: string;
    access_token: string;
  };
}
