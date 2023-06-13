import { users } from "@utils/users";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authConfig = {
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const currentUser = users.find((user) => user.email === credentials.email);

        const enteredPassword = credentials.password;
        const hashedPasswordFromDatabase = currentUser.password;

        const result = await new Promise((resolve, reject) => {
          bcrypt.compare(enteredPassword, hashedPasswordFromDatabase, (err, res) => {
            if (err) reject(err);
            resolve(res);
          });
        });

        if (result) {
          const { password, ...userWithoutPassword } = currentUser;
          return userWithoutPassword;
        } else {
          return null;
        }
      },
    }),
  ],
};
