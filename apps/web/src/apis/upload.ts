import { request } from "@/utils/request";

export const uploadFile = (data: FormData) => {
  return request.post("/upload", data);
};
