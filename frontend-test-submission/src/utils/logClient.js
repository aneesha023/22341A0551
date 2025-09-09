const LOG_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";

export async function sendFrontendLog(level, packageName, message) {
  const stack = "frontend";
  const allowedLevels = ["info", "warn", "error", "debug"];
  const allowedFrontendPackages = ["api", "auth", "config", "shared", "utils", "frontend"];

  if (!allowedLevels.includes(level)) throw new Error("Invalid level");
  if (!allowedFrontendPackages.includes(packageName)) throw new Error("Invalid package");

  const body = { stack, level, package: packageName, message };
  
  const res = await fetch(LOG_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  
  if (!res.ok) {
    throw new Error("Frontend Log API failed");
  }
  
  return res.json();
}
