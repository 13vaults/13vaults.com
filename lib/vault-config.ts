import getConfig from "next/config";
import { PropertyPath, get } from "lodash";

const config = getConfig();

export const getVaultConfig = (
  xs: PropertyPath,
  defaultValue = null
): null | any =>
  get(get(config, "serverRuntimeConfig.vaultConfig", {}), xs, defaultValue);
