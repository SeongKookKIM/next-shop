import { connectDB } from "@/util/MongoData";
import { NextApiRequest, NextApiResponse } from "next";

interface Filter {
  $and?: Array<object>;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = (await connectDB).db("next-shop");

  const data = req.body;

  const { priceMin, priceMax, salesMin, salesMax, revenueMin, revenueMax } =
    data;

  try {
    let filter: Filter = {};

    // 필터링 조건 설정
    const conditions = [];

    if (priceMin !== "" || priceMax !== "") {
      conditions.push({
        price: {
          $gte: priceMin !== "" ? parseInt(priceMin) : 0,
          $lte: priceMax !== "" ? parseInt(priceMax) : Infinity,
        },
      });
    }

    if (salesMin !== "" || salesMax !== "") {
      conditions.push({
        sales: {
          $gte: salesMin !== "" ? parseInt(salesMin) : 0,
          $lte: salesMax !== "" ? parseInt(salesMax) : Infinity,
        },
      });
    }

    if (revenueMin !== "" || revenueMax !== "") {
      conditions.push({
        revenue: {
          $gte: revenueMin !== "" ? parseInt(revenueMin) : 0,
          $lte: revenueMax !== "" ? parseInt(revenueMax) : Infinity,
        },
      });
    }

    if (conditions.length > 0) {
      filter.$and = conditions;
    }

    // MongoDB에서 데이터 조회
    const result = await db.collection("transaction").find(filter).toArray();

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(403).send("필터 적용중 오류가 발생했습니다.");
  }
}
