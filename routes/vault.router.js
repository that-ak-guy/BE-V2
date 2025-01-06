import { Router } from "express";
import { DeleteDataController, GetDataController, CreateDataController, UpdateDataController } from "../controllers/vault.controller.js";

const VaultRouter = Router()

VaultRouter.get('/getData', GetDataController)
VaultRouter.post('/createData', CreateDataController)
VaultRouter.delete('/deleteData', DeleteDataController)
VaultRouter.put('/updateData', UpdateDataController)


export default VaultRouter