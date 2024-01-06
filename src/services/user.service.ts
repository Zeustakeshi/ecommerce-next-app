import prisma from "@/lib/db";
import { Profile, User } from "@prisma/client";

class UserService {
    private userRepository = prisma.user;

    public async findAllUser() {
        return await this.userRepository.findMany();
    }

    public async findUserByEmail(email: string) {
        return await this.userRepository.findUnique({
            where: {
                email: email,
            },
        });
    }

    public async createUser(data: User) {
        return await this.userRepository.create({
            data: data,
        });
    }

    public async createUserProfile({
        userId,
        profile,
    }: {
        userId: string;
        profile: Profile;
    }) {}
}

export default new UserService();
