export interface Address {
    id: string;

    fullName: string;

    phone: string;

    email: string;

    addressLine1: string;

    addressLine2?: string;

    city: string;

    state: string;

    country: string;

    postalCode: string;

    landmark?: string;

    isDefault: boolean;
}