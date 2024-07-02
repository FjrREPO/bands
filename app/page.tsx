import getUser from "@/actions/user/get-user";
import Homepage from "./_components/Homepage";

export default async function Home() {
  const user = await getUser()

  return (
      <Homepage user={user}/>
  );
}
