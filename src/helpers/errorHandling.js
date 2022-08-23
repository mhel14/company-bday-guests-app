export const hasFieldError = (partner) => {
  if(!partner) return
  const keys = Object.keys(partner);
  if (
    !keys.includes("latitude") ||
    !keys.includes("longitude") ||
    !keys.includes("name") ||
    !keys.includes("partner_id")
  ) {
    return true;
  }
  return false;
};
