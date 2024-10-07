import { getAuthToken } from "./get-token";
import { getStrapiURL } from "@/lib/utils";
import qs from "qs";

const query = qs.stringify({
  populate: { image: { fields: ["url", "alternativeText"] } },
});

export async function getUserMeLoader() {
  const baseUrl = getStrapiURL();
  const url = new URL("/api/users/me", baseUrl);
  url.search = query;

  const authToken = await getAuthToken();
  console.log("Auth Token:", authToken); // <-- Add this to check token status

  if (!authToken) {
    console.log("No auth token found.");
    return { ok: false, data: null, error: null };
  }

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });
    const data = await response.json();
 

    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log("Fetch Error:", error);
    return { ok: false, data: null, error: error };
  }
}
