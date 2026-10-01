export interface MeResponse {
    id:          string;
    name:        string;
    email:       string;
    memberships: Membership[];
}

export interface Membership {
    role:         string;
    organization: Organization;
}

export interface Organization {
    id:   string;
    name: string;
    slug: string;
    type: string;
}