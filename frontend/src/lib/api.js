const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

async function request(endpoint, options = {}) {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      ...options,

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
        ...options.headers
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong."
    );
  }

  return data;
}

export const api = {
  // Authentication

  login(username, password) {
    return request("/api/auth/login", {
      method: "POST",

      body: JSON.stringify({
        username,
        password
      })
    });
  },

  logout() {
    return request("/api/auth/logout", {
      method: "POST"
    });
  },

  getCurrentAdmin() {
    return request("/api/auth/me");
  },

  // Testimonials

  getTestimonials() {
    return request("/api/testimonials");
  },

  addTestimonial(testimonial) {
    return request("/api/testimonials", {
      method: "POST",

      body: JSON.stringify(testimonial)
    });
  },

  updateTestimonial(id, testimonial) {
    return request(`/api/testimonials/${id}`, {
      method: "PUT",

      body: JSON.stringify(testimonial)
    });
  },

  deleteTestimonial(id) {
    return request(`/api/testimonials/${id}`, {
      method: "DELETE"
    });
  }
};