import { connectDB } from "@/util/MongoData";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      credentials: {
        id: { label: "Id", type: "text" },
        password: { label: "Password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials: any): Promise<any> {
        let db = (await connectDB).db("next-shop");
        let user = await db.collection("user").findOne({ id: credentials.id });
        if (!user) {
          console.log("해당 아이디는 존재하지 않습니다.");
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log("비밀번호가 틀리셨습니다.");
          return null;
        }
        return user;
      },
    }),
    // GithubProvider({
    //   clientId: "a7060ee13d8c5ef11317",
    //   clientSecret: "e8f9ee55a7ee941af0899e43f784a2f6fdda4494",
    // }),
    // GoogleProvider({
    //   clientId:
    //     process.env.GOOGLE_ID ??
    //     "764659064580-6l9mqqirgj11qc5uu9h7bid0impt116n.apps.googleusercontent.com",
    //   clientSecret:
    //     process.env.GOOGLE_SECRET ?? "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",
    // }),
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      if (token && token.user) {
        session.user = token.user as {
          name?: string | null | undefined;
          email?: string | null | undefined;
          id?: string | null | undefined;
        };
      }
      return session;
    },
  },

  // @@@pages추가
  pages: {
    signIn: "/login",
  },

  // secret: "qwer1234",
  secret: process.env.NEXTAUTH_SECRET,
  //@npm install @next-auth/mongodb-adapter
  adapter: MongoDBAdapter(connectDB),
};
export default NextAuth(authOptions);
