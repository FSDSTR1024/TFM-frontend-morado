/*********************************************** Utilities definitions ************************************************/
const getSHA1Hash = async (input) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
};

/********************************************** Named export (ES module) **********************************************/
export { getSHA1Hash };
