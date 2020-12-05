/**
 * @interface IUser Models the user data that API call returns.
 */
export interface IUser {
    gender: string,
    name: {
        title: string,
        first: string,
        last: string
    },
    location: {
        street: {
            "number": number,
            "name": string
        },
        city: string,
        state: string,
        postcode: number,
        coordinates: {
            latitude: string,
            longitude: string
        },
        timezone: {
            offset: string,
            description: string
        }
    },
    email: string,
    login: {
        uuid: string,
        username: string,
        password: string,
        salt: string,
        md5: string,
        sha1: string,
        sha256: string
    },
    dob: {
        date: string,
        age: number
    },
    registered: {
        date: string,
        age: number
    },
    phone: string,
    cell: string,
    id: {
        name: string,
        value: null | string
    },
    picture: {
        large: string,
        medium: string,
        thumbnail: string
    },
    nat: string
}

/**
 * @interface IProfile Model that @component ProfileDetails expects to receive
 */

export interface IProfile {
    age: number,
    avatar: string,
    name: {
        first: string,
        last: string
    },
    coordinates: Coordinates,
    gender: string,
    contact: {
        email: string,
        phone: string,
        cell: string,
    }
}

export interface Coordinates {
    latitude: number,
    longitude: number
}

/**
 * @interface IInfo Models metadata that the API call returns. 
 */
interface IInfo {
    seed: string,
    results: number,
    page: number,
    version: string
}

/**
 * @interface IData Models the whole shape of the successfull API response.
 */

export interface IData {
    results: IUser[],
    info: IInfo
}

