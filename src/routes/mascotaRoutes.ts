import { Router } from "express";
import * as mascotaController from "../controllers/mascotaController";

const router = Router();

router.get("/", mascotaController.getAll);
router.get("/:param", mascotaController.getByParam);
router.post("/", mascotaController.create);
router.put("/", mascotaController.update);
router.delete("/", mascotaController.remove);

export default router;
