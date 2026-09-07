import "next-auth";
// Imports NextAuth so we can extend its default TypeScript types.


declare module "next-auth" {
    interface User {
        role: string;
    }
    // Adds the role property to NextAuth's User type.
}


declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string;
    }
    // Adds id and role to the JWT token type.
}