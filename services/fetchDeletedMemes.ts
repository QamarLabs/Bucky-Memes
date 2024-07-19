export async function fetchDeletedMemes(
) {
    let opts: RequestInit = { method: 'GET' }
    const memesResponse = await fetch("/api/deletedMemes", opts);

    return await memesResponse.json();
}
