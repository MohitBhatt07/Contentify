const express = require('express');
const {  getEntity, addDataToEntity, updateDatainEntity, deleteDatainEntity, readEntity } = require('../controller/entityController');


const router = express.Router();

router.get("/:entityName" , getEntity);
router.post("/:entityName" , addDataToEntity);
router.put("/:entityName" , updateDatainEntity);
router.delete("/:entityName" , deleteDatainEntity);

router.get("/readEntity/:entityName" , readEntity );
module.exports = router;