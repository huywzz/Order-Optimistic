const { Schema, model } = require("mongoose");

const DOCUMENT_NAME = "Inventory";
const COLLECTION_NAME = "Inventories";

const inventorySchema = new Schema(
    {
        inven_productId: { type: Schema.Types.ObjectId, ref: "Product" },
        inven_stock: { type: Number, required: true },
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME,
    }
);

module.exports = model(DOCUMENT_NAME, inventorySchema);
