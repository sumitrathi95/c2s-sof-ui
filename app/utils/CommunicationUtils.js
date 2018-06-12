
export function getRoleName(roleReference) {
  const roleName = (roleReference && roleReference.indexOf('/') > 0) ? roleReference.substring(0, roleReference.indexOf('/')) : '';
  return roleName;
}
