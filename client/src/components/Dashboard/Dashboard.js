import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import PostCard from "../PostCard/PostCard";
import { useGlobal } from "../../context/globalContext";
import { PlusCircle } from "react-feather";
import Modal from "react-modal";

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#ececec",
  },
};

function Dashboard() {
  const [myPosts, setMyPosts] = useState([]);
  const [publicPosts, setPublicPosts] = useState([]);
  const {
    getPosts,
    isLoggedIn,
    user,
    postFormValues,
    setPostFormValues,
    setPostModalOpen,
    isPostModalOpen,
    createPost,
    postModalState,
    editPost,
    refreshPostTrigger,
    triggerRefreshPost,
  } = useGlobal();

  async function fetchPublicPosts() {
    await getPosts({ visibility: "public" }).then((posts) => {
      setPublicPosts(posts);
    });
  }
  async function fetchMyPosts() {
    await getPosts({ user: user._id }).then((posts) => {
      setMyPosts(posts);
    });
  }

  useEffect(() => {
    fetchPublicPosts();
  }, [refreshPostTrigger]);

  useEffect(() => {
    if (user && isLoggedIn) {
      fetchMyPosts();
    }
  }, [user, refreshPostTrigger]);

  return (
    <div className="dashboard">
      <Modal
        isOpen={isPostModalOpen}
        style={customStyles}
        onRequestClose={() => setPostModalOpen(false)}
        contentLabel="Auth Modal"
        ariaHideApp={false}
      >
        <div className="modalContainer">
          <h2>{postModalState === "create" ? "Create" : "Edit"} Post</h2>
          <hr />
          <span>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={postFormValues.title}
              onChange={(e) =>
                setPostFormValues({
                  ...postFormValues,
                  title: e.target.value,
                })
              }
              required
              placeholder="This is the title"
            />
          </span>
          <span>
            <label htmlFor="content">Content</label>
            <textarea
              type="text"
              name="content"
              id="content"
              value={postFormValues.content}
              placeholder="Lorem Ipsum"
              required
              onChange={(e) =>
                setPostFormValues({
                  ...postFormValues,
                  content: e.target.value,
                })
              }
            />
          </span>
          <span>
            <label htmlFor="public">Public</label>
            <input
              type="radio"
              name="visibility"
              id="public"
              value="public"
              checked={postFormValues.visibility === "public"}
              onChange={(e) => {
                setPostFormValues({
                  ...postFormValues,
                  visibility: e.target.value,
                });
              }}
            />
            <label htmlFor="Private">Private</label>
            <input
              type="radio"
              name="visibility"
              id="private"
              value="private"
              checked={postFormValues.visibility === "private"}
              onChange={(e) => {
                setPostFormValues({
                  ...postFormValues,
                  visibility: e.target.value,
                });
              }}
            />
          </span>
          {postModalState === "create" ? (
            <button
              onClick={() => {
                createPost(postFormValues);
                setPostModalOpen(false);
                triggerRefreshPost((prev) => !prev);
              }}
            >
              Create Post
            </button>
          ) : (
            <button
              onClick={() => {
                editPost(postFormValues);
                setPostModalOpen(false);
                triggerRefreshPost((prev) => !prev);
              }}
            >
              Save Edited
            </button>
          )}
          <button onClick={() => console.log(postFormValues)}>Log</button>
          <button
            onClick={() => {
              setPostFormValues({
                title: "This is a sample post",
                content: "This is Lorem ipsum",
                visibility: "public",
              });
            }}
          >
            Prefill
          </button>
        </div>
      </Modal>
      <h1>Dashboard</h1>
      <div className="dashboardContainer">
        <div
          className="myPosts"
          style={{
            display: !isLoggedIn ? "none" : "inline",
          }}
        >
          <h2>
            My Posts
            <span id="iconSpace" />{" "}
            <PlusCircle
              style={{
                cursor: "pointer",
                display: !isLoggedIn ? "none" : "inline",
              }}
              onClick={() => setPostModalOpen(true)}
            />
          </h2>
          <div className="myPostsGrid">
            {myPosts ? (
              myPosts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <PostCard />
            )}
          </div>
        </div>
        <div className="publicPosts">
          <h2>Public Posts</h2>
          <div className="myPostsGrid">
            {publicPosts ? (
              publicPosts.map((post) => <PostCard key={post._id} post={post} />)
            ) : (
              <PostCard />
            )}
          </div>
        </div>
        <div className="allPosts"></div>
      </div>
    </div>
  );
}

export default Dashboard;
