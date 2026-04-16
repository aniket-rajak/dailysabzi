import Image from "next/image";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import EditRoleMobile from "@/components/EditRoleMobile";
import Nav from "@/components/Nav";
import UserDashboard from "@/components/UserDashboard";
import AdminDashboard from "@/components/AdminDashboard";
import DeliveryBoyDashboard from "@/components/DeliveryBoyDashboard";

export default async function Home() {
  await connectDb();
  const session = await auth();
  // console.log(session)
  // const user = await User.findById(session?.user?.id);
  const userDoc = await User.findById(session?.user?.id).lean();
  if (!userDoc) {
    redirect("/login");
  }

  // if (!user) {
  //   redirect("/login");
  // }

  const user = {
    ...userDoc,
    _id: userDoc._id.toString(),
  };

  const inComplete =
    !user.mobile || !user.role || (!user.mobile && user.role == "user");
  if (inComplete) {
    return <EditRoleMobile></EditRoleMobile>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100">
      <Nav user={user} />
      {user.role == "user" ? (
        <UserDashboard />
      ) : user.role == "admin" ? (
        <AdminDashboard />
      ) : (
        <DeliveryBoyDashboard />
      )}
      
    </main>
  );
}
