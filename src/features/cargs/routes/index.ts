import { Router } from "express";
import { getTreatmentSuports } from "../controlers";

const router = Router();
router.get("/", getTreatmentSuports);
export default router;
