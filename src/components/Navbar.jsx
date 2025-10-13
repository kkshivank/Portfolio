import PhoneIcon from "/src/assets/Nav/Phoneicon";
import DP from "/src/assets/Nav/DP.png"


const Navbar = ({ onNavigateToServices, onNavigateHome, onNavigateToBlogs }) => {
  return (
    <div className="flex flex-row w-full gap-10 px-7 py-4 bg-transparent">
      <div className="flex flex-row gap-[18px]">
        <img src={DP} alt="" className="size-[40px]"/>
        <div className="text-primary text-heading select-none">Portfolio</div>
      </div>
      <div className="flex flex-row flex-1 gap-10 justify-end text-primary text-heading cursor-pointer select-none">
        <div className="hover:text-accent" onClick={onNavigateHome}>Home</div>
        <div className="hover:text-accent" onClick={onNavigateToServices}>Services</div>
        <div className="hover:text-accent" onClick={onNavigateToBlogs}>Blogs</div>
      </div>
      <div className="flex flex-row " onClick={() => window.location.href='tel:+916378662150'}>
        <PhoneIcon />
      </div>
    </div>
  );
};

export default Navbar;
