import { DefaultSession } from "next-auth";

export type ExtendSessionType = {
    role:'ADMIN'|"USER"
} & DefaultSession['user']

declare module "next-auth" {
    interface Session {
        user: ExtendSessionType
    }
}