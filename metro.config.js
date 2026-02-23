const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// En React Native, axios resuelve por defecto a la build de Node (que usa "crypto").
// Forzamos la build browser para que no dependa de módulos de Node.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "axios" || moduleName === "axios/") {
    return {
      type: "sourceFile",
      filePath: path.resolve(
        __dirname,
        "node_modules/axios/dist/browser/axios.cjs",
      ),
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
