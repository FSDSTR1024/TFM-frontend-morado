/************************************************ Component Definition ************************************************/
const FormFieldError = ({ error }) => (error ? <p className="text-red-500 italic text-sm mt-1">{error.message}</p> : null);

/********************************************** Named export (ES module) **********************************************/
export { FormFieldError };
