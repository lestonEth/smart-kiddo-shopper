import aws4 from "aws4";

const AWS_ACCESS_KEY = import.meta.env.VITE_AWS_ACCESS_KEY!;
const AWS_SECRET_KEY = import.meta.env.VITE_AWS_SECRET_KEY!;
const AWS_REGION = import.meta.env.VITE_AWS_REGION!;
const AWS_SPAPI_HOST = "sellingpartnerapi-na.amazon.com"; // Change based on your marketplace

export const signRequest = (url: string, method: string = "GET", body: any = null) => {
    const opts = {
        host: AWS_SPAPI_HOST,
        path: url,
        method,
        body: body ? JSON.stringify(body) : undefined,
        service: "execute-api",
        region: AWS_REGION,
        headers: {
            "Content-Type": "application/json",
        },
    };

    aws4.sign(opts, {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    });

    return opts;
};
