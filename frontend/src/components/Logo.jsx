import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Mrs Miracle home">
      <span className="logo-mark">♡</span>
      <span className="logo-name">MRS MIRACLE</span>
      <small>FASHION FOR EVERY YOU</small>
    </Link>
  );
}
