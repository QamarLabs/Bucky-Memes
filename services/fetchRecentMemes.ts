export async function fetchRecentMemes(
) {
    let opts: RequestInit = { method: 'GET' }
    const memesResponse = await fetch("/api/recentMemes", opts);

    return await memesResponse.json();
}
