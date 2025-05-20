import { Request, Response } from "express";
import { onError } from "../utils/on-error";
import path from "path";

export class UploadController {
  public async upload(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ mensagem: "Nenhum arquivo enviado." });
        return;
      }

      const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

      res.status(200).json({
        success: 1,
        file: {
          url: fileUrl,
        },
      });
    } catch (error) {
      console.error("Erro no upload:", error);
      onError(error, res);
    }
  }
}
