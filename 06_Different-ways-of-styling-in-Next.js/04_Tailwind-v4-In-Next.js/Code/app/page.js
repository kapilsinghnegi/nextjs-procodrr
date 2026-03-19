import styles from "./home.module.css";
import scss from "./home.module.scss";

const Home = () => {
  return (
    <div>
      <h1 className={`${styles.title} font-bold underline`}>Home Page</h1>
      <p className={scss.para}>Welcome to our website!</p>
    </div>
  );
};

export default Home;

