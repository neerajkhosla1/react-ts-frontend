import * as moment from 'moment';
export class User {

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly dob: string,
        public readonly gender: string,
    ) {}

    static FromBackend(data: any) {
        return new User(
            data._id,
            data.name,
            data.email,
            moment(data.dateOfBirth).format('YYYY-MM-DD'),
            data.gender
        )
    }

}