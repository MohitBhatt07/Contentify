const { client } = require("../connectDB");

async function getAttributeNames(tableName) {
  const query = `
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = $1
    ORDER BY ordinal_position;
  `;

  const result = await client.query(query, [tableName]);
  return result.rows.map((row) => row.column_name);
}

const getAllEntities = async (req, res) => {
  try {
    const tableNames = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
    );
    const tableAttributes = {};
    for (const row of tableNames.rows) {
      const tableName = row.table_name;
      tableAttributes[tableName] = await getAttributeNames(tableName);
    }
    console.log(tableAttributes);
    res.json(tableAttributes);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch table names" });
  }
};
const createEntity = async (req, res) => {
  const { name, attributes } = req.body;
  console.log(name);
  console.log(attributes);
  try {
    const attributeDefinitions = attributes
      .map(({ name, type }) => `${name} ${type}`)
      .join(", ");

    const createTableQuery = `CREATE TABLE ${name} (id SERIAL PRIMARY KEY, ${attributeDefinitions})`;
    await client.query(createTableQuery);

    res.status(201).json({ message: `Entity ${name} created successfully` });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};

const readEntity = async (req, res) => {
  const { entityName } = req.params;

  try {
    const schemaQuery = `
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = '${entityName}'
      ORDER BY ordinal_position;
    `;
    const schemaResult = await client.query(schemaQuery);
    const schema = schemaResult.rows.map((row) => ({
      name: row.column_name,
      type: row.data_type,
    }));

    const query = `SELECT * FROM ${entityName}`;
    const result = await client.query(query);

    res.status(200).json({
      data: result.rows,
      schema,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error reading entity" });
  }
};

const getEntity = async (req, res) => {
  const { entityName } = req.params;

  try {
    const query = `SELECT * FROM ${entityName}`;
    const result = await client.query(query);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
};

const addDataToEntity = async (req, res) => {
  const { entityName } = req.params;
  const data = req.body;
  console.log(data);
  try {
    const columns = Object.keys(data).join(", ");
    const values = Object.values(data)
      .map((val) => `'${val}'`)
      .join(", ");
    const query = `INSERT INTO ${entityName} (${columns}) VALUES (${values})`;
    await client.query(query);
    res.status(201).json({ message: "Data created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create data" });
  }
};

const updateDatainEntity = async (req, res) => {
  const { entityName } = req.params;
  const { id, ...data } = req.body;

  try {
    const updateFields = Object.keys(data)
      .map((key) => `${key} = '${data[key]}'`)
      .join(", ");
    console.log(updateFields);
    const query = `UPDATE ${entityName} SET ${updateFields} WHERE id = ${id}`;
    await client.query(query);
    res.json({ message: "Data updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update data" });
  }
};

const deleteDatainEntity = async (req, res) => {
  const { entityName } = req.params;
  const { id } = req.body;

  try {
    const query = `DELETE FROM ${entityName} WHERE id = ${id}`;
    await client.query(query);
    res.json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete data" });
  }
};

const deleteEntity = async (req, res) => {
  const { tableName } = req.params;
  try {

    const tableExistsQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = $1
      )
    `;
    const tableExistsResult = await client.query(tableExistsQuery, [tableName]);

    if (!tableExistsResult.rows[0].exists) {
      return res
        .status(404)
        .json({ error: `Table '${tableName}' does not exist` });
    }

   
    const dropTableQuery = `DROP TABLE ${tableName}`;
    await client.query(dropTableQuery);

    res.json({ message: `Table '${tableName}' deleted successfully` });
  } catch (error) {
    // console.error("Error deleting table:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllEntities,
  createEntity,
  getEntity,
  addDataToEntity,
  deleteEntity,
  deleteDatainEntity,
  updateDatainEntity,
  readEntity,
};
