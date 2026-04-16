import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import connectDb from "./lib/db";
import User from "./models/user.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, request) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        await connectDb();

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await User.findOne({ email });

        if (!user) {
          throw new Error("No user found with the given email");
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  
  callbacks: {

    async signIn({user, account}){
      if (account?.provider=="google") {
        await connectDb()
        let dbUser=await User.findOne({email:user.email})

        if(!dbUser){
          dbUser=await User.create({
            name: user.name,
            email: user.email,
            image: user.image
          })
        }

        user.id=dbUser._id.toString()
        user.role=dbUser.role
      }
      return true
    },

    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60 *1000,
  },
  secret: process.env.AUTH_SECRET,
});
