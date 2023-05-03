import { createRequire } from "module";
import importAsString from "@reactioncommerce/api-utils/importAsString.js";
const require = createRequire(import.meta.url);
const pkg = require("../package.json");
import myResolvers from "./resolvers/resolvers.js"
const mySchema = importAsString("./schema/schema.graphql");
// import mySchema from "./schema/schema.graphql"
/**
 * @summary Import and call this function to add this plugin to your API.
 * @param {Object} app The ReactionAPI instance
 * @returns {undefined}
 */
export default async function register(app) {
  await app.registerPlugin({
    label: pkg.label,
    name: pkg.name,
    version: pkg.version,
    // collections: {
    //   Shops: {
    //     name: "Shops",
    //     updatedAt: { type: Date, default: Date.now },
    //     createdAt: { type: Date, default: Date.now },
    //   },
    // },
    graphQL: {
      schemas: [mySchema],
      resolvers: myResolvers,
    }
  });
}
