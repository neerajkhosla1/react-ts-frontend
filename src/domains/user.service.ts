import axios from "axios";
import {User} from "./user";

const API = "http://localhost:3001";

export class UserService {

    static async fetchUsers(): Promise<User[]> {
        const response = await axios.get(API + "/users");
        return response.data.users.map((user: any) => User.FromBackend(user))
    }
    static async fetchUser(id: string): Promise<User> {
        const response = await axios.get(API + "/user/" + id);
        return response.data.user ? User.FromBackend(response.data.user) : null;
    }
    static async addUser(name: string, email: string, dob: string, gender: string): Promise<User[]> {
        const response = await axios.post(API + "/users", {
            name: name,
            email: email,
            dateOfBirth: dob,
            gender: gender
        });
        return response.data.map((user: any) => User.FromBackend(user))
    }
    static async updateUser(id: string, name: string, email: string, dob: string, gender: string): Promise<User[]> {
        const response = await axios.put(API + "/user/"+id, {
            name: name,
            email: email,
            dateOfBirth: dob,
            gender: gender
        });
        return response.data ? response.data : null;
    }
    static async deleteUser(id: string): Promise<User> {
        const response = await axios.delete(API + "/user/" + id);
        return response.data ? response.data : null;
    }
}