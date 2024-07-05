export default async function fetchFeatures() {
    // const host = process.env.NEXT_PUBLIC_BASE_URL;
    // const apiUrl = new URL(`${host}/api/features`);
    const res = await fetch('/api/features');
    const features = await res.json();

    return features;
  }