const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

export async function fetchServices() {
  const res = await fetch(`${API_BASE}/services`);
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
}

export async function fetchServiceBySlug(slug) {
  const res = await fetch(`${API_BASE}/services/${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error("Failed to fetch service");
  return res.json();
}

export async function fetchGallery(category) {
  const url =
    !category || category === "all"
      ? `${API_BASE}/gallery`
      : `${API_BASE}/gallery/${encodeURIComponent(category)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch gallery");
  return res.json();
}

export async function createBooking(data) {
  const res = await fetch(`${API_BASE}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchBookings(token) {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_BASE}/bookings`, { headers });
  if (!res.ok) throw new Error("Failed to fetch bookings");
  return res.json();
}

export async function fetchBookingById(id) {
  const res = await fetch(`${API_BASE}/bookings/${encodeURIComponent(id)}`);
  if (!res.ok) throw new Error("Failed to fetch booking");
  return res.json();
}

export async function sendContactMessage(data) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
