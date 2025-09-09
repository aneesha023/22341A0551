const LOG_ENDPOINT = process.env.LOG_ENDPOINT || "http://20.244.56.144/evaluation-service/logs";
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || process.env.access_token || null;

const allowedStacks = ["backend", "frontend"];
const allowedLevels = ["info", "warn", "error", "debug"];
const allowedBackendPackages = ["auth", "validate", "utils", "logger", "repository", "service"];
const allowedFrontendPackages = ["api"];
const allowedSharedPackages = ["auth", "config", "shared", "utils", "frontend"];

function isPackageAllowed(stack, packageName) {
  if (stack === "backend") {
    return allowedBackendPackages.includes(packageName) || allowedSharedPackages.includes(packageName);
  }
  if (stack === "frontend") {
    return allowedFrontendPackages.includes(packageName) || allowedSharedPackages.includes(packageName);
  }
  return false;
}

async function sendLog(stack, level, packageName, message) {
  stack = stack.toLowerCase();
  level = level.toLowerCase();
  packageName = packageName.toLowerCase();

  if (!allowedStacks.includes(stack)) throw new Error("Invalid stack: " + stack);
  if (!allowedLevels.includes(level)) throw new Error("Invalid level: " + level);
  if (!isPackageAllowed(stack, packageName)) throw new Error("Invalid package: " + packageName);

  const body = { stack, level, package: packageName, message };

  let fetchFn = (typeof globalThis !== 'undefined' && globalThis.fetch) ? globalThis.fetch : null;
  if (!fetchFn) {
    const mod = await import('node-fetch');
    fetchFn = mod.default || mod;
  }

  const headers = { "Content-Type": "application/json" };
  if (ACCESS_TOKEN) headers['Authorization'] = `Bearer ${ACCESS_TOKEN}`;

  const res = await fetchFn(LOG_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (res.status < 200 || res.status >= 300) throw new Error("Log API failed with status: " + res.status);
  try {
    return await res.json();
  } catch (e) {
    return {}; // if body is empty/non-json, just return empty
  }
}

async function logErrorMiddleware(err, req, res, next) {
  try {
    await sendLog("backend", "error", "service", err.message);
  } catch (e) {
    console.error("Failed to log error: " + (e && e.message ? e.message : e));
  }
  next(err);
}

module.exports = { sendLog, logErrorMiddleware };
