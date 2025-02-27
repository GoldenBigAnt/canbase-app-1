export interface CreateClubFormDataType {
  clubname: string;
  street: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  description: string;
}

export interface MyProfileFormDataType {
  username: string;
  alias: string;
  birth: string;
  email: string;
  phone: string;
  street: string;
  address: string;
  postcode: string;
  city: string;
  country: string;
  bio: string;
}

export interface ChannelFormDataType {
  channelname: string;
  channeldesc: string;
}

export interface ChatFormDataType {
  message: string;
}
