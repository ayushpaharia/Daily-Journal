import React, { useContext, useState } from "react";
import axios from "axios";
import _ from "lodash";
const GlobalContext = React.createContext();

export const useGlobal = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const baseURL = "http://localhost:5000";

  const INITIAL_FORM_VALUES = {
    email: "",
    password: "",
  };
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  // Auth State
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  // signup or profile
  const [modalState, setModalState] = useState("signup");
  const [isModalOpen, setModalOpen] = useState(false);

  // post form state & values
  const INITIAL_POST_FORM_VALUES = {
    title: "",
    content: "",
    visibility: "public",
  };
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [postModalState, setPostModalState] = useState("create");
  const [postFormValues, setPostFormValues] = useState(
    INITIAL_POST_FORM_VALUES,
  );
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [refreshPostTrigger, triggerRefreshPost] = useState(false);

  const addUserToLocal = (uToken) => {
    localStorage.setItem("token", uToken);
  };

  const retrieveUserFromLocal = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      setToken(token);
    } else {
      logout();
    }
  };

  const getPosts = async ({ visibility, user }) => {
    try {
      // Do Something
      let posts = await axios.post(`${baseURL}/posts/getposts`, {
        visibility,
        user,
      });
      return posts.data.data;
    } catch (e) {
      // Do something else
      console.log(e);
    }
  };

  const signUp = async () => {
    try {
      // Do Something
      let posts = await axios.post(`${baseURL}/users`, {
        email: formValues.email,
        password: formValues.password,
      });
      setFormValues(INITIAL_FORM_VALUES);
      return posts.data.data;
    } catch (e) {
      // Do something else
      console.log(e);
    }
  };

  const signIn = async () => {
    try {
      // Do Something
      let loggedUser = await axios.post(`${baseURL}/auth`, {
        email: formValues.email,
        password: formValues.password,
      });
      setFormValues(INITIAL_FORM_VALUES);
      const token = loggedUser.data.data;
      setToken(token);
      setLoggedIn(true);
      addUserToLocal(token);
    } catch (e) {
      // Do something else
      console.log(e);
    }
  };

  const logout = () => {
    setToken("");
    setLoggedIn(false);
    localStorage.clear();
  };

  // function to get user id
  const getUser = async () => {
    try {
      // Do Something
      let { data } = await axios.post(
        `${baseURL}/users/me`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      return _.pick(data.data, ["_id", "email"]);
    } catch (e) {
      // Do something else
      console.log(e);
    }
  };

  const createPost = async () => {
    axios
      .post(
        `${baseURL}/posts`,
        {
          title: postFormValues.title,
          content: postFormValues.content,
          visibility: postFormValues.visibility,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editCurrentPost = ({ title, content, visibility, _id }) => {
    setPostModalState("edit");
    setPostModalOpen(true);
    setSelectedPostId(_id);
    setPostFormValues({
      title,
      content,
      visibility,
    });
  };

  const editPost = async () => {
    const postId = selectedPostId;
    axios
      .post(
        `${baseURL}/posts/editPost/${postId}`,
        {
          title: postFormValues.title,
          content: postFormValues.content,
          visibility: postFormValues.visibility,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCurrentPost = ({ _id }) => {
    deletePost(_id);
  };
  const deletePost = async (id) => {
    console.log(id);
    axios
      .post(
        `${baseURL}/posts/delete/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const value = {
    //State
    user,
    token,
    isLoggedIn,

    // Functions
    signUp,
    signIn,
    logout,
    getUser,
    getPosts,
    setUser,
    setToken,
    retrieveUserFromLocal,
    createPost,
    editPost,

    // Modal
    isModalOpen,
    setModalOpen,
    modalState,
    setModalState,

    // Form
    formValues,
    setFormValues,

    // post Form
    postFormValues,
    setPostFormValues,

    // post form Modal
    isPostModalOpen,
    setPostModalOpen,
    postModalState,
    setPostModalState,

    editCurrentPost,

    deleteCurrentPost,
    deletePost,

    refreshPostTrigger,
    triggerRefreshPost,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};
