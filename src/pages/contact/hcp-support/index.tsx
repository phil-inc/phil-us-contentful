import React, { useState } from "react";
import type { HeadFC } from "gatsby";
import { getOgImage } from "utils/getOgImage";

import { Layout } from "layouts/Layout/Layout";
import PageContext from "contexts/PageContext";

import * as classes from "./hcp-support.module.css";

const HCP_TITLE = "Contact our HCP Support team — PHIL";
const HCP_DESC =
  "You're in the right place for support. Reach out below and our HCP support team will be in touch.";
const HCP_URL = "https://phil.us/contact/hcp-support";
const HCP_OG_IMAGE = getOgImage(null);
const HCP_SCHEMA = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": HCP_URL,
  url: HCP_URL,
  name: HCP_TITLE,
  description: HCP_DESC,
  image: HCP_OG_IMAGE,
  publisher: { "@type": "Organization", name: "PHIL", url: "https://phil.us" },
});

const PORTAL_ID = "48612742";
const FORM_ID = "7a894767-6fea-4780-83bd-489380512a48";
const SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

type FormState = {
  firstname: string;
  lastname: string;
  npi: string;
  specialty: string;
  email: string;
  phone: string;
  message: string;
};

const INITIAL: FormState = {
  firstname: "",
  lastname: "",
  npi: "",
  specialty: "",
  email: "",
  phone: "",
  message: "",
};

