import db from "@/db/db";
import { currentUser } from "@/lib/auth";

async function getUserCompanies(id: string) {
  const userCompanies = await db.user.findUnique({
    where: { id },
    select: { companies: true },
  });

  if (!userCompanies) return null;
  return userCompanies;
}

export default async function MyBusinessesPage() {
  const user = await currentUser();
  if (!user?.id) {
    return <div>No user fix this later...</div>;
  }
  const userCompanies = await getUserCompanies(user.id);
  console.log("USERCOMPANIES>>>", userCompanies);
  if (!userCompanies?.companies.length) {
    return <div>You have no regestered businesses</div>;
  }
  return <div>MyBusinessesPage</div>;
}
