import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    callbacks: {
        async session({ session, token }) {
            // console.log(session , token)
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }
            
            // if(token.role && session.user){
            //     session.user.role = token.role as 'ADMIN' | 'USER';
            // }   
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            // 可以添加一些有用的信息，比如角色等
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: 'jwt' },
    ...authConfig
});