import Link from "next/link";
import { api } from "@/utils/api";

export default function Home() {
  const organizations = api.organizations.getAll.useQuery();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h1>Organizations Page</h1>
        <span>Here you can view all organizations</span>
      </div>

      <Link href="/create-org">
        <button className="btn-primary btn">Create Organization</button>
      </Link>

      <div className="flex h-full w-full flex-col gap-4 rounded-xl bg-neutral px-4 py-4">
        {organizations.isLoading && <span>Loading...</span>}
        {!!organizations.data &&
          (organizations.data.length > 0 ? (
            organizations.data.map((org) => (
              <div
                key={org.id}
                className="flex flex-col rounded-xl bg-neutral-focus px-2 py-2"
              >
                <h4>{org.name}</h4>
                <span className="text-gray-400">{org.description}</span>
                <span>Owner: {org.owner?.name}</span>
                <Link href={`/organizations/view/${org.name}`}>
                  <button className="btn-primary btn">
                    Go To Organization Page
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <span>No organizations found</span>
          ))}
      </div>
    </div>
  );
}
