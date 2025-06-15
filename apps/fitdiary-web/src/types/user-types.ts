export type TUser = {
    uuid: string,
    login: string,
    email: string | null,
    phone: string | null,
    scopes: string[],
    name: string,
    birthDate: Date,
    gender: string | null,
}