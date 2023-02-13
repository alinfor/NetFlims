import { Link } from "react-router-dom";
import page404 from '../assets/animation_500_ldytibdo.gif';

const NotFound = () => {
  return (
    <main className="container">
      <div className="not-found">
        <div className="not-found-img">
          <img src={page404} alt="404 NOT FOUND" />
        </div>
        <div className="not-found-text">
          <h1 className="title">Lost your way ??</h1>
          <p>Sorry if you can't find that page</p>
        </div>
        <Link className="profile-infos-form-button button-red not-found-link" to="/">NetFlims Home</Link>
      </div>
    </main>
  );
};
 
export default NotFound;