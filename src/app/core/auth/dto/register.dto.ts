export const ORGANIZATION_TYPE = {
  PERSONAL: 'PERSONAL',
  BUSINESS: 'BUSINESS',
} as const;

export type OrganizationType =
  typeof ORGANIZATION_TYPE[keyof typeof ORGANIZATION_TYPE];

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
  organizationType: OrganizationType;
  organizationName: string;
}

export interface RegisterResponse {
  user: User;
  organization: Organization;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  type: OrganizationType;
}

export interface User {
  id: string;
  name: string;
  email: string;
}