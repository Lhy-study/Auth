import { useSession } from "next-auth/react";

/** 获取当前用户的信息 */
export const useCurrentUser = () => {
    const session = useSession();

    return session.data?.user;
}