import * as AppRootPath from "app-root-path";
import {
    createWebpackConfig as createWebpackConfigFn,
    DEFAULT_BUILD_CONFIG,
    DEFAULT_METADATA_SCHEMA,
} from "userscripter/build";

import METADATA from "./metadata";
import * as CONFIG from "./src/config";
import * as SITE from "./src/site";
import U from "./src/userscript";
import { Configuration } from "webpack";

const createWebpackConfig: Configuration = createWebpackConfigFn({

    buildConfig: {
        ...DEFAULT_BUILD_CONFIG({
            rootDir: AppRootPath.path,
            id: U.id,
            now: new Date(),
        }),
        sassVariables: { CONFIG, SITE },
    },
    metadata: METADATA,
    metadataSchema: DEFAULT_METADATA_SCHEMA,
    env: process.env,
});
const finalConfig: Configuration = {
  ...createWebpackConfig,
  module: {
    ...createWebpackConfig.module,
    rules: [
      ...(createWebpackConfig.module?.rules || []),
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};

export default finalConfig;