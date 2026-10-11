import { Link } from "react-router-dom";
import { Container, Logo } from "../components/index.js";
import { Search, Palette, Menu, CircleUserRound } from "lucide-react";
import Input from "../components/Input";
import { ListItemViewModelImageContainer } from "../components/BottomSheetLayout";
import logo from "../../assets/logo.svg";
import { ButtonLink } from "../components/ButtonLink.jsx";
import { useAuthStore } from "../../features/auth/store/authStore.js";

function Header() {
  const { isLoggedIn, user } = useAuthStore();

  return (
    <header className="text-black  h-16">
      <Container>
        <nav className="flex px-4 py-2 justify-between items-center">
          <div className="flex gap-4">
            <Menu />
            <div>
              <Link to="/" className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className="text-red-500"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <Logo />
              </Link>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex-1">
              <Input
                placeholder="Search"
                className="p-3 w-lg border rounded-l-full border-gray-300"
              />
            </div>
            <ListItemViewModelImageContainer className="w-14 border-r border-y border-gray-300  rounded-r-full flex justify-center items-center">
              <Search />
            </ListItemViewModelImageContainer>
          </div>
          <div className="flex items-center gap-4">
            <Palette />
            {isLoggedIn ? (
              <div className="flex gap-2 items-center">
                <img
                  src={user?.avatar}
                  alt="avatar"
                  className="rounded-full w-8 h-8"
                />
              </div>
            ) : (
              <ButtonLink
                to="/signin"
                className="px-3 gap-2 border-1 text-blue-600 border-gray-300 hover:bg-blue-100 h-full w-28 rounded-full"
              >
                <CircleUserRound />
                <p className="text-sm ">Sign in</p>
              </ButtonLink>
            )}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
