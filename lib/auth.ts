export function hasAdminRole(value: unknown) {
  if (!value || typeof value !== "object" || !("app_metadata" in value)) {
    return false;
  }

  const appMetadata = value.app_metadata;

  return (
    typeof appMetadata === "object" &&
    appMetadata !== null &&
    "role" in appMetadata &&
    appMetadata.role === "admin"
  );
}
