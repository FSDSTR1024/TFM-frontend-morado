/************************************************ Component Definition ************************************************/
const TextParagraph = ({ text }) => {
  return text.split("\n").map((line, index) => (line ? <p key={index}>{line}</p> : <br key={index} />));
};

/********************************************** Named export (ES module) **********************************************/
export { TextParagraph };
