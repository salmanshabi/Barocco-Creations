import { useState } from "react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";
import monogram from "../assets/logo/next-icon-transparent.svg";

const WEB3FORMS_KEY = "432d6b51-a086-4ece-b601-38af3c8613df";

const socials = [
  { label: "GitHub", href: "#", icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
  { label: "LinkedIn", href: "#", icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { label: "Behance", href: "#", icon: "M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" },
  { label: "Dribbble", href: "#", icon: "M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.81zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702C16.86 2.61 14.545 1.62 12 1.62c-.8 0-1.63.116-2.4.432zm10.335 3.483c-.218.29-1.91 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `New enquiry from ${form.name} — ${form.project || "General"}`,
          from_name: form.name,
          name: form.name,
          email: form.email,
          project_type: form.project,
          message: form.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", project: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative px-6 py-32">
      {/* Background monogram */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative">
          {/* Angular bracket frame */}
          <div className="absolute inset-[-4vh]" style={{ animation: "spin-slow 60s linear infinite" }}>
            <div className="absolute top-0 left-0 h-8 w-8 border-t border-l border-sand/[0.04]" />
            <div className="absolute top-0 right-0 h-8 w-8 border-t border-r border-sand/[0.04]" />
            <div className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-sand/[0.04]" />
            <div className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-sand/[0.04]" />
            <div className="absolute -top-[3px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rotate-45 bg-sand/20" />
          </div>

          <img
            src={monogram}
            alt=""
            className="h-[45vh] w-auto opacity-[0.03]"
            style={{ animation: "float 8s ease-in-out infinite" }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-xl">
        <SectionLabel>⟨ Let&apos;s Connect ⟩</SectionLabel>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-14 text-center font-nippo font-medium text-[clamp(2rem,5vw,3.2rem)] text-cream/85"
        >
          Have a project in mind?
        </motion.h2>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="space-y-8"
          onSubmit={handleSubmit}
        >
          <div className="group">
            <label className="mb-2 block font-nippo-var text-[9px] uppercase tracking-[0.3em] text-sand/30 transition-colors group-focus-within:text-sand/60">
              Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={update("name")}
              className="w-full border-b border-sand/10 bg-transparent py-2.5 font-nippo-var text-sm font-light text-cream outline-none transition-colors focus:border-sand/40"
            />
          </div>
          <div className="group">
            <label className="mb-2 block font-nippo-var text-[9px] uppercase tracking-[0.3em] text-sand/30 transition-colors group-focus-within:text-sand/60">
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={update("email")}
              className="w-full border-b border-sand/10 bg-transparent py-2.5 font-nippo-var text-sm font-light text-cream outline-none transition-colors focus:border-sand/40"
            />
          </div>
          <div className="group">
            <label className="mb-2 block font-nippo-var text-[9px] uppercase tracking-[0.3em] text-sand/30 transition-colors group-focus-within:text-sand/60">
              Project Type
            </label>
            <select
              value={form.project}
              onChange={update("project")}
              className="w-full border-b border-sand/10 bg-transparent py-2.5 font-nippo-var text-sm font-light text-cream/40 outline-none transition-colors focus:border-sand/40 focus:text-cream [&:has(option:checked:not([value='']))]:text-cream"
            >
              <option value="" disabled>Select...</option>
              <option value="Brand Identity" className="bg-olive-dark text-cream">Brand Identity</option>
              <option value="Web Development" className="bg-olive-dark text-cream">Web Development</option>
              <option value="UX/UI Design" className="bg-olive-dark text-cream">UX/UI Design</option>
              <option value="Other" className="bg-olive-dark text-cream">Other</option>
            </select>
          </div>
          <div className="group">
            <label className="mb-2 block font-nippo-var text-[9px] uppercase tracking-[0.3em] text-sand/30 transition-colors group-focus-within:text-sand/60">
              Message
            </label>
            <textarea
              rows={3}
              required
              value={form.message}
              onChange={update("message")}
              className="w-full resize-none border-b border-sand/10 bg-transparent py-2.5 font-nippo-var text-sm font-light text-cream outline-none transition-colors focus:border-sand/40"
            />
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-6 w-full border border-sand bg-sand py-3.5 font-nippo-var text-xs font-medium uppercase tracking-[0.2em] text-olive-dark transition-all duration-300 hover:bg-transparent hover:text-sand disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending…" : "Send Message"}
          </button>

          {status === "success" && (
            <p className="mt-4 text-center font-nippo-var text-sm text-emerald-400/80">
              Message sent successfully! I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="mt-4 text-center font-nippo-var text-sm text-red-400/80">
              Something went wrong. Please try again or email me directly.
            </p>
          )}
        </motion.form>

        {/* Socials */}
        <div className="mt-16 flex flex-col items-center gap-8">
          <a
            href="mailto:design@next-visuals.com"
            className="font-nippo-var text-sm font-light text-sand/50 transition-colors duration-300 hover:text-sand"
          >
            design@next-visuals.com
          </a>
          <div className="flex gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-sand/15 text-sand/40 transition-all duration-300 hover:border-sand hover:bg-sand hover:text-olive-dark"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.icon} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
