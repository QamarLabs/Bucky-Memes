export async function fetchRecentMemes(
) {
    let opts: RequestInit = { method: 'GET' }
    const memesResponse = await fetch("/api/recent-memes", opts);

    return await memesResponse.json();
}
