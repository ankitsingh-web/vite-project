import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";
function Footer() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return (
    <>
      <footer className=" relative left-0 bottom-0 h-[10vh] flex flex-col sm:flex-row items-center   py-5 justify-between text-white bg-gray-800 sm:px-20">
        <section className="text-lg ">
          copyright {year} | All right reserved
        </section>
        <section className="flex items-center justify-center gap-5 text-white">
          <Link
            className="hover:text-yellow-500 transition-all duration-300 ease-in-out"
            to="https://www.facebook.com/profile.php?id=100087046947492&mibextid=ZbWKwL"
          >
            <BsFacebook />
          </Link>
          <Link
            to="https://www.instagram.com/ankitsingh_182.a/?__pwa=1"
            className="hover:text-yellow-500 transition-all duration-300 ease-in-out"
          >
            <BsInstagram />
          </Link>

          <Link
            to="https://www.linkedin.com/in/ankit-singh-349629264?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app/"
            className="hover:text-yellow-500 transition-all duration-300 ease-in-out"
          >
            <BsLinkedin />
          </Link>
          <a className="hover:text-yellow-500 transition-all duration-300 ease-in-out">
            <BsTwitter />
          </a>
        </section>
      </footer>
    </>
  );
}
export default Footer;
