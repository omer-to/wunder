import axios from 'axios'
import faker from 'faker'

import type { IData, IProfile, Coordinates } from '../models'


const uri = 'https://randomuser.me/api/'

/**
 * MapView expects number instead of string.
 * Transforms coordinates into numbers.
 */
const transformCoordinates = (): Coordinates => ({ latitude: parseFloat(faker.address.latitude(50, 42)), longitude: parseFloat(faker.address.longitude(20, 30)) })

/**
 * @returns Promise that resolves with @interface IProfile  
 */
export async function randomUserGenerator(): Promise<IProfile> {
    try {
        const { data: { results } } = await axios.get<IData>(uri)
        const [ user ] = results
        return {
            age: user.dob.age,
            avatar: user.picture.thumbnail,
            name: {
                first: user.name.first,
                last: user.name.last
            },
            coordinates: transformCoordinates(),
            gender: user.gender,
        }
    } catch (error) {
        /**
         * Fallback mock data in case API response fails
         */
        return {
            age: faker.random.number({ max: 50, min: 20 }),
            avatar: faker.image.people(),
            name: {
                first: faker.name.firstName(),
                last: faker.name.lastName()
            },
            coordinates: transformCoordinates(),
            gender: faker.random.boolean() ? 'male' : 'female',
        }
    }

}


