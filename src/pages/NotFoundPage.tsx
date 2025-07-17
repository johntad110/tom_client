import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
    <code>What on earth r u doing here?</code>
    <Link to="/" className="underline">Get back home!</Link>
    </>
  )
}

export default NotFoundPage;