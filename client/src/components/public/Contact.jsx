import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Mail, Send, Loader2, Copy, Check } from "lucide-react";
import api from "../../api/axiosinstance";

export default function Contact() {
  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    subject: "",
    content: "",
  });
  const [profileEmail, setProfileEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const response = await api.get("/profile");
        if (response.data?.email) {
          setProfileEmail(response.data.email);
        }
      } catch (error) {
        console.error("Failed to fetch contact email from database configuration");
      }
    };
    fetchEmail();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copyToClipboard = async () => {
    if (!profileEmail) return;
    try {
      await navigator.clipboard.writeText(profileEmail);
      setIsCopied(true);
      toast.success("Email copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy email.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const loadingToast = toast.loading("Sending message...");

    try {
      await api.post("/messages", formData);
      toast.success("Message sent successfully!", { id: loadingToast });
      setFormData({ senderName: "", senderEmail: "", subject: "", content: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.", { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative section-block section-white border-t border-slate-100 overflow-hidden">
      <div className="absolute inset-0 mesh-light opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col items-start">
            <span className="badge-accent mb-4">07. What's Next?</span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">
              Get In Touch
            </h2>
            <p className="text-slate-600 text-base md:text-lg mb-8 leading-relaxed max-w-md">
              Whether you want to discuss full-stack engineering collaborations, research initiatives, or just talk tech — my inbox is always open.
            </p>

            {profileEmail && (
              <div className="group/email flex items-center bg-white border border-slate-200 p-4 rounded-2xl gap-4 hover:border-teal-200 hover:shadow-md transition-all w-full sm:w-auto shadow-sm">
                <div className="p-2.5 bg-teal-50 text-teal-600 rounded-xl">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex flex-col pr-4">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Direct Email</span>
                  <a href={`mailto:${profileEmail}`} className="text-slate-800 font-medium hover:text-teal-700 transition-colors text-sm md:text-base break-all">
                    {profileEmail}
                  </a>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="ml-auto p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-500 hover:text-teal-600 hover:border-teal-200 transition-all"
                  title="Copy email to clipboard"
                >
                  {isCopied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-teal-200/40 to-sky-200/40 rounded-3xl blur-xl opacity-70"></div>

            <form
              onSubmit={handleSubmit}
              className="relative bg-white p-6 md:p-8 rounded-2xl border border-slate-200 space-y-4 shadow-xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text" name="senderName" placeholder="Your Name" required
                  value={formData.senderName} onChange={handleChange}
                  className="input-field"
                />
                <input
                  type="email" name="senderEmail" placeholder="Your Email" required
                  value={formData.senderEmail} onChange={handleChange}
                  className="input-field"
                />
              </div>

              <input
                type="text" name="subject" placeholder="Subject" required
                value={formData.subject} onChange={handleChange}
                className="input-field"
              />

              <textarea
                name="content" placeholder="Type your message here..." required rows="4"
                value={formData.content} onChange={handleChange}
                className="input-field resize-none"
              ></textarea>

              <button
                type="submit" disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none text-sm tracking-wide shadow-md shadow-teal-600/20 active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <Loader2 className="animate-spin h-4 w-4" />
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
