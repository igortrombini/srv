import { Router } from "express";
import UserController from "./controllers/UserController";
import SessionController from "./controllers/SessionController";
import auth from "./middlewares/auth";
import ImobiController from "./controllers/ImobiController";

import multer from "multer";
import uploadConfig from "./middlewares/upload";

const upload = multer(uploadConfig);

const router = Router();

router.post('/createusers', UserController.createUser);
router.get('/listusers', auth, UserController.findAllUser);
router.post('/session', SessionController.createSession);
router.post('/createimobi',upload.single("thumb"), ImobiController.createImobi);
router.get('/listimobi', ImobiController.findAllImobi);
router.get('/listimobi/:id', ImobiController.findImobi);

export { router }