"use client";

import { useEffect, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  Mail,
  Phone,
  Reply,
  Send,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import { sendEnquiryReply } from "../../app/api/apiservice";

function formatEmailDate(value) {
  if (!value) {
    return "Date unavailable";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  const parts = new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  const getPart = (type) =>
    parts.find((part) => part.type === type)?.value || "";

  return `${getPart("day")} ${getPart("month")} ${getPart(
    "year",
  )}, ${getPart("hour")}:${getPart("minute")} ${getPart(
    "dayPeriod",
  ).toLowerCase()}`;
}

export default function EmailDialog({ emailDialog, onClose }) {
  const enquiry = emailDialog.enquiry;
  const replyComposerRef = useRef(null);
  const replyTextareaRef = useRef(null);
  const [replyComposer, setReplyComposer] = useState({
    messageId: "",
    subject: "",
    message: "",
    sending: false,
    status: "",
    error: "",
  });

  useEffect(() => {
    if (!emailDialog.open || !replyComposer.messageId) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      replyComposerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });

      replyTextareaRef.current?.focus({ preventScroll: true });
    }, 80);

    return () => window.clearTimeout(timer);
  }, [emailDialog.open, replyComposer.messageId]);

  if (!emailDialog.open) {
    return null;
  }

  function getMessageId(message) {
    return message.id || `${message.subject}-${message.date}`;
  }

  function getBodyText(message) {
    return message.body || message.snippet || "No preview available.";
  }

  function getReplySubject(subject) {
    if (!subject) {
      return "Reply from Velocity Webtech Solution";
    }

    return subject.toLowerCase().startsWith("re:") ? subject : `Re: ${subject}`;
  }

  function handleReplyOpen(message) {
    const messageId = getMessageId(message);

    setReplyComposer((current) => {
      if (current.messageId === messageId) {
        return {
          messageId: "",
          subject: "",
          message: "",
          sending: false,
          status: "",
          error: "",
        };
      }

      return {
        messageId,
        subject: getReplySubject(message.subject),
        message: "",
        sending: false,
        status: "",
        error: "",
      };
    });
  }

  async function handleReplySubmit(event) {
    event.preventDefault();

    if (!enquiry?.email) {
      setReplyComposer((current) => ({
        ...current,
        status: "",
        error: "Client email is missing.",
      }));
      return;
    }

    if (!replyComposer.message.trim()) {
      setReplyComposer((current) => ({
        ...current,
        status: "",
        error: "Please enter a reply message.",
      }));
      return;
    }

    setReplyComposer((current) => ({
      ...current,
      sending: true,
      status: "",
      error: "",
    }));

    try {
      await sendEnquiryReply({
        email: enquiry.email,
        subject: replyComposer.subject,
        message: replyComposer.message,
        name: enquiry?.name,
        phone: enquiry?.phone,
        service: enquiry?.requirement,
        submittedAt: enquiry?.date,
      });

      setReplyComposer((current) => ({
        ...current,
        message: "",
        sending: false,
        status: "Reply email sent successfully.",
        error: "",
      }));
    } catch (error) {
      setReplyComposer((current) => ({
        ...current,
        sending: false,
        status: "",
        error: error.message || "Unable to send reply email.",
      }));
    }
  }

  return (
    <div className="email-dialog-backdrop" role="presentation">
      <section
        className="email-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-dialog-title"
      >
        <header>
          <div className="email-dialog-title">
            <span className="email-dialog-icon">
              <Mail size={18} />
            </span>
            <div>
              <p>Email History</p>
              <h2 id="email-dialog-title">
                {enquiry?.email || "Selected enquiry"}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close email dialog"
          >
            <X size={20} />
          </button>
        </header>

        <div className="email-dialog-account">
          <span>Gmail account</span>
          <strong>
            {emailDialog.fromAccount || "velocitywebtechsolution@gmail.com"}
          </strong>
        </div>

        <div className="email-dialog-body">
          {emailDialog.loading && (
            <p className="email-dialog-state">Fetching emails...</p>
          )}

          {!emailDialog.loading && emailDialog.error && (
            <p className="email-dialog-state error">{emailDialog.error}</p>
          )}

          {!emailDialog.loading &&
            !emailDialog.error &&
            emailDialog.messages.length === 0 && (
              <p className="email-dialog-state">
                No emails found for this enquiry email.
              </p>
            )}

          {!emailDialog.loading &&
            !emailDialog.error &&
            emailDialog.messages.length > 0 && (
              <div className="email-message-list">
                {emailDialog.messages.map((message) => {
                  const messageId = getMessageId(message);
                  const bodyText = getBodyText(message);

                  return (
                    <article key={messageId}>
                      <div className="email-message-summary">
                        <span>{message.subject || "No subject"}</span>
                        <time>{formatEmailDate(message.date)}</time>
                      </div>

                      <div className="email-message-details">
                        <section className="email-client-card">
                          <div className="email-client-heading">
                            <span>
                              <UserRound size={16} />
                              Client Details
                            </span>
                            <h3>{enquiry?.name || "Client"}</h3>
                          </div>

                          <dl className="email-client-grid">
                            <div className="phone">
                              <span>
                                <Phone size={17} />
                              </span>
                              <dt>Phone Number</dt>
                              <dd>{enquiry?.phone || "-"}</dd>
                            </div>
                            <div className="email">
                              <span>
                                <Mail size={17} />
                              </span>
                              <dt>Email Address</dt>
                              <dd>{enquiry?.email || "-"}</dd>
                            </div>
                            <div className="service">
                              <span>
                                <BriefcaseBusiness size={17} />
                              </span>
                              <dt>Service Required</dt>
                              <dd>{enquiry?.requirement || "-"}</dd>
                            </div>
                            <div className="submitted">
                              <span>
                                <CalendarDays size={17} />
                              </span>
                              <dt>Submitted At</dt>
                              <dd>
                                {message.date
                                  ? formatEmailDate(message.date)
                                  : enquiry?.date || "-"}
                              </dd>
                            </div>
                          </dl>

                          <div className="email-project-box">
                            <span>
                              <ClipboardList size={18} />
                            </span>
                            <div>
                              <p>Project Details</p>
                              <strong>{enquiry?.note || bodyText}</strong>
                            </div>
                          </div>
                        </section>

                        <footer className="email-detail-footer">
                          <span>
                            <Send size={16} />
                            Sent from Velocity Webtech Solution contact form.
                          </span>
                          <button
                            type="button"
                            onClick={() => handleReplyOpen(message)}
                            aria-expanded={replyComposer.messageId === messageId}
                          >
                            <Reply size={16} />
                            Reply to Client
                          </button>
                        </footer>

                        {replyComposer.messageId === messageId && (
                          <form
                            ref={replyComposerRef}
                            className="email-reply-composer"
                            onSubmit={handleReplySubmit}
                          >
                            <div className="email-reply-card">
                              <div className="email-reply-to">
                                <Reply size={15} />
                                <span>{enquiry?.email || "Client email"}</span>
                              </div>

                              <input
                                type="text"
                                value={replyComposer.subject}
                                onChange={(event) =>
                                  setReplyComposer((current) => ({
                                    ...current,
                                    subject: event.target.value,
                                    status: "",
                                    error: "",
                                  }))
                                }
                                placeholder="Subject"
                                aria-label="Reply subject"
                              />

                              <textarea
                                ref={replyTextareaRef}
                                value={replyComposer.message}
                                onChange={(event) =>
                                  setReplyComposer((current) => ({
                                    ...current,
                                    message: event.target.value,
                                    status: "",
                                    error: "",
                                  }))
                                }
                                placeholder="Write your reply..."
                                aria-label="Reply message"
                                rows={5}
                              />

                              {(replyComposer.status || replyComposer.error) && (
                                <p
                                  className={
                                    replyComposer.error
                                      ? "email-reply-status error"
                                      : "email-reply-status"
                                  }
                                >
                                  {replyComposer.error || replyComposer.status}
                                </p>
                              )}

                              <div className="email-reply-actions">
                                <button
                                  type="submit"
                                  disabled={replyComposer.sending}
                                >
                                  {replyComposer.sending ? "Sending..." : "Send"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setReplyComposer({
                                      messageId: "",
                                      subject: "",
                                      message: "",
                                      sending: false,
                                      status: "",
                                      error: "",
                                    })
                                  }
                                  aria-label="Discard reply"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </form>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
        </div>
      </section>
    </div>
  );
}
