import { NextApiRequest, NextApiResponse } from "next";
import aws from "aws-sdk";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: "ap-northeast-2",
    signatureVersion: "v4",
  });

  let urlArray = [];

  const folderName = "transaction/";

  for (let i = 0; i < req.body.image.length; i++) {
    const s3 = new aws.S3();
    const url = await s3.createPresignedPost({
      Bucket: process.env.AWS_BUCKET_NAME,
      Fields: { key: folderName + req.body.image[i] },
      Expires: 60,
      Conditions: [["content-length-range", 0, 1048576]],
    });
    urlArray.push(url);
  }

  return res.status(200).json(urlArray);
}
