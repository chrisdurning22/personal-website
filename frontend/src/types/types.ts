export type Section = {
    id: number;
    title: string;
    content: string;
}

export type LoginDetails = {
    email: string;
    password: string;
}

export type RegisterDetails = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type NoProps = {}

export type NoState = {}
