import { users } from "@utils/users";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
    providers: [
        Credentials({
            name: 'Email',
            credentials: {
                email: { label: 'email', type: 'email', required: true },
                password: {label: 'password', type: 'password', required: true}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) return null;

                const currentUser = users.find(user => user.email === credentials.email)
                
                if (currentUser && currentUser.password === credentials.password) {
                    const { password, ...userWithoutPassword } = currentUser;
                    return userWithoutPassword;
                }

                return null
            }
        })
    ]
};

