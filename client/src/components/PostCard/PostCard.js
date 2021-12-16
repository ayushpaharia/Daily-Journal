import "./PostCard.css";
import { Edit3, Trash2 } from "react-feather";
import { useGlobal } from "../../context/globalContext";

function PostCard({ post }) {
  const { user, editCurrentPost, deleteCurrentPost } = useGlobal();

  return (
    <div className="postCard">
      <div>
        <span>
          <h3>{post?.title || "Placeholder"}</h3>
          {post.user._id === user?._id && (
            <>
              <Edit3
                style={{
                  paddingRight: "5px",
                  fontSize: "1.5rem",
                  transform: "scale(1.3)",
                }}
                onClick={() => {
                  editCurrentPost(post);
                }}
              />
              <Trash2
                style={{
                  transform: "scale(1.3)",
                }}
                onClick={() => {
                  deleteCurrentPost(post);
                }}
              />
            </>
          )}
        </span>

        <p>
          {post?.content.substring(0, 250) ||
            `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
        laboriosam labore ab. Ipsam quam adipisci suscipit beatae voluptate
        optio molestias rem neque pariatur. Quidem repellendus non, commodi
        culpa officiis explicabo. Perferendis commodi ratione in asperiores
        velit reprehenderit nam optio neque expedita culpa, consequuntur
        mollitia! Alias aut sint quia sed quas voluptatum asperiores ullam
        maxime quae consectetur iste sequi, placeat fugit!`.substring(0, 250) +
              "..."}
        </p>
      </div>

      <div className="author">by {post?.user.email || "Arushi"}</div>
    </div>
  );
}

export default PostCard;
