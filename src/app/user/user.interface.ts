import {ResponseData} from "../@shared/interface/response-interface.data";
import {DefaultSearchOptions} from "../@shared/util/search";

export interface User {
  name: string,
  email: string,
  maritalStatus: string,
  role: string,
  address: {
    cep: string,
    address: string,
    number: string,
    state: string,
    city: string
  },
  isConfirmed: boolean
}

export interface UserInvites {
  id: string,
  token: string,
  email: string,
  name: string,
  createdAt: Date,
  expiresAt: Date,
  status: string
}

export interface UserInvitesResponse extends ResponseData<UserInvites> {}

export interface UserSearchOptions extends DefaultSearchOptions {}
