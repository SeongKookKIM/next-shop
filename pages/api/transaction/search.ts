import { connectDB } from "@/util/MongoData";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = (await connectDB).db("next-shop");

  if (req.body.value === "") {
    const result = await db.collection("transaction").find().toArray();

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(200).send("리스트 목록 조회 오류");
    }
  } else {
    let search = [
      {
        $search: {
          index: "next-shop-search",
          text: {
            query: req.body.value,
            path: [
              "name",
              "phone",
              "email",
              "title",
              "shopName",
              "url",
              "price",
            ],
          },
        },
      },
    ];

    const result = await db
      .collection("transaction")
      .aggregate(search)
      .toArray();

    if (result) {
      return res.status(200).json(result);
    } else {
      return res.status(403).send("검색오류");
    }
  }
}
