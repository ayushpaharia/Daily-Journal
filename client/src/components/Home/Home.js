import "./Home.css";
import EXPRESS from "../../assets/express.png";
import NODEJS from "../../assets/nodejs.png";
import JS from "../../assets/js.png";
import MONGO from "../../assets/mongo.png";

function Home() {
  return (
    <div className="home">
      <div className="homeContainer">
        <div id="homeContainer-left">
          <h1>This Is Daily Journal v2</h1>
          <h5>WHAT IS IT?</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla rem
            esse impedit, nisi est nihil voluptas officiis dolorum voluptate ad
            asperiores doloremque amet eligendi, soluta, pariatur enim? Sint,
            facilis at. Laboriosam repudiandae aperiam ratione iste ipsam labore
            tempore ullam hic ex reiciendis ab velit minima, eum iusto quia
            dolore maxime voluptas necessitatibus esse consequuntur officia
            omnis facilis. Quasi, voluptas ipsa.
          </p>
          <h5>WHAT IS IT?</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla rem
            esse impedit, nisi est nihil voluptas officiis dolorum voluptate ad
            asperiores doloremque amet eligendi, soluta, pariatur enim? Sint,
            facilis at. Laboriosam repudiandae aperiam ratione iste ipsam labore
            tempore ullam hic ex reiciendis ab velit minima, eum iusto quia
            dolore maxime voluptas necessitatibus esse consequuntur officia
            omnis facilis. Quasi, voluptas ipsa.
          </p>
          <h5>WHAT IS IT?</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla rem
            esse impedit, nisi est nihil voluptas officiis dolorum voluptate ad
            asperiores doloremque amet eligendi, soluta, pariatur enim? Sint,
          </p>
        </div>
        <div id="homeContainer-right">
          <h1>It's Built On</h1>
          <div>
            <img src={NODEJS} alt="nodejs" />
            <img src={MONGO} alt="mongo" />
            <img src={JS} alt="js" />
            <img src={EXPRESS} alt="express" />
          </div>
          <h5>WHAT IS IT?</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla rem
            esse impedit, nisi est nihil voluptas officiis dolorum voluptate ad
            asperiores doloremque amet eligendi, soluta, pariatur enim? Sint,
          </p>
          <h5>WHAT IS IT?</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla rem
            esse impedit, nisi est nihil voluptas officiis dolorum voluptate ad
            asperiores doloremque amet eligendi, soluta, pariatur enim? Sint,
          </p>
          <h5>WHAT IS IT?</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla rem
            esse impedit, nisi est nihil voluptas officiis dolorum voluptate ad
            asperiores doloremque amet eligendi, soluta, pariatur enim? Sint,
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
