import "./dark.css";
import { useTheme } from "../theme-provider";

const DarkMode = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <div
        className={`flex justify-center items-center h-[40px] w-[40px] rounded-full border-none  ${
          theme === "dark" ? "bg-black" : "bg-white"
        }`}
      >
        <button
          title="Toggle Theme"
          onClick={toggleTheme}
          className={`app ${theme === "dark" ? "dark" : ""}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Moon Icon (visible in dark mode) */}
            <path
              pathLength="1"
              className={`moon-icon ${
                theme === "dark" ? "visible" : "invisible"
              }`}
              d="M21 12.79A9 9 0 1 1 10.21 3 7 7 0 0 0 21 12.79z"
            />
            {/* Sun Icon (visible in light mode) */}
            <circle
              pathLength="1"
              className={`sun-icon ${
                theme === "dark" ? "invisible" : "visible"
              }`}
              cx="12"
              cy="12"
              r="5"
            />
            <line
              pathLength="1"
              className={`sun-icon ${
                theme === "dark" ? "invisible" : "visible"
              }`}
              x1="12"
              y1="1"
              x2="12"
              y2="3"
            />
            <line
              pathLength="1"
              className={`sun-icon ${
                theme === "dark" ? "invisible" : "visible"
              }`}
              x1="12"
              y1="21"
              x2="12"
              y2="23"
            />
            <line
              pathLength="1"
              className={`sun-icon ${
                theme === "dark" ? "invisible" : "visible"
              }`}
              x1="4.22"
              y1="4.22"
              x2="5.64"
              y2="5.64"
            />
            <line
              pathLength="1"
              className={`sun-icon ${
                theme === "dark" ? "invisible" : "visible"
              }`}
              x1="18.36"
              y1="18.36"
              x2="19.78"
              y2="19.78"
            />
            <line
              pathLength="1"
              className={`sun-icon ${
                theme === "dark" ? "invisible" : "visible"
              }`}
              x1="1"
              y1="12"
              x2="3"
              y2="12"
            />
            <line
              pathLength="1"
              className={`sun-icon ${
                theme === "dark" ? "invisible" : "visible"
              }`}
              x1="21"
              y1="12"
              x2="23"
              y2="12"
            />
            <line
              pathLength="1"
              className={`sun-icon ${
                theme === "dark" ? "invisible" : "visible"
              }`}
              x1="4.22"
              y1="19.78"
              x2="5.64"
              y2="18.36"
            />
            <line
              pathLength="1"
              className={`sun-icon ${
                theme === "dark" ? "invisible" : "visible"
              }`}
              x1="18.36"
              y1="5.64"
              x2="19.78"
              y2="4.22"
            />
          </svg>
        </button>
      </div>
    </>
  );
};

export default DarkMode;
