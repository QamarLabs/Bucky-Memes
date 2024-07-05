import { Locale } from "../component/common/NavbarComponent";
import { QueryParams, SearchBody } from "../pages/api/memes";

const defineApiUrl = (queryParams: QueryParams = {}, locale: Locale = "en") => {
    const host = process.env.NEXT_PUBLIC_BASE_URL;
    const apiUrl = new URL(`${host}/api/memes`);
    const queryParamLocaleAdded = {
        ...queryParams,
        locale,
    };
    Object.entries(queryParamLocaleAdded).forEach(([key, value]) =>
        apiUrl.searchParams.append(key, `${value}`)
    );
    return apiUrl.href;
}

export async function fetchMemes(
    queryParams: QueryParams = {},
    locale: Locale = "en",
    searchParams?: SearchBody | undefined,
) {
    const apiUrl = defineApiUrl(queryParams, locale);
    let opts: RequestInit = { method: 'GET' }
    console.log('searchParams:', searchParams);
    if(searchParams)
        opts = {
            method: 'POST',
            body: JSON.stringify(searchParams)
        }

    const memesResponse = await fetch(apiUrl, opts);

    return await memesResponse.json();
}
