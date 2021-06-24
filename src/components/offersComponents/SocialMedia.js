import { useState, useEffect } from "react";
import {
  ApiDeleteService,
  ApiGetService,
  ApiPostService,
  ApiPutService,
} from "../../services/ApiServices";
import { ColorOne } from "../../styles/color";
import Loader from "../Loader";
import {
  ContainerColumn,
  Input,
  Formlable,
  Title,
  Imageview,
  ContainerRow,
  Submitbutton,
  LeftAlign,
  RightAlign,
} from "../../styles/styled";

const SocialMedia = () => {
  let initialState = {
    provider: "",
    icon: "",
    link: "",
  };

  const [socialMediaData, setSocialMediaData] = useState([]);
  const [isUpdate, setIsUpdate] = useState(null);
  const [detail, setDetail] = useState(initialState);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getAllSocialMedia();
  }, []);

  const getAllSocialMedia = async () => {
    setLoader(true);

    let res = await ApiGetService("allSocialMedia");

    if (res === null || res === false) alert("Error occured");
    else {
      if (res.length > 0) {
        setSocialMediaData(res);
      } else {
        setSocialMediaData([]);
      }
    }

    setLoader(false);
  };

  const handleChange = (e) => {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    let res;

    if (isUpdate !== null) {
      res = await ApiPutService("updateSocialMedia", isUpdate, detail);
    } else {
      res = await ApiPostService("socialMediaAdd", detail);
    }

    if (res === null) {
      alert("Error occured");
    } else if (res === true) {
      alert("success");
      getAllSocialMedia();
      setDetail({ ...initialState });
      setIsUpdate(null);
    } else {
      alert("Improper details");
    }

    setLoader(false);
  };

  const handleUpdate = (value) => {
    let newState = { ...initialState };
    console.log(value);
    setIsUpdate(value.id);

    newState.provider = value.provider;
    newState.link = value.link;
    newState.icon = value.icon;

    setDetail(newState);
  };

  const handleDelete = async (e) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    setLoader(true);

    let res = await ApiDeleteService("deleteSocialMedia", e.target.value);

    if (res === null) {
      alert("Error occured");
    } else if (res === true) {
      alert("success");
      getAllSocialMedia();
    } else {
      alert("Improper details");
    }

    setLoader(false);
  };

  const handleCancel = () => {
    setIsUpdate(null);
    setDetail({ ...initialState });
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Title>SOCIAL MEDIA </Title>
          <form onSubmit={handleSubmit}>
            <ContainerRow dynamic>
              <ContainerColumn className="col-md-5">
                <RightAlign>Social Media</RightAlign>
              </ContainerColumn>
              <ContainerColumn className="col-md-5">
                <Input
                  type="text"
                  onChange={handleChange}
                  placeholder="name"
                  name="provider"
                  value={detail.provider}
                  required
                />
              </ContainerColumn>
              <ContainerColumn className="col-md-5">
                <RightAlign>Social Media Link</RightAlign>
              </ContainerColumn>
              <ContainerColumn className="col-md-5">
                <Input
                  type="text"
                  onChange={handleChange}
                  placeholder="link"
                  name="link"
                  value={detail.link}
                  required
                />
              </ContainerColumn>
              <ContainerColumn height="20%" className="col-md-5">
                <RightAlign>Image</RightAlign>

                {detail.icon.length > 10 && (
                  <Imageview src={detail.icon} width="100px"></Imageview>
                )}
              </ContainerColumn>
              <ContainerColumn className="col-md-5">
                <Input
                  type="text"
                  onChange={handleChange}
                  name="icon"
                  value={detail.icon}
                  placeholder="image Url"
                  required
                />
              </ContainerColumn>
              <Submitbutton type="submit">
                {isUpdate === null ? "Post" : "Update"}
              </Submitbutton>
              {isUpdate && (
                <button
                  className="btn btn-outline-danger mt-3"
                  style={{ height: "3%" }}
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </ContainerRow>
          </form>

          <ContainerRow dynamic>
            {socialMediaData.map((value, index) => (
              <ContainerColumn className="col-md-3 col mt-3">
                <Imageview src={value.icon} />
                <br />
                <button
                  className="btn btn-outline-danger mt-1"
                  value={value.id}
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="btn btn-outline-info ml-1 mt-1"
                  value={value}
                  onClick={() => handleUpdate(value)}
                >
                  Update
                </button>
              </ContainerColumn>
            ))}
            ;
          </ContainerRow>
        </>
      )}
    </>
  );
};

export default SocialMedia;
