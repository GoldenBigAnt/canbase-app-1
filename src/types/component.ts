import { Href } from "expo-router";

export interface WrapperProps {
  children?: React.ReactNode;
}

export interface ClubCardPropsInterface {
  title: string;
  icon: React.ReactNode;
  content: string;
  btnIcon: React.ReactNode;
  btnText: string;
  route: Href<string | object>;
}

export interface ProfileInputPropsInterface {
  type?: "text" | "email" | "password" | "date" | "textarea";
  value?: string;
  placeholder?: string;
  onChange: (text: string) => void;
}

export interface ClubPropsInterface {
  clubname: string;
  badge?: string;
  avatar?: string;
  users: number;
  maxUser: number;
  description?: string;
  prevent_info?: string;
  email?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  discord?: string;
  facebook?: string;
  youtube?: string;
  clubStatus: string;
  clubID: string;
  allowRequest?: boolean;
}

export interface ClubStatusPropsInterface {
  done: boolean;
  title: string;
  content: string;
  last?: boolean;
}

export interface ClubLinkPropsInterface {
  title: string;
  icon: React.ReactNode;
  link: Href<string | object>;
  disabled?: boolean;
}

export interface OverviewPropsInterface {
  title: string;
  description?: string;
  contnet: string;
}

export interface MessagePropsInterface {
  item: {
    user: {
      _id: string;
      username: string;
      avatar: string;
    };
    chat: string;
    type: number;
    date: string;
  };
}

export interface StrainCardPropsInterface {
  strain: any;
}

export interface TextGroupPropsInterface {
  title: string;
  content: string;
}
