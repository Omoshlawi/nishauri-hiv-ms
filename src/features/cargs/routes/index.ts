import { Router } from "express";
import {
  createEvents,
  createGroups,
  getEvents,
  getGroups,
  getMyGroupEnrollments,
  updateEvent,
  updateGroup,
} from "../controlers";

const router = Router();
router.get("/enrollments", getMyGroupEnrollments);
router.get("/groups", getGroups);
router.post("/groups", createGroups);
router.put("/groups/:id", updateGroup);
router.get("/events", getEvents);
router.post("/events", createEvents);
router.put("/events/:id", updateEvent);
export default router;
