var Model = require('../../config/database');
// Import the plugin for soft delete recored
const softDelete = require('objection-soft-delete');
// Plugin for encript and descript data
class AppModel extends softDelete({	columnName: 'deleted_at'})(Model) {
	constructor() {
		super();
	}
	// It's call just befor any insert opration is executed.
	async $beforeInsert(queryContext) {

		await super.$beforeInsert(queryContext);

		this.created_at = new Date().toISOString();
		this.updated_at = new Date().toISOString();

	}

	// It's call just before any update opration is executed
	async $beforeUpdate(queryContext) {

		await super.$beforeUpdate(queryContext);
		this.updated_at = new Date().toISOString();

	}
}

module.exports.AppModel = AppModel;
