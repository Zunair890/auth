import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../slice/userSlice.js';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('Logout failed:', data.message);
        return;
      }
      dispatch(signOut());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Auth App</h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>

          <Link to="/about">
            <li>About</li>
          </Link>

          {currentUser ? (
            <>
              <Link to="/profile">
                <li>Profile</li>
              </Link>
              <li>
                <button 
                  onClick={handleLogout}
                  className="hover:underline px-6 py-1 bg-red-600 text-white rounded-lg"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <Link to="/sign-in">
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
