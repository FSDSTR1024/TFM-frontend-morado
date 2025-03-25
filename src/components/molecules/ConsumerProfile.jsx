/************************************************ Node modules needed *************************************************/
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/********************************************** Internal library imports **********************************************/
import { AuthContext, WebSocketContext } from "/src/contexts";
import { ChangeProfilePictureButton, Loading } from "/src/components/atoms";
import { getConsumerAchievements, Logger } from "/src/utils";
import { getUserImgURL } from "/src/utils";
import { ModalOnCredentialsChange, ModalOnProfileEdit } from "/src/components/molecules";
import { userAPI } from "/src/api";
import { useLogout } from "/src/hooks";

/************************************************** Internal logger ***************************************************/
const logger = new Logger("ConsumerProfile");

/************************************************ Component Definition ************************************************/
const ConsumerProfile = ({ consumerId }) => {
  const { loggedUser } = useContext(AuthContext);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { wsLogoutUser } = useContext(WebSocketContext);

  const [isLoggedConsumer, setIsLoggedConsumer] = useState(false);
  const [consumer, setConsumer] = useState(null);
  useEffect(() => {
    const getConsumer = async () => {
      try {
        const { consumer } = await userAPI.getConsumerById(consumerId);
        setConsumer(consumer);
      } catch (error) {
        setConsumer(null);
        const errorText = "There was an error while trying to fetch the Consumer user!";
        logger.error(errorText, error);
      }
    };

    if (loggedUser?._id === consumerId) {
      setConsumer(loggedUser);
      setIsLoggedConsumer(true);
    } else {
      getConsumer();
      setIsLoggedConsumer(false);
    }
  }, [consumerId, loggedUser]);

  const handleChangeCredentialsClick = useCallback(() => {
    document.getElementById("on_credentials_change_modal").showModal();
  }, []);

  const [isLoadingDelete, setIsLoadingDelete] = useState(true);
  const handleDeleteAccountClick = useCallback(async () => {
    if (!isLoggedConsumer) return;
    if (confirm("Are you sure you want to delete this consumer account?") === true) {
      if (confirm("This will be FOREVER. There will not be any going back, or CTRL+Z. Are you REALLY sure?") === true) {
        document.getElementById("on_loading_modal").showModal();
        try {
          await userAPI.deleteUser(loggedUser._id, loggedUser.role);
          wsLogoutUser();
          logout();
          setIsLoadingDelete(false);
          navigate("/");
          document.getElementById("on_account_delete_modal").showModal();
        } catch (error) {
          const errorText = `Consumer user ${loggedUser._id} could not be deleted!`;
          logger.error(errorText, error);
        }
      }
    }
  }, [isLoggedConsumer, loggedUser]);

  useEffect(() => {
    if (!isLoadingDelete) {
      document.getElementById("on_loading_modal").close();
    }
  }, [isLoadingDelete]);

  const handleEditProfileClick = useCallback(() => {
    document.getElementById("on_profile_edit_modal").showModal();
  }, []);

  const editableFields = [
    { name: "name", text: "Name" },
    { name: "surname", text: "Surname" }
  ];

  const [achievements, setAchievements] = useState([]);
  useEffect(() => {
    setAchievements(getConsumerAchievements({ ...consumer }));
  }, [consumer]);

  return !consumer ? (
    <Loading />
  ) : (
    <>
      {isLoggedConsumer && (
        <>
          <ModalOnCredentialsChange {...consumer} />
          <ModalOnProfileEdit editableFields={editableFields} {...consumer} />
        </>
      )}
      <div className="container mx-auto p-6">
        <div className="bg-base-100 shadow-xl rounded-lg p-6 mb-6">
          <div className="flex justify-between gap-6">
            <div className="flex flex-col justify-start items-center gap-2 w-96">
              <img alt={consumer.name} className="w-60 h-60 rounded-lg" src={getUserImgURL({ ...consumer })} />
              {isLoggedConsumer && <ChangeProfilePictureButton />}
            </div>
            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <h1 className="text-4xl font-bold">{consumer.name}</h1>
              </div>
              <p className="text-2xl text-gray-600 mb-2">{consumer.surname}</p>
              <div className="divider text-xl font-semibold mt-6 mb-3">Information</div>
              {isLoggedConsumer && (
                <div className="mb-2">
                  <span className="text-lg text-gray-400 font-semibold">📧 Email: </span>
                  <span className="text-lg text-gray-600">{consumer.email}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <p className="text-lg text-gray-400 font-semibold">🍽 Total Reviews: </p>
                <div className="flex flex-col gap-0">
                  <span className="text-lg text-gray-600">{consumer.reviewed_dishes.toLocaleString("en-US")} dishes</span>
                  <span className="text-lg text-gray-600">{consumer.reviewed_restaurants.toLocaleString("en-US")} restaurants</span>
                </div>
              </div>
              <div>
                <div className="divider text-xl font-semibold mt-6">Achievements</div>
                {achievements && achievements.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-y-2 gap-x-4 mt-2">
                    {achievements.map(({name, url}, index) => (
                      <div className="tooltip" data-tip={name} key={index}>
                        <img alt={`Achievement ${name}`} className="w-16 h-16" src={url} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {isLoggedConsumer && (
                <>
                  <div className="divider text-xl font-semibold mt-6 mb-5">Actions</div>
                  <div className="flex justify-evenly">
                    <button className="btn btn-secondary btn-outline" onClick={handleEditProfileClick}>
                      Edit Profile
                    </button>
                    <button className="btn btn-accent btn-outline" onClick={handleChangeCredentialsClick}>
                      Change Credentials
                    </button>
                    <button className="btn btn-error btn-outline" onClick={handleDeleteAccountClick}>
                      Delete Account
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/********************************************** Named export (ES module) **********************************************/
export { ConsumerProfile };
