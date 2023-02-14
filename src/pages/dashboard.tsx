import NotSignedIn from "@/components/notSignedIn";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Dashboard() {
  const session = useSession();

  if (session.status === "unauthenticated") {
    return <NotSignedIn />;
  }

  const myOrgs = api.organizations.getMyOrganizations.useQuery();

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="flex flex-col gap-4">
        <h3>My Organizations</h3>
        <div className="flex flex-row gap-3 overflow-x-scroll rounded-xl bg-slate-700 px-2 py-2">
          {myOrgs.data?.map((org) => (
            <div
              key={org.id}
              className="w-56 rounded-md bg-slate-800 px-4 py-4"
            >
              <h2>{org.name}</h2>
              <p>{org.description}</p>
              <div className="flex w-28 flex-col gap-2">
                <Link href={`/organizations/view/${org.name}`}>
                  <button className="btn-primary btn w-full">View</button>
                </Link>
                <Link href={`/organizations/manage/${org.name}`}>
                  <button className="btn-primary btn w-full">Manage</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
