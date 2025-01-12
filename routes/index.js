import e from "express";
import authRoutes from "./authRoutes.js";

const router =  e.Router();

router.use(authRoutes);

export default router;