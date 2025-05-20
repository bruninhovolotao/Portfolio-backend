import { Router } from "express";
import { UploadController } from "../controller/upload.controller";
import { upload } from "../middlewares/multer.middleware";

export class UploadRoutes {
  public static bind(): Router {
    const router = Router();
    const controller = new UploadController();

    router.post("/upload", upload.single("file"), controller.upload);

    return router;
  }
}