const REQUIRED_FIELDS: (keyof FormState)[] = [
  "firstname",
  "lastname",
  "npi",
  "specialty",
  "email",
  "phone",
  "message",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?\d{7,15}$/;

type FieldErrors = Partial<Record<keyof FormState, string>>;

/** Map HubSpot API error response to per-field messages */
const parseHubSpotErrors = (
  hsErrors: Array<{ message: string; errorType?: string }>,
): { fieldErrors: FieldErrors; general: string | null } => {
  const fieldErrors: FieldErrors = {};
  let general: string | null = null;

  for (const err of hsErrors) {
    const msg = err.message || "";
    // HubSpot returns e.g. "Error in 'fields.email'. Invalid email address"
    const fieldMatch = msg.match(/fields\.(\w+)/);
    if (fieldMatch) {
      const field = fieldMatch[1] as keyof FormState;
      // Strip the "Error in 'fields.xxx'. " prefix for a cleaner message
      fieldErrors[field] = msg.replace(/^Error in 'fields\.\w+'\.\s*/, "");
    } else {
      general = msg;
    }
  }
  return { fieldErrors, general };
};

const HcpSupportPage = () => {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const set = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Digits-only fields (NPI) — strip any non-digit before it lands in state
  const setDigits = (field: "npi") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setForm((prev) => ({ ...prev, [field]: digits }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Phone — allow a single leading "+" plus digits (flexible international)
  const setPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value.replace(/[^\d+]/g, "");
    v = (v.startsWith("+") ? "+" : "") + v.replace(/\+/g, "");
    setForm((prev) => ({ ...prev, phone: v }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const validate = (): FieldErrors => {
    const errs: FieldErrors = {};

    for (const field of REQUIRED_FIELDS) {
      if (!form[field].trim()) {
        errs[field] = "Please complete this required field.";
      }
    }

    // Email format
    if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    // Phone format — optional leading "+", then 7–15 digits
    if (form.phone.trim() && !PHONE_RE.test(form.phone.trim())) {
      errs.phone = "Please enter a valid phone number.";
    }

    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    // Client-side validation
    const clientErrors = validate();
    if (Object.keys(clientErrors).length) {
      setErrors(clientErrors);
      return;
    }

    setStatus("submitting");

    const fields = Object.entries(form)
      .filter(([, v]) => v.trim())
      .map(([name, value]) => ({ objectTypeId: "0-1", name, value: value.trim() }));

    try {
      const res = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields,
          context: {
            pageUri: HCP_URL,
            pageName: "Contact HCP Support",
          },
        }),
      });

      if (!res.ok) {
        // Parse HubSpot validation errors
        try {
          const body = await res.json();
          if (body.errors?.length) {
            const { fieldErrors, general } = parseHubSpotErrors(body.errors);
            if (Object.keys(fieldErrors).length) {
              setErrors(fieldErrors);
              setGeneralError(general);
              setStatus("idle");
              return;
            }
            if (general) {
              setGeneralError(general);
              setStatus("error");
              return;
            }
          }
        } catch {
          // JSON parse failed — fall through to generic error
        }
        throw new Error(res.statusText);
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <PageContext.Provider value={{ title: "HCP Support" }}>
        <Layout>
          <main className={classes.page}>
            <div className={classes.successMessage}>
              Thank you for reaching out. Our HCP support team will be in touch shortly.
            </div>
          </main>
        </Layout>
      </PageContext.Provider>
    );
  }

  return (
    <PageContext.Provider value={{ title: "HCP Support" }}>
      <Layout>
        <main className={classes.page}>
          <h1 className={classes.title}>Contact our HCP Support team</h1>
          <p className={classes.intro}>
            You're in the right place for support. Reach out below and our HCP support team will be in touch.
          </p>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <div className={classes.row2}>
              <div className={classes.field}>
                <label className={classes.label}>
                  First name<span className={classes.required}>*</span>
                </label>
                <input
                  className={`${classes.input} ${errors.firstname ? classes.inputError : ""}`}
                  type="text"
                  value={form.firstname}
                  onChange={set("firstname")}
                />
                {errors.firstname && <span className={classes.error}>{errors.firstname}</span>}
              </div>
              <div className={classes.field}>
                <label className={classes.label}>
                  Last name<span className={classes.required}>*</span>
                </label>
                <input
                  className={`${classes.input} ${errors.lastname ? classes.inputError : ""}`}
                  type="text"
                  value={form.lastname}
                  onChange={set("lastname")}
                />
                {errors.lastname && <span className={classes.error}>{errors.lastname}</span>}
              </div>
            </div>

            <div className={classes.row2}>
              <div className={classes.field}>
                <label className={classes.label}>
                  NPI<span className={classes.required}>*</span>
                </label>
                <input
                  className={`${classes.input} ${errors.npi ? classes.inputError : ""}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={form.npi}
                  onChange={setDigits("npi")}
                />
                {errors.npi && <span className={classes.error}>{errors.npi}</span>}
              </div>
              <div className={classes.field}>
                <label className={classes.label}>
                  Specialty<span className={classes.required}>*</span>
                </label>
                <input
                  className={`${classes.input} ${errors.specialty ? classes.inputError : ""}`}
                  type="text"
                  value={form.specialty}
                  onChange={set("specialty")}
                />
                {errors.specialty && <span className={classes.error}>{errors.specialty}</span>}
              </div>
            </div>

            <div className={classes.field}>
              <label className={classes.label}>
                Your Email<span className={classes.required}>*</span>
              </label>
              <input
                className={`${classes.input} ${errors.email ? classes.inputError : ""}`}
                type="email"
                value={form.email}
                onChange={set("email")}
              />
              {errors.email && <span className={classes.error}>{errors.email}</span>}
            </div>

            <div className={classes.field}>
              <label className={classes.label}>
                Phone number<span className={classes.required}>*</span>
              </label>
              <input
                className={`${classes.input} ${errors.phone ? classes.inputError : ""}`}
                type="tel"
                inputMode="tel"
                placeholder="5551234567 or +1 5551234567"
                value={form.phone}
                onChange={setPhone}
              />
              {errors.phone && <span className={classes.error}>{errors.phone}</span>}
            </div>

            <div className={classes.field}>
              <label className={classes.label}>
                Message<span className={classes.required}>*</span>
              </label>
              <textarea
                className={`${classes.textarea} ${errors.message ? classes.inputError : ""}`}
                rows={6}
                value={form.message}
                onChange={set("message")}
              />
              {errors.message && <span className={classes.error}>{errors.message}</span>}
            </div>

            <button className={classes.submit} type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Submitting…" : "Submit"}
            </button>

            {(status === "error" || generalError) && (
              <p className={classes.errorMsg}>
                {generalError || "Something went wrong. Please try again."}
              </p>
            )}
          </form>
        </main>
      </Layout>
    </PageContext.Provider>
  );
};

export default HcpSupportPage;

export const Head: HeadFC = () => (
  <>
    <title>{HCP_TITLE}</title>
    <meta name="description" content={HCP_DESC} />
    <link rel="canonical" href={HCP_URL} />
    <meta property="og:title" content={HCP_TITLE} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={HCP_DESC} />
    <meta property="og:image" content={HCP_OG_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content={HCP_URL} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={HCP_TITLE} />
    <meta name="twitter:description" content={HCP_DESC} />
    <meta name="twitter:image" content={HCP_OG_IMAGE} />
    <script type="application/ld+json">{HCP_SCHEMA}</script>
  </>
);
