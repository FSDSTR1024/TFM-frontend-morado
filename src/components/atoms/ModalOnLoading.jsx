/************************************************* Internal libraries *************************************************/
import { Loading } from "/src/components/atoms";

/************************************************ Component Definition ************************************************/
const ModalOnLoading = () => (
  <dialog className="modal" id="on_loading_modal">
    <Loading />
  </dialog>
);

/********************************************** Named export (ES module) **********************************************/
export { ModalOnLoading };
