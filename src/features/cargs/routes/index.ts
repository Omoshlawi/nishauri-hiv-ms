import { Router } from "express";
import {
  createEvents,
  createGroups,
  getEvents,
  getGroups,
  getMyGroupEnrollments,
} from "../controlers";

const router = Router();
router.get("/enrollments", getMyGroupEnrollments);
router.get("/groups", getGroups);
router.post("/groups", createGroups);
router.get("/events", getEvents);
router.post("/events", createEvents);
export default router;
