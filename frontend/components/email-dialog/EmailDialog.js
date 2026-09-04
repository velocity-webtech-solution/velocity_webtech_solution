"use client";

import { useEffect, useRef, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronUp,
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

function stripQuotedReplyText(value) {
  if (!value) {
    return "";
  }

  let text = String(value).replace(/\r/g, "").trim();

  const quotePatterns = [
    /\s+On\s+(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?[\s\S]*?wrote:\s*[\s\S]*$/i,
    /\n\s*On\s+.+wrote:\s*[\s\S]*$/i,
    /\n\s*-{2,}\s*Original Message\s*-{2,}\s*[\s\S]*$/i,
    /\n\s*From:\s*.+\n\s*Sent:\s*.+\n\s*To:\s*.+\n\s*Subject:\s*[\s\S]*$/i,
  ];

  quotePatterns.some((pattern) => {
    const cleanedText = text.replace(pattern, "").trim();

    if (cleanedText !== text) {
      text = cleanedText;
      return true;
    }

    return false;
  });

  text = text
    .split("\n")
    .filter((line) => !line.trim().startsWith(">"))
    .join("\n")
    .replace(/\n\s*--\s*\n[\s\S]*$/i, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  return text || String(value).trim();
}

export default function EmailDialog({ emailDialog, onClose }) {
  const enquiry = emailDialog.enquiry;
  const submissionMessages = getSubmissionMessages();
  const replyComposerRef = useRef(null);
  const replyTextareaRef = useRef(null);
  const [replyComposer, setReplyComposer] = useState({
    messageId: "",
    enquiryId: "",
    email: "",
    name: "",
    phone: "",
    requirement: "",
    submittedAt: "",
    subject: "",
    message: "",
    sending: false,
    status: "",
    error: "",
  });
  const [replyHistory, setReplyHistory] = useState([]);
  const [expandedReplyId, setExpandedReplyId] = useState("");

  useEffect(() => {
    const savedReplies = (emailDialog.replies || []).map(normalizeReply);
    const clientReplies = (emailDialog.messages || [])
      .map(normalizeClientReply)
      .filter(Boolean);

    setReplyHistory(mergeReplyHistory([...savedReplies, ...clientReplies]));
    setExpandedReplyId("");
  }, [emailDialog.messages, emailDialog.replies, enquiry?.id]);

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

  function getSubmissionMessages() {
    const submissions =
      emailDialog.submissions && emailDialog.submissions.length
        ? emailDialog.submissions
        : enquiry
          ? [enquiry]
          : [];

    return [...submissions]
      .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))
      .map((submission) => ({
        ...submission,
        id: `submission-${submission.id}`,
        enquiryId: submission.id,
        subject: `New contact enquiry - ${submission.requirement || "Website Development"}`,
        date: submission.createdAt || submission.date,
        body: submission.note,
        submission,
      }));
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

  function normalizeReply(reply) {
    return {
      id: reply.id || `${reply.subject}-${reply.sent_at || reply.sentAt}`,
      enquiryId: reply.contact_submission || reply.enquiryId || "",
      direction: reply.direction || "outgoing",
      subject: reply.subject || "Reply from Velocity Webtech Solution",
      message: reply.message || "",
      from: reply.from || reply.from_email || emailDialog.fromAccount || "-",
      to: reply.to || reply.to_email || enquiry?.email || "-",
      sentAt: reply.sent_at || reply.sentAt || "",
    };
  }

  function normalizeClientReply(message) {
    const clientEmail = (enquiry?.email || "").toLowerCase();
    const fromEmail = (message.from?.email || "").toLowerCase();

    if (!clientEmail || fromEmail !== clientEmail) {
      return null;
    }

    return {
      id: `gmail-${getMessageId(message)}`,
      direction: "incoming",
      subject: message.subject || "Client reply",
      message: stripQuotedReplyText(getBodyText(message)),
      from: message.from?.email || enquiry.email,
      to: message.to?.email || emailDialog.fromAccount || "-",
      sentAt: message.date || "",
    };
  }

  function mergeReplyHistory(replies) {
    const uniqueReplies = new Map();

    replies.forEach((reply) => {
      uniqueReplies.set(reply.id, reply);
    });

    return [...uniqueReplies.values()].sort(
      (first, second) => new Date(second.sentAt) - new Date(first.sentAt),
    );
  }

  function normalizeSubject(value) {
    return (value || "")
      .toLowerCase()
      .replace(/^(re:\s*)+/i, "")
      .trim();
  }

  function doesReplyBelongToSubmission(reply, submission) {
    if (reply.enquiryId && String(reply.enquiryId) === String(submission?.id)) {
      return true;
    }

    const subject = normalizeSubject(reply.subject);
    const service = (submission?.requirement || "").toLowerCase();

    return Boolean(
      service &&
        subject.includes("new contact enquiry") &&
        subject.includes(service),
    );
  }

  function handleReplyOpen(message) {
    const messageId = getMessageId(message);

    setReplyComposer((current) => {
      if (current.messageId === messageId) {
        return {
          messageId: "",
          enquiryId: "",
          email: "",
          name: "",
          phone: "",
          requirement: "",
          submittedAt: "",
          subject: "",
          message: "",
          sending: false,
          status: "",
          error: "",
        };
      }

      return {
        messageId,
        enquiryId: message.submission?.id || enquiry?.id || "",
        email: message.submission?.email || enquiry?.email || "",
        name: message.submission?.name || enquiry?.name || "",
        phone: message.submission?.phone || enquiry?.phone || "",
        requirement: message.submission?.requirement || enquiry?.requirement || "",
        submittedAt: message.submission?.date || enquiry?.date || "",
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

    if (!replyComposer.email) {
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
      const data = await sendEnquiryReply({
        enquiryId: replyComposer.enquiryId,
        email: replyComposer.email,
        subject: replyComposer.subject,
        message: replyComposer.message,
        name: replyComposer.name,
        phone: replyComposer.phone,
        service: replyComposer.requirement,
        submittedAt: replyComposer.submittedAt,
      });
      const savedReply = normalizeReply(data.reply || {});

      setReplyHistory((current) =>
        mergeReplyHistory([savedReply, ...current]),
      );
      setExpandedReplyId(savedReply.id);

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
            {emailDialog.fromAccount || "subhankar.rc@velocitywebtechsolution.com"}
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
            submissionMessages.length === 0 && (
              <p className="email-dialog-state">
                No emails found for this enquiry email.
              </p>
            )}

          {!emailDialog.loading &&
            !emailDialog.error &&
            submissionMessages.length > 0 && (
              <div className="email-message-list">
                {submissionMessages.map((message) => {
                  const messageId = getMessageId(message);
                  const bodyText = getBodyText(message);
                  const cardEnquiry = message.submission || enquiry;
                  const cardReplyHistory = replyHistory.filter((reply) =>
                    doesReplyBelongToSubmission(reply, cardEnquiry),
                  );
                  const showReplyHistory = cardReplyHistory.length > 0;

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
                            <h3>{cardEnquiry?.name || "Client"}</h3>
                          </div>

                          <dl className="email-client-grid">
                            <div className="phone">
                              <span>
                                <Phone size={17} />
                              </span>
                              <dt>Phone Number</dt>
                              <dd>{cardEnquiry?.phone || "-"}</dd>
                            </div>
                            <div className="email">
                              <span>
                                <Mail size={17} />
                              </span>
                              <dt>Email Address</dt>
                              <dd>{cardEnquiry?.email || "-"}</dd>
                            </div>
                            <div className="service">
                              <span>
                                <BriefcaseBusiness size={17} />
                              </span>
                              <dt>Service Required</dt>
                              <dd>{cardEnquiry?.requirement || "-"}</dd>
                            </div>
                            <div className="submitted">
                              <span>
                                <CalendarDays size={17} />
                              </span>
                              <dt>Submitted At</dt>
                              <dd>
                                {message.date
                                  ? formatEmailDate(message.date)
                                  : cardEnquiry?.date || "-"}
                              </dd>
                            </div>
                          </dl>

                          <div className="email-project-box">
                            <span>
                              <ClipboardList size={18} />
                            </span>
                            <div>
                              <p>Project Details</p>
                              <strong>{cardEnquiry?.note || bodyText}</strong>
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

                        {showReplyHistory && (
                          <section
                            className="email-reply-history"
                            aria-label="Reply history"
                          >
                            <p>Reply History</p>
                            <div>
                              {cardReplyHistory.map((reply) => {
                                const isExpanded = expandedReplyId === reply.id;

                                return (
                                  <div
                                    className="email-reply-item"
                                    key={reply.id}
                                  >
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setExpandedReplyId((current) =>
                                          current === reply.id ? "" : reply.id,
                                        )
                                      }
                                      aria-expanded={isExpanded}
                                    >
                                      <span>
                                        <small>
                                          {reply.direction === "incoming"
                                            ? "Client Reply"
                                            : "Velocity Reply"}
                                        </small>
                                        {reply.subject}
                                      </span>
                                      <time>{formatEmailDate(reply.sentAt)}</time>
                                      {isExpanded ? (
                                        <ChevronUp size={16} />
                                      ) : (
                                        <ChevronDown size={16} />
                                      )}
                                    </button>

                                    {isExpanded && (
                                      <div className="email-reply-detail">
                                        <dl>
                                          <div>
                                            <dt>From</dt>
                                            <dd>{reply.from}</dd>
                                          </div>
                                          <div>
                                            <dt>To</dt>
                                            <dd>{reply.to}</dd>
                                          </div>
                                        </dl>
                                        <div className="email-reply-message">
                                          <span>Message</span>
                                          <p>{reply.message}</p>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </section>
                        )}

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
                                    enquiryId: "",
                                    email: "",
                                    name: "",
                                    phone: "",
                                    requirement: "",
                                    submittedAt: "",
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
