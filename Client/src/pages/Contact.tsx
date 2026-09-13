import { useState } from "react";
import api from "../api/axios";
import DOMPurify from "dompurify";

type FormData = {
  name: string;
  email: string;
  phone: string;
  userType: string;
  interest: string;
  message: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  userType?: string;
  interest?: string;
  message?: string;
};

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  userType: "",
  interest: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setSuccess("");
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!form.userType) {
      newErrors.userType = "Please select a user type.";
    }

    if (!form.interest.trim()) {
      newErrors.interest = "Please enter your service or course of interest.";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const cleanData = {
        name: DOMPurify.sanitize(form.name).trim(),
        email: DOMPurify.sanitize(form.email).trim(),
        phone: DOMPurify.sanitize(form.phone).trim(),
        userType: DOMPurify.sanitize(form.userType).trim(),
        interest: DOMPurify.sanitize(form.interest).trim(),
        message: DOMPurify.sanitize(form.message).trim(),
      };

      await api.post("/enquiries", cleanData);

      setSuccess("Your enquiry has been submitted successfully.");

      setForm(initialForm);
      setErrors({});
    } catch (error) {
      console.error("Enquiry submission failed:", error);

      setSuccess("");
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[100vh] bg-black px-4 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="mt-2 text-4xl font-bold">Send an Enquiry</h1>

          <p className="mt-3 text-gray-400">
            Fill in your details and tell us how we can help.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 rounded-lg border border-green-500 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {success}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-xl border border-zinc-800 bg-zinc-950 p-6 md:p-8"
        >
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-sm outline-none focus:border-yellow-400"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          {/* Email + Phone */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-sm outline-none focus:border-yellow-400"
              />

              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Phone</label>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit phone number"
                className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-sm outline-none focus:border-yellow-400"
              />

              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* User Type */}
          <div>
            <label className="mb-2 block text-sm font-medium">User Type</label>

            <select
              name="userType"
              value={form.userType}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-sm outline-none focus:border-yellow-400"
            >
              <option value="">Select user type</option>
              <option value="Student">Student</option>
              <option value="Customer">Customer</option>
              <option value="Other">Other</option>
            </select>

            {errors.userType && (
              <p className="mt-1 text-sm text-red-400">{errors.userType}</p>
            )}
          </div>

          {/* Service / Course */}
          <div>
            <label className="mb-2 block text-sm font-medium">
              Service or Course of Interest
            </label>

            <input
              type="text"
              name="interest"
              value={form.interest}
              onChange={handleChange}
              placeholder="Example: Drone Pilot Training"
              className="w-full rounded-lg border border-zinc-700 bg-black px-4 py-3 text-sm outline-none focus:border-yellow-400"
            />

            {errors.interest && (
              <p className="mt-1 text-sm text-red-400">{errors.interest}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 block text-sm font-medium">Message</label>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your enquiry..."
              rows={5}
              className="w-full resize-none rounded-lg border border-zinc-700 bg-black px-4 py-3 text-sm outline-none focus:border-yellow-400"
            />

            {errors.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>
      </div>
    </main>
  );
}
