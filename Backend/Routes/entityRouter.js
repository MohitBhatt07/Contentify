const express = require('express');
const { getAllEntities, createEntity, deleteEntity } = require('../controller/entityController');

const router = express.Router();

router.get("/" , getAllEntities);
router.post("/" , createEntity);
router.delete("/:tableName" ,deleteEntity );

module.exports = router;