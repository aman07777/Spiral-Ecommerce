// import LockIcon from "@mui/icons-material/Lock";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import CakeIcon from "@mui/icons-material/Cake";
// import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Stats from "./components/stats";
import UserDetails from "./components/user-details/user-details";
import PromoCodTable from "./components/promo-code/promo-code-table";
import PromoCodeUserTable from "./components/promo-code-user-table";
const AffliatorProfile = () => {
  return (
    <>
      <div className="@container w-full">
        <div className="flex flex-col @[650px]:flex-row-reverse">
          {/* profile section -> user details like name, address, contact */}
          <UserDetails />
          {/* stats section -> gives a summary of the sales income of the affiliator => card are made to represent this  */}
          <Stats />
        </div>
        {/* promo codes section -> promo codes are presented in table */}
        <div className="w-full px-4 @[1000px]:px-8 mt-5 grid @[1000px]:grid-cols-2 gap-3 text-[#585858] ">
          {/* promo code table -> displays a table of the promo codes of the affiliator */}
          {/* adding a promo code is also handled in this file */}
          <PromoCodTable />
          {/* users table -> a table for listing user, who uses the promo codes of the affiliator */}
          <PromoCodeUserTable />
        </div>
      </div>
    </>
  );
};

export default AffliatorProfile;
