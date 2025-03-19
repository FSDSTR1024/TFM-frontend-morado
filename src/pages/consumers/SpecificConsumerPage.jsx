/*********************************************** External Node modules ************************************************/
import { useParams } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { ConsumerProfile } from "/src/components/molecules";

/**************************************************** Page Content ****************************************************/
const SpecificConsumerPage = () => {
  const { consumerId } = useParams();
  return <ConsumerProfile consumerId={consumerId}/>
};

/********************************************** Named export (ES module) **********************************************/
export { SpecificConsumerPage };
