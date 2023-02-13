import { useEffect } from "react";
import NotSignedIn from "@/components/notSignedIn";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { FormEvent, useId, useReducer, useState } from "react";
import { z } from "zod";
import { organizationInput } from "@/utils/organization.schema";
import { useRouter } from "next/router";

interface State {
  name: string;
  description: string;
}

interface FormAction {
  type: "name" | "description";
  payload: string;
}

export default function CreateOrg() {
  const session = useSession();
  if (session.status === "unauthenticated") {
    return <NotSignedIn />;
  }

  const router = useRouter();
  const createOrg = api.organizations.createOrganization.useMutation({
    onSuccess: (data) => {
      router.push(`/organizations/view/${formState.name}`);
    },
  });

  const [errors, setErrors] = useState<string[]>([]);
  const id = useId();

  const formReducer = (state: State, action: FormAction) => {
    setErrors([]);
    switch (action.type) {
      case "name":
        action.payload = action.payload.slice(0, 25);
        action.payload = action.payload.trim();
        return { ...state, name: action.payload };
      case "description":
        action.payload = action.payload.slice(0, 100);
        action.payload = action.payload.trim();

        return { ...state, description: action.payload };
      default:
        return state;
    }
  };

  const [formState, dispathFormState] = useReducer(formReducer, {
    name: "",
    description: "",
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let errors = Array<string>();
    if (formState.name.length < 1) {
      errors.push("Name must be at least 1 character long");
    }
    if (formState.description.length < 1) {
      errors.push("Description must be at least 1 character long");
    }
    organizationInput.safeParse(formState);
    setErrors(errors);
    if (errors.length > 0) return;
    createOrg.mutate(formState);
  }

  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (createOrg.isSuccess) setComplete(true);
  }, [createOrg.isSuccess]);

  return (
    <div className="flex w-full max-w-2xl flex-col items-center">
      <h1>Create Org</h1>
      {complete && (
        <span className="text-green-500">Organization Created!</span>
      )}
      <form className="flex w-full flex-col" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="orgName" className="label">
          Organization Name
        </label>
        <input
          type="text"
          id="orgName"
          className="input"
          autoComplete="off"
          value={formState.name}
          onChange={(e) => {
            dispathFormState({ type: "name", payload: e.target.value });
          }}
        />
        <label htmlFor="orgDescription" className="label">
          Organization Description
        </label>
        <label className="label-text">
          &nbsp;What is this organization about?
        </label>
        <input
          type="text"
          id="orgDescription"
          className="input"
          value={formState.description}
          autoComplete="off"
          onChange={(e) => {
            dispathFormState({ type: "description", payload: e.target.value });
          }}
        />
        <button className="btn-primary btn mt-4" type="submit">
          Create
        </button>
        {errors.length > 0 &&
          errors.map((error, i) => {
            return (
              <span className="text-red-500" key={id + i}>
                {error}
              </span>
            );
          })}
      </form>
    </div>
  );
}
