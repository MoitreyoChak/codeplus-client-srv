import { connectDB, getCollection } from "./mongo";
import CredentialsProvider from "next-auth/providers/credentials";

const NEXTAUTH_CONFIG = {
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                name: { label: "Name", type: "text" },
            },

            async authorize(credentials, req) {
                await connectDB();
                const usersCollection = getCollection("users");
                console.log("authorizing user with email:", credentials?.email);
                const user = await usersCollection.findOne(
                    { email: credentials.email },
                    {
                        projection: {
                            email: 1, name: 1, password: 1
                        }
                    }
                );

                if (!user) throw new Error("email does not exist.Please create an account first");

                const passwordMatch = credentials.password == user.password;

                // const passwordMatch = await bcrypt.compare(
                //     credentials.password,
                //     user.password
                // );

                if (!passwordMatch) throw new Error("Wrong Password");
                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                };;
            }
        })
    ], callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id.toString();  // Store id inside the token
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token, user }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin'
    }
}

export default NEXTAUTH_CONFIG