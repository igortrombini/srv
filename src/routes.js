import { Router } from "express";
import SessionController from "./controllers/SessionController";
import UserController from "./controllers/UserController";
import auth from "./middlewares/auth";

import multer from "multer";
import uploadConfig from "./middlewares/upload";
import ImobiController from "./controllers/ImobiController";
import MessageController from "./controllers/MessageController";
import pesquisarImoveis from "./controllers/PesquisaController";

const upload = multer(uploadConfig);

const router = Router();


router.get('/pesquisar-imoveis', pesquisarImoveis);
router.post('/createusers', UserController.createUser);
router.get('/listusers', UserController.findAllUser);
router.get('/listusers/:userId', UserController.findUser);
router.post('/session', SessionController.createSession);
router.post('/createimobi', upload.single("thumb"), ImobiController.createImobi);
router.get('/listimobi', ImobiController.findAllImobi);
router.get('/listimobi/:slug', ImobiController.findImobi);
router.post('/createmessage', MessageController.createMessage);
router.get('/listmessage/:id', MessageController.findMessage);

export { router }